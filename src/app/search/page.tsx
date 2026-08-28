"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Heart, Wifi, Coffee, Car, Check } from "lucide-react";
import { Suspense, useState, useMemo, useEffect } from "react";
import MegaFooter from "@/components/MegaFooter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Header from "@/components/Header";
import { filterCategories } from "@/lib/filterData";

function SearchResults() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("city") || searchParams.get("destination") || "Colombo";
  const checkin = searchParams.get("checkin") || "2026-10-01";
  const checkout = searchParams.get("checkout") || "2026-10-05";

  // Filter State
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  
  // API State
  const [apiHotels, setApiHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        const res = await fetch(`/api/hotels/search?city=${destination}&checkin=${checkin}&checkout=${checkout}`, { cache: 'no-store' });
        const data = await res.json();
        
        if (data.error) {
          let specificMsg = data.error;
          if (data.debug_info?.detail?.[0]?.msg) {
             specificMsg = "API Error: " + data.debug_info.detail[0].msg;
          } else if (data.debug_info?.message) {
             specificMsg = "API Error: " + data.debug_info.message;
          } else if (data.debug_info) {
             specificMsg = "API Error: " + JSON.stringify(data.debug_info).substring(0, 150);
          }
          throw new Error(specificMsg);
        }
        
        // Map API format to expected UI format
        const validResults = (data.results || []).filter((h: any) => h.hotel_name || h.hotel_name_trans || h.name);
        
        const mappedHotels = validResults.map((h: any) => {
          // Generate keywords mapping to match the UI filters
          const keywords = [];
          if (h.has_free_parking) keywords.push("Parking");
          if (h.has_swimming_pool) keywords.push("Pool", "Private Pool");
          if (h.hotel_include_breakfast) keywords.push("Breakfast included");
          if (h.is_free_cancellable) keywords.push("Free cancellation");
          if (h.is_no_prepayment_block) keywords.push("No prepayment needed", "Pay at Hotel", "Book without credit card", "Pay at property");
          
          const rt = h.review_score || 0;
          if (rt >= 9) keywords.push("Great 9+");
          if (rt >= 8) keywords.push("Very Good 8+");
          if (rt >= 7) keywords.push("Good 7+");
          if (rt >= 6) keywords.push("Pleasant 6+");
          
          if (h.accommodation_type_name) {
             keywords.push(h.accommodation_type_name);
             if (h.accommodation_type_name === "Hotel") keywords.push("Hotels");
             if (h.accommodation_type_name === "Apartment" || h.accommodation_type_name === "Villa") keywords.push("Homes & apts");
          }
          
          keywords.push("1 double bed", "Air conditioning", "Restaurant", "Free WiFi"); // Generic fallbacks

          return {
            id: h.hotel_id?.toString() || Math.random().toString(),
            name: h.hotel_name || h.hotel_name_trans || h.name || "Unknown Hotel",
            location: h.city_trans || h.city || destination,
            address: h.address || h.address_trans || "",
            distance: h.distance_to_cc ? `${h.distance_to_cc} km from center` : "Great location",
            rating: h.review_score || 0,
            reviews: h.review_nr || 0,
            starRating: h.class || 3,
            price: h.min_total_price ? Math.floor(h.min_total_price) : 100,
            originalPrice: h.min_total_price ? Math.floor(h.min_total_price * 1.2) : 120,
            image: h.max_photo_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
            highlights: h.is_free_cancellable ? ["Free Cancellation"] : [],
            amenities: { popular: ["Free WiFi", "Air conditioning", "Restaurant"] },
            bookingUrl: h.url,
            _searchKeywords: keywords.join(" ")
          };
        });
        
        setApiHotels(mappedHotels);
      } catch (err: any) {
        setError(err.message || "Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, [destination, checkin, checkout]);

  const handleFilterToggle = (option: string) => {
    setSelectedFilters(prev => 
      prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]
    );
  };

  const filteredHotels = useMemo(() => {
    return apiHotels.filter(hotel => {
      if (hotel.price > maxPrice) return false;
      
      if (selectedFilters.length === 0) return true;

      // Flatten hotel to string for a quick, robust mock search
      const hotelStr = JSON.stringify(hotel).toLowerCase();
      
      // Every selected filter must match *something* in the hotel data (rough AND logic)
      return selectedFilters.every(filter => {
        const term = filter.toLowerCase();
        // Handle explicit star rating
        if (term.includes("stars")) {
          const stars = term.split(" ")[0];
          return hotel.starRating >= parseInt(stars);
        }
        return hotelStr.includes(term);
      });
    });
  }, [apiHotels, selectedFilters, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Search Header Summary */}
      <div className="bg-[#673AB7] text-white pt-8 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">{destination}: {apiHotels.length} properties found</h1>
            <p className="text-blue-100 font-medium">Check-in: {checkin} &nbsp;|&nbsp; Check-out: {checkout}</p>
          </div>
          <button className="mt-6 md:mt-0 bg-white text-[#673AB7] font-black px-6 py-3 rounded-xl hover:bg-gray-100 transition shadow-lg">
            Change Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8 w-full -mt-8 relative z-10">
        
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">Filter by:</h3>
            
            <div className="space-y-6">
              {/* Custom Budget Filter */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <h4 className="font-bold text-gray-800 mb-3 text-sm">Your budget (per night)</h4>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 bg-white border border-gray-200 rounded-lg p-2 flex items-center">
                    <span className="text-gray-400 text-xs font-bold mr-1">US$</span>
                    <input type="number" value="0" disabled className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none" />
                  </div>
                  <span className="text-gray-400 font-bold">-</span>
                  <div className="flex-1 bg-white border border-gray-200 rounded-lg p-2 flex items-center">
                    <span className="text-gray-400 text-xs font-bold mr-1">US$</span>
                    <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none" />
                  </div>
                </div>
                <input type="range" min="50" max="1000" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#673AB7] mt-2" />
              </div>

              {/* Dynamic Filters mapped from filterCategories */}
              {filterCategories.map((category, idx) => (
                <div key={idx} className="mb-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">{category.title}</h4>
                  <div className="space-y-3">
                    {category.options.map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            checked={selectedFilters.includes(opt)}
                            onChange={() => handleFilterToggle(opt)}
                            className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:border-[#673AB7] checked:bg-[#673AB7] transition-all" 
                          />
                          <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                        </div>
                        <span className="text-gray-600 text-sm group-hover:text-gray-900 font-medium transition">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          {error ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-red-100 flex flex-col items-center justify-center">
              <span className="text-4xl mb-4 text-red-500">⚠️</span>
              <h3 className="text-xl font-black text-gray-900 mb-2">Error Loading Hotels</h3>
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          ) : loading ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#673AB7] mb-4"></div>
              <h3 className="text-xl font-black text-gray-900">Searching for the best deals...</h3>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="text-xl font-black text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500 font-medium">Try adjusting your filters or price range to see more results.</p>
              <button 
                onClick={() => { setSelectedFilters([]); setMaxPrice(1000); }} 
                className="mt-6 bg-[#673AB7] text-white font-bold px-6 py-2 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 flex flex-col md:flex-row transition-all duration-300">
                
                {/* Image Section */}
                <div className="w-full md:w-[280px] h-60 md:h-auto relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hotel.image}')` }}></div>
                  {hotel.highlights?.[0] && (
                    <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {hotel.highlights[0]}
                    </span>
                  )}
                  <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/hotel/${hotel.id}?checkin=${checkin}&checkout=${checkout}&name=${encodeURIComponent(hotel.name)}&price=${hotel.price}&image=${encodeURIComponent(hotel.image)}&rating=${hotel.rating}&reviews=${hotel.reviews}&url=${encodeURIComponent(hotel.bookingUrl || "")}`}>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 hover:text-[#673AB7] cursor-pointer transition">{hotel.name}</h2>
                      </Link>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 bg-[#673AB7] text-white px-2 py-1 rounded-lg">
                          <span className="font-bold">{hotel.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium mt-1">{hotel.reviews} reviews</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                      <MapPin size={14} />
                      <span className="font-medium underline decoration-dotted cursor-pointer hover:text-[#673AB7]">{hotel.location}</span>
                      <span className="mx-1">•</span>
                      <span>{hotel.distance}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities?.popular?.slice(0, 4).map((feature: string, i: number) => (
                        <span key={i} className="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-end md:items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-green-600 font-bold mb-1">Limited availability</p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm font-medium">US${hotel.originalPrice}</span>
                        <span className="text-3xl font-black text-gray-900">US${hotel.price}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">Includes taxes and charges</p>
                    </div>
                    
                    <Link href={`/hotel/${hotel.id}?checkin=${checkin}&checkout=${checkout}&name=${encodeURIComponent(hotel.name)}&price=${hotel.price}&image=${encodeURIComponent(hotel.image)}&rating=${hotel.rating}&reviews=${hotel.reviews}&url=${encodeURIComponent(hotel.bookingUrl || "")}`} className="mt-4 md:mt-0 bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 rounded-xl font-bold shadow-md transition w-full md:w-auto text-center">
                      See availability
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Bottom padding filler / Additional content */}
      <div className="mt-12 bg-white pt-10">
        <RecentlyViewed />
        <MegaFooter />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold text-gray-500">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
