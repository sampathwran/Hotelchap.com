import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent Next.js from caching the route

const RAPIDAPI_KEY = '94ea5ae213msh8b45eeb44bafaa3p14e5c0jsn2b52490c4351';
const RAPIDAPI_HOST = 'booking-com.p.rapidapi.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const adults = searchParams.get('adults') || '2';
  const rooms = searchParams.get('rooms') || '1';

  if (!city || !checkin || !checkout) {
    return NextResponse.json(
      { error: 'Missing required parameters: city, checkin, checkout' },
      { status: 400 }
    );
  }

  try {
    // Step 1: Search for the Destination ID
    const locationRes = await fetch(
      `https://${RAPIDAPI_HOST}/v1/hotels/locations?name=${encodeURIComponent(city)}&locale=en-gb`,
      {
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
        cache: 'no-store'
      }
    );

    const locations = await locationRes.json();

    if (!locations || locations.length === 0) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    // Find the first location that is a city
    const destination = locations.find((loc: any) => loc.dest_type === 'city') || locations[0];

    // Step 2: Search for Hotels
    const hotelRes = await fetch(
      `https://${RAPIDAPI_HOST}/v1/hotels/search?dest_id=${destination.dest_id}&dest_type=${destination.dest_type}&checkin_date=${checkin}&checkout_date=${checkout}&adults_number=${adults}&room_number=${rooms}&filter_by_currency=USD&order_by=popularity&units=metric&locale=en-gb`,
      {
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
        cache: 'no-store'
      }
    );

    const hotels = await hotelRes.json();

    if (!hotels.result) {
      // RapidAPI returned something unexpected (like a block or error message)
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
