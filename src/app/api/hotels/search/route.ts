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

    
    if (!Array.isArray(locations) && locations.message && locations.message.includes("quota")) {
      console.warn("RapidAPI Quota Exceeded. Returning Mock Data.");
      return NextResponse.json({
        location: { dest_id: "mock", dest_type: "city", name: city },
        results: [
          {
            hotel_id: 3765351,
            hotel_name: "Marino Beach Colombo",
            price: 110,
            max_photo_url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/156672332.jpg?k=b4f3d04cbc8b0c80193f63046e63e576ba1a50fc9f48289aa152f10a026aab4d&o=",
            review_score: 9.2,
            review_nr: 9910,
            url: "https://www.booking.com/hotel/lk/marino-beach-colombo.html"
          },
          {
            hotel_id: 123456,
            hotel_name: "Shangri-La Colombo",
            price: 185,
            max_photo_url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/125793836.jpg?k=8e24c2fc9dfaefbe0b0943ec34139f408ce950df627db8a680072b8c9d09c314&o=",
            review_score: 9.0,
            review_nr: 4500,
            url: "https://www.booking.com/hotel/lk/shangri-la-colombo.html"
          },
          {
            hotel_id: 234567,
            hotel_name: "Cinnamon Grand Colombo",
            price: 130,
            max_photo_url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/40960589.jpg?k=a2656916e7f8670eb8fc5f6a9e1ff1308aebcb586e680a6ddbf4c2c7f5647565&o=",
            review_score: 8.8,
            review_nr: 6200,
            url: "https://www.booking.com/hotel/lk/cinnamon-grand-colombo.html"
          }
        ],
        count: 3
      });
    }

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
