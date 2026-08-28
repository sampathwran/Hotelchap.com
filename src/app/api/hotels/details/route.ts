import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const RAPIDAPI_KEY = '94ea5ae213msh8b45eeb44bafaa3p14e5c0jsn2b52490c4351';
const RAPIDAPI_HOST = 'booking-com.p.rapidapi.com';

// Helper to retry API calls specifically for scraper authentication failures (Code 1008)
async function fetchWithRetry(url: string, options: any, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const res = await fetch(url, options);
    let data;
    try {
      data = await res.json();
    } catch (err) {
      if (i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      throw err;
    }

    // Check if it's the known "Authentication token is invalid" (1008) error from the scraper
    // Description API might return it differently, so we check broadly
    if (data.detail && typeof data.detail === 'string' && data.detail.includes('1008')) {
      console.warn(`[Details Retry ${i + 1}/${maxRetries}] RapidAPI Scraper Error 1008. Retrying...`);
      if (i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 1500)); // wait 1.5s before retry
        continue;
      }
    }
    
    return data;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hotel_id = searchParams.get('id');

  if (!hotel_id) {
    return NextResponse.json(
      { error: 'Missing required parameter: id' },
      { status: 400 }
    );
  }

  try {
    const headers = {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
    };

    // Fetch Description and Photos in parallel using retry wrapper
    const [descriptionData, photosData] = await Promise.all([
      fetchWithRetry(`https://${RAPIDAPI_HOST}/v1/hotels/description?hotel_id=${hotel_id}&locale=en-gb`, { headers, cache: 'force-cache' }),
      fetchWithRetry(`https://${RAPIDAPI_HOST}/v1/hotels/photos?hotel_id=${hotel_id}&locale=en-gb`, { headers, cache: 'force-cache' })
    ]);

    // Map the photo objects to just a flat array of max resolution URLs
    const photos = Array.isArray(photosData) 
      ? photosData.map((p: any) => p.url_max).filter(Boolean).slice(0, 10) 
      : [];

    return NextResponse.json({
      description: descriptionData?.description || "No description available for this property.",
      photos: photos
    });

  } catch (error: any) {
    console.error('Details API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotel details' },
      { status: 500 }
    );
  }
}
