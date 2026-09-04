import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const RAPIDAPI_KEY = '94ea5ae213msh8b45eeb44bafaa3p14e5c0jsn2b52490c4351';
const RAPIDAPI_HOST = 'booking-com15.p.rapidapi.com';

// Helper to retry API calls
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
    
    // Check if the API returned an error status
    if (data.status === false) {
      if (i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 1500));
        continue;
      }
    }
    
    return data;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const checkin = searchParams.get('checkin'); // format: YYYY-MM-DD
  const checkout = searchParams.get('checkout'); // format: YYYY-MM-DD
  const adults = searchParams.get('adults') || '2';
  const rooms = searchParams.get('rooms') || '1';
  const currency = searchParams.get('currency') || 'USD';

  if (!city || !checkin || !checkout) {
    return NextResponse.json(
      { error: 'Missing required parameters: city, checkin, checkout' },
      { status: 400 }
    );
  }

  try {
    const headers = {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
    };

    // Step 1: Search for the Destination ID
    const destResponse = await fetchWithRetry(
      `https://${RAPIDAPI_HOST}/api/v1/hotels/searchDestination?query=${encodeURIComponent(city)}`,
      { headers, cache: 'no-store' }
    );

    if (!destResponse || !destResponse.status || !destResponse.data || destResponse.data.length === 0) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    // Find the first location that is a city
    const destination = destResponse.data.find((loc: any) => loc.search_type === 'city') || destResponse.data[0];

    // Step 2: Search for Hotels
    const searchResponse = await fetchWithRetry(
      `https://${RAPIDAPI_HOST}/api/v1/hotels/searchHotels?dest_id=${destination.dest_id}&search_type=${destination.search_type}&arrival_date=${checkin}&departure_date=${checkout}&adults=${adults}&room_qty=${rooms}&languagecode=en-us&currency_code=${currency}`,
      { headers, cache: 'no-store' }
    );

    if (!searchResponse || !searchResponse.status || !searchResponse.data) {
      return NextResponse.json({
        error: 'RapidAPI did not return valid results',
        debug_info: searchResponse,
        location: destination
      }, { status: 500 });
    }

    const hotels = searchResponse.data.hotels || [];

    return NextResponse.json({
      location: destination,
      results: hotels,
      count: hotels.length
    });

  } catch (error: any) {
    console.error('RapidAPI Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels from API' },
      { status: 500 }
    );
  }
}
