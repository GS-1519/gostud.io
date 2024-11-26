import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
    try {
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const timestamp = Date.now();
        const inputPath = join(uploadsDir, `input-${timestamp}.png`);
        const outputPath = join(uploadsDir, `output-${timestamp}.png`);

        // Save input file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(inputPath, buffer);

        // Process image
        const scriptPath = join(process.cwd(), 'scripts', 'remove-bg.js');
        await execAsync(`node ${scriptPath} "${inputPath}" "${outputPath}"`);

        // Read result and convert to base64
        const outputBuffer = await readFile(outputPath);
        const base64 = outputBuffer.toString('base64');

        // Cleanup
        await Promise.all([
            unlink(inputPath),
            unlink(outputPath)
        ]);

        return NextResponse.json({
            success: true,
            data: `data:image/png;base64,${base64}`
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to process image' },
            { status: 500 }
        );
    }
}