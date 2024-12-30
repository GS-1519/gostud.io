import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    try {
      // Use sharp for face detection and cropping
      const processedBuffer = await sharp(Buffer.from(buffer))
        .resize(800, 800, {
          fit: 'cover',
          position: 'attention' // This uses face detection
        })
        .jpeg({ quality: 90 })
        .toBuffer();

      return new NextResponse(processedBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000',
        }
      });

    } catch (error) {
      console.error('Processing Error:', error);
      throw new Error('Failed to process image');
    }

  } catch (error) {
    console.error('Error cropping image:', error);
    return NextResponse.json(
      { error: 'Failed to crop image' },
      { status: 500 }
    );
  }
}