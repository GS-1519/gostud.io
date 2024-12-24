import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const response = await fetch('https://api.astria.ai/images/inspect', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ASTRIA_API_KEY}`
      },
      body: formData
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error inspecting image:', error);
    return NextResponse.json(
      { error: 'Failed to inspect image' },
      { status: 500 }
    );
  }
} 