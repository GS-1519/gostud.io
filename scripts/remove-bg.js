const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

async function main() {
    const inputPath = process.argv[2];
    const outputPath = process.argv[3];

    if (!inputPath || !outputPath) {
        console.error('Please provide input and output paths');
        process.exit(1);
    }

    try {
        console.log('Reading input file...');
        const inputBuffer = await fs.promises.readFile(inputPath);
        console.log('Input buffer size:', inputBuffer.length);

        // Convert to PNG and save as temporary file
        const tempPath = path.join(path.dirname(inputPath), `temp-${Date.now()}.png`);
        console.log('Converting to PNG...');
        await sharp(inputBuffer)
            .toFormat('png')
            .ensureAlpha()
            .toFile(tempPath);

        // Create file URL
        const fileUrl = `file://${tempPath.replace(/\\/g, '/')}`;
        console.log('File URL:', fileUrl);

        console.log('Removing background...');
        const outputBlob = await removeBackground(fileUrl, {
            debug: true,
            model: 'medium',
            output: {
                format: 'image/png',
                quality: 1
            }
        });

        // Convert Blob to Buffer
        const arrayBuffer = await outputBlob.arrayBuffer();
        const outputBuffer = Buffer.from(arrayBuffer);

        console.log('Writing output file...');
        await fs.promises.writeFile(outputPath, outputBuffer);

        // Cleanup temp file
        await fs.promises.unlink(tempPath);
        
        console.log('Background removal completed successfully');
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            inputPath,
            outputPath,
            exists: fs.existsSync(inputPath)
        });
        process.exit(1);
    }
}

main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
}); 