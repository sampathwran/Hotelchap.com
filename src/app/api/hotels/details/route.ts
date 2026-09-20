import { NextResponse } from 'next/server';

const RAPIDAPI_KEY = '94ea5ae213msh8b45eeb44bafaa3p14e5c0jsn2b52490c4351';
const RAPIDAPI_HOST = 'booking-com15.p.rapidapi.com';

async function fetchWithRetry(url: string, maxRetries = 3) {
  const options = {
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
    },
    cache: 'no-store' as RequestCache
  };
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hotelId = searchParams.get('id');

  if (!hotelId) {
    return NextResponse.json({ error: 'Missing hotel id' }, { status: 400 });
  }

  try {
    const [descData, photosData, facData] = await Promise.all([
      fetchWithRetry(`https://${RAPIDAPI_HOST}/api/v1/hotels/getDescriptionAndInfo?hotel_id=${hotelId}&languagecode=en-us`),
      fetchWithRetry(`https://${RAPIDAPI_HOST}/api/v1/hotels/getHotelPhotos?hotel_id=${hotelId}`),
      fetchWithRetry(`https://${RAPIDAPI_HOST}/api/v1/hotels/getHotelFacilities?hotel_id=${hotelId}&languagecode=en-us`)
    ]);

    let description = "";
    if (descData && descData.data && descData.data.length > 0) {
      description = descData.data.find((d: any) => d.descriptiontype_id === 6)?.description || descData.data[0].description;
    }

    let photos: string[] = [];
    if (photosData && photosData.data) {
      photos = photosData.data.map((p: any) => p.url);
    }
    
    let facilities: string[] = ["Free WiFi", "Non-smoking rooms", "Air conditioning", "24-hour front desk"];
    if (facData && facData.data && facData.data.accommodationHighlights) {
        facilities = facData.data.accommodationHighlights.map((f:any) => f.title);
    }

    return NextResponse.json({
      description,
      photos,
      facilities
    });

  } catch (error: any) {
    console.error('RapidAPI Details Error:', error);
    return NextResponse.json({ error: 'Failed to fetch hotel details' }, { status: 500 });
  }
}
