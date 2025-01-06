import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    console.error('Missing Cloudinary credentials');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

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
        gravity: "face",
        crop: "thumb",
        width: 800,
        height: 800,
        zoom: "0.7",
        quality: 90,
        timeout: 60000, // Add timeout of 60 seconds
      });

      if (!result || !result.secure_url) {
        throw new Error('Failed to get processed image URL from Cloudinary');
      }

      // Fetch the processed image
      const response = await fetch(result.secure_url);
      if (!response.ok) {
        throw new Error(`Failed to fetch processed image: ${response.statusText}`);
      }

      const processedBuffer = await response.arrayBuffer();

      // Delete the uploaded image from Cloudinary
      try {
        await cloudinary.uploader.destroy(result.public_id);
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
        // Continue execution even if delete fails
      }

      return new NextResponse(processedBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000',
        }
      });

    } catch (processingError) {
      console.error('Cloudinary Processing Error:', processingError);
      return NextResponse.json(
        { error: 'Image processing failed' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Auto-crop error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}