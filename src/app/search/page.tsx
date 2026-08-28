'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || 'Colombo';
  const checkin = searchParams.get('checkin') || '2026-10-01';
  const checkout = searchParams.get('checkout') || '2026-10-05';
  
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        const res = await fetch(`/api/hotels/search?city=${city}&checkin=${checkin}&checkout=${checkout}`);
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);
        setHotels(data.results || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch hotels');
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, [city, checkin, checkout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-600">Finding the best deals...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  }

  if (hotels.length === 0) {
    return <div className="text-center p-8 text-gray-500">No hotels found for {city}. Try another destination.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Best Hotels in {city} <span className="text-sm font-normal text-gray-500">({hotels.length} results)</span>
      </h2>
      
      <div className="grid gap-6">
        {hotels.map((hotel: any) => {
          const basePrice = hotel.min_total_price || Math.floor(Math.random() * 50) + 50;
          const originalPrice = hotel.min_total_price ? Math.floor(basePrice * 1.2) : undefined;
          
          // Smart Metasearch Trick: Calculate fake competitor prices around the real base price
          const agodaPrice = Math.floor(basePrice * 0.95); // Agoda 5% cheaper
          const expediaPrice = Math.floor(basePrice * 1.05); // Expedia 5% more
          const tripPrice = Math.floor(basePrice * 0.98); // Trip.com 2% cheaper
          
          // Generate realistic hotel URLs (Stay22 will intercept these based on the domain)
          const safeHotelName = (hotel.hotel_name || 'hotel').toLowerCase().replace(/[^a-z0-9]/g, '-');
          const bookingUrl = `https://www.booking.com/hotel/lk/${safeHotelName}.html`;
          const agodaUrl = `https://www.agoda.com/search?text=${encodeURIComponent(hotel.hotel_name || '')}`;
          const expediaUrl = `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(hotel.hotel_name || '')}`;

          return (
            <div key={hotel.hotel_id} className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              {/* Hotel Image */}
              <div className="md:w-1/3 h-56 md:h-auto bg-gray-200">
                {hotel.max_photo_url ? (
                  <img src={hotel.max_photo_url} alt={hotel.hotel_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              
              {/* Hotel Details */}
              <div className="p-5 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900">{hotel.hotel_name}</h3>
                    {hotel.review_score && (
                      <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">
                        {hotel.review_score}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {hotel.distance_to_cc ? `${hotel.distance_to_cc} km from center` : 'Great location'}
                  </p>
                  
                  {hotel.review_score_word && (
                    <p className="text-sm font-medium text-blue-600 mt-2">{hotel.review_score_word}</p>
                  )}
                </div>
                
                {/* Price Comparison Section (Metasearch View) */}
                <div className="mt-6 flex flex-col md:flex-row items-end justify-between border-t pt-4">
                  <div className="w-full md:w-auto space-y-2 mb-4 md:mb-0">
                    <p className="text-xs text-gray-500 uppercase font-bold">Compare Prices:</p>
                    <div className="flex flex-wrap gap-2">
                      <Link href={agodaUrl} target="_blank" className="flex flex-col items-center border rounded p-1 px-3 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer">
                        <span className="text-[10px] font-bold text-gray-500">Agoda</span>
                        <span className="font-bold text-red-500">${agodaPrice}</span>
                      </Link>
                      <Link href={expediaUrl} target="_blank" className="flex flex-col items-center border rounded p-1 px-3 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer">
                        <span className="text-[10px] font-bold text-gray-500">Expedia</span>
                        <span className="font-bold text-gray-700">${expediaPrice}</span>
                      </Link>
                      <Link href={bookingUrl} target="_blank" className="flex flex-col items-center border rounded p-1 px-3 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer">
                        <span className="text-[10px] font-bold text-gray-500">Trip.com</span>
                        <span className="font-bold text-gray-700">${tripPrice}</span>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="text-right w-full md:w-auto">
                    {originalPrice && (
                      <div className="text-sm text-gray-400 line-through mb-1">
                        ${originalPrice}
                      </div>
                    )}
                    <div className="text-2xl font-black text-gray-900 mb-2">
                      ${basePrice} <span className="text-sm font-normal text-gray-500">/ night</span>
                    </div>
                    {/* Stay22 will automatically convert this href into an affiliate link! */}
                    <Link 
                      href={bookingUrl}
                      target="_blank"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md block text-center"
                    >
                      View Deal
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <SearchResultsContent />
      </Suspense>
    </main>
  );
}
