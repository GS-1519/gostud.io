import { NextResponse } from 'next/server';

// Helper function for aggregation
function aggregateCharacteristics(characteristics: any[]) {
  const aggregated: { [key: string]: string[] } = {};
  
  characteristics.forEach((characteristic) => {
    Object.entries(characteristic).forEach(([key, value]) => {
      if (typeof value === 'string' && value !== 'NONE') {
        if (!aggregated[key]) {
          aggregated[key] = [];
        }
        aggregated[key].push(value);
      }
    });
  });

  const commonValues: { [key: string]: string } = {};
  Object.entries(aggregated).forEach(([key, values]) => {
    if (values.length >= 4) { // Only aggregate if we have at least 4 images
      const counts = values.reduce((acc: { [key: string]: number }, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      // Get the value with highest occurrence
      const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      commonValues[key] = mostCommon;
    }
  });

  return commonValues;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const existingCharacteristics = formData.get('characteristics');
    
    const response = await fetch('https://api.astria.ai/images/inspect', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ASTRIA_API_KEY}`
      },
      body: formData
    });

    const data = await response.json();

    // If we have existing characteristics, try to aggregate them
    if (existingCharacteristics) {
      try {
        const characteristics = JSON.parse(existingCharacteristics as string);
        characteristics.push(data);
        
        if (characteristics.length >= 4) {
          const aggregatedData = aggregateCharacteristics(characteristics);
          return NextResponse.json({
            current: data,
            aggregated: aggregatedData,
            allCharacteristics: characteristics
          });
        }
      } catch (error) {
        console.error('Error aggregating characteristics:', error);
      }
    }

    // Return just the current inspection data if no aggregation was done
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error inspecting image:', error);
    return NextResponse.json(
      { error: 'Failed to inspect image' },
      { status: 500 }
    );
  }
} 