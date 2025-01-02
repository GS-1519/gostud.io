import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64Image}`;

    try {
      // Upload to Cloudinary with face detection and cropping
      const result = await cloudinary.uploader.upload(dataURI, {
        // Use face detection for cropping
        gravity: "face", // This will focus on the largest face
        crop: "thumb", // Use thumbnail crop mode
        width: 800,
        height: 800,
        zoom: "0.7", // Zoom out slightly to include more context
        quality: 90,
      });

      // Fetch the processed image
      const response = await fetch(result.secure_url);
      const processedBuffer = await response.arrayBuffer();

      // Delete the uploaded image from Cloudinary
      await cloudinary.uploader.destroy(result.public_id);

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