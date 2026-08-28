import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const RAPIDAPI_KEY = '94ea5ae213msh8b45eeb44bafaa3p14e5c0jsn2b52490c4351';
const RAPIDAPI_HOST = 'booking-com.p.rapidapi.com';

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

    // Fetch Description and Photos in parallel to be fast
    const [descRes, photosRes] = await Promise.all([
      fetch(`https://${RAPIDAPI_HOST}/v1/hotels/description?hotel_id=${hotel_id}&locale=en-gb`, { headers, cache: 'force-cache' }),
      fetch(`https://${RAPIDAPI_HOST}/v1/hotels/photos?hotel_id=${hotel_id}&locale=en-gb`, { headers, cache: 'force-cache' })
    ]);

    const descriptionData = await descRes.json();
    const photosData = await photosRes.json();

    // Map the photo objects to just a flat array of max resolution URLs
    const photos = Array.isArray(photosData) 
      ? photosData.map(p => p.url_max).filter(Boolean).slice(0, 10) 
      : [];

    return NextResponse.json({
      description: descriptionData.description || "No description available for this property.",
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
