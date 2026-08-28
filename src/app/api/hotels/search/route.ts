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
    if (!data.result && data.detail && typeof data.detail === 'string' && data.detail.includes('1008')) {
      console.warn(`[Retry ${i + 1}/${maxRetries}] RapidAPI Scraper Error 1008. Retrying...`);
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
  const city = searchParams.get('city');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
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
    const locations = await fetchWithRetry(
      `https://${RAPIDAPI_HOST}/v1/hotels/locations?name=${encodeURIComponent(city)}&locale=en-gb`,
      { headers, cache: 'no-store' }
    );

    if (!locations || locations.length === 0 || !Array.isArray(locations)) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    // Find the first location that is a city
    const destination = locations.find((loc: any) => loc.dest_type === 'city') || locations[0];

    // Step 2: Search for Hotels
    const hotels = await fetchWithRetry(
      `https://${RAPIDAPI_HOST}/v1/hotels/search?dest_id=${destination.dest_id}&dest_type=${destination.dest_type}&checkin_date=${checkin}&checkout_date=${checkout}&adults_number=${adults}&room_number=${rooms}&filter_by_currency=${currency}&order_by=popularity&units=metric&locale=en-gb`,
      { headers, cache: 'no-store' }
    );

    if (!hotels.result) {
      // RapidAPI returned something unexpected or 0 results
      if (hotels.count === 0 || (hotels.detail === undefined && hotels.message === undefined)) {
        return NextResponse.json({
          location: destination,
          results: [],
          count: 0
        });
      }
      return NextResponse.json({
        error: 'RapidAPI did not return results',
        debug_info: hotels,
        location: destination
      }, { status: 500 });
    }

    return NextResponse.json({
      location: destination,
      results: hotels.result || [],
      count: hotels.count || 0
    });

  } catch (error: any) {
    console.error('RapidAPI Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels from API' },
      { status: 500 }
    );
  }
}
