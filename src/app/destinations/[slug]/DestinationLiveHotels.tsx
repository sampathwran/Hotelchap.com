"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, ExternalLink } from 'lucide-react';
import { useSettings } from "@/context/SettingsContext";
import { allCurrencies } from "@/components/CurrencyModal";

const getCurrencySymbol = (code: string) => allCurrencies.find(c => c.code === code)?.symbol || code;

export default function DestinationLiveHotels({ destination }: { destination: string }) {
  const { currency } = useSettings();
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        // Default checkin to tomorrow, checkout to day after
        const checkin = new Date(Date.now() + 86400000).toISOString().split("T")[0];
        const checkout = new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0];
        
        const res = await fetch(`/api/hotels/search?city=${destination}&checkin=${checkin}&checkout=${checkout}&currency=${currency}`);
        const data = await res.json();
        
        const validResults = (data.results || []).filter((h: any) => h?.property?.name || h?.hotel_name || h?.name);
        
        const mappedHotels = validResults.slice(0, 5).map((h: any) => {
          if (h.hotel_name) {
             return {
                id: h.hotel_id,
                name: h.hotel_name,
                location: h.city_trans || h.city || destination,
                rating: h.review_score || 0,
                reviews: h.review_nr || 0,
                price: h.min_total_price ? Math.floor(h.min_total_price) : 100,
                image: h.max_photo_url || h.main_photo_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                url: h.url
             };
          }
          const prop = h.property || {};
          const priceVal = prop.priceBreakdown?.grossPrice?.value || prop.priceBreakdown?.excludedPrice?.value || 100;
          const image = prop.photoUrls && prop.photoUrls.length > 0 ? prop.photoUrls[0] : "https://images.unsplash.com/photo-1566073771259-6a8506099945";

          return {
            id: h.hotel_id,
            name: prop.name || "Unknown Hotel",
            location: destination,
            rating: prop.reviewScore || 0,
            reviews: prop.reviewCount || 0,
            price: Math.floor(priceVal),
            image: image,
            url: ""
          };
        });
        
        setHotels(mappedHotels);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, [destination, currency]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl h-56 sm:h-48 w-full border border-gray-100 flex flex-col sm:flex-row overflow-hidden">
             <div className="w-full sm:w-1/3 bg-gray-200 h-full"></div>
             <div className="flex-1 p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4 mt-auto"></div>
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (hotels.length === 0) return null;

  const checkin = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const checkout = new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      {hotels.map((hotel: any, index: number) => {
        const hotelLink = `/hotel/${hotel.id}?checkin=${checkin}&checkout=${checkout}&name=${encodeURIComponent(hotel.name)}&price=${hotel.price}&baseCurrency=${currency}&image=${encodeURIComponent(hotel.image)}&rating=${hotel.rating}&reviews=${hotel.reviews}&location=${encodeURIComponent(hotel.location)}&url=${btoa(hotel.url || "")}`;
        
        return (
        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row hover:shadow-xl transition-shadow group">
          <div className="relative h-56 sm:h-auto sm:w-1/3 overflow-hidden cursor-pointer" onClick={() => window.location.href = hotelLink}>
            <Image 
              src={hotel.image} 
              alt={hotel.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <Link href={hotelLink}>
                 <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">{hotel.name}</h3>
              </Link>
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-bold text-sm">
                <Star className="w-4 h-4 fill-blue-700" />
                {hotel.rating}
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
              <MapPin className="w-4 h-4" />
              {hotel.location}
            </div>
            
            <p className="text-sm text-gray-500 mb-6 text-justify">
              Based on {hotel.reviews.toLocaleString()} reviews.
            </p>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Estimated Price</p>
                <p className="text-xl font-black text-gray-900">{getCurrencySymbol(currency)}{hotel.price}</p>
              </div>
              <Link href={hotelLink} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-2">
                Check Prices <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )})}
    </div>
  );
}
