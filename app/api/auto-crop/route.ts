import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Call Astria's auto-cropping API
    const response = await fetch('https://api.astria.ai/images/crop', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ASTRIA_API_KEY}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to crop image');
    }

    // Get the cropped image blob
    const imageBlob = await response.blob();
    
    // Return the cropped image with correct headers
    return new NextResponse(imageBlob, {
      headers: {
        'Content-Type': imageBlob.type || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      }
    });
  } catch (error) {
    console.error('Error cropping image:', error);
    return NextResponse.json(
      { error: 'Failed to crop image' },
      { status: 500 }
    );
  }
}