"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Heart, Wifi, Coffee, Car, Check } from "lucide-react";
import { Suspense, useState, useMemo } from "react";
import MegaFooter from "@/components/MegaFooter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Header from "@/components/Header";
import { filterCategories } from "@/lib/filterData";

import { mockHotels } from "@/lib/mockHotels";

function SearchResults() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "Popular Destinations";
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guests = searchParams.get("guests") || "2";
  const type = searchParams.get("type") || "hotels";

  // Filter State
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const handleFilterToggle = (option: string) => {
    setSelectedFilters(prev => 
      prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]
    );
  };

  const filteredHotels = useMemo(() => {
    return mockHotels.filter(hotel => {
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
  }, [selectedFilters, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-8">
        
        {/* Search Summary Bar */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">{destination}: {filteredHotels.length} properties found</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">
              {checkin && checkout ? `${checkin} to ${checkout} • ` : ""}
              {guests} Guest(s) • {type === "flights" ? "Flights" : "Hotels"}
            </p>
          </div>
          <Link href="/" className="bg-[#673AB7] hover:bg-[#522b94] text-white px-6 py-2.5 rounded-xl font-bold transition shadow-md">
            Change Search
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
              
              {/* Filter Header & Map Switch */}
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <h3 className="font-black text-gray-900 text-lg">Filter by:</h3>
                <span onClick={() => { setSelectedFilters([]); setMaxPrice(500); }} className="text-sm font-bold text-[#673AB7] cursor-pointer hover:underline">Reset All</span>
              </div>
              
              <div className="p-5 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                
                {/* Custom Price Slider Filter */}
                <div className="mb-6 border-b border-gray-100 pb-6">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">Max Price per night: US${maxPrice}</h4>
                  <div className="flex items-center gap-3 mb-2">
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
                    {category.options.length >= 4 && (
                      <button className="text-[#673AB7] text-sm font-bold mt-3 hover:underline flex items-center gap-1">
                        Show More <span>▾</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 flex flex-col gap-6">
          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="text-xl font-black text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500 font-medium">Try adjusting your filters or price range to see more results.</p>
              <button 
                onClick={() => { setSelectedFilters([]); setMaxPrice(500); }} 
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
                      <Link href={`/hotel/${hotel.id}`}>
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
                      {hotel.amenities?.popular?.slice(0, 4).map((feature, i) => (
                        <span key={i} className="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-end md:items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-green-600 font-bold mb-1">Only 2 rooms left at this price on our site</p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm font-medium">${hotel.originalPrice}</span>
                        <span className="text-3xl font-black text-gray-900">${hotel.price}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">Includes taxes and charges</p>
                    </div>
                    
                    <Link href={`/hotel/${hotel.id}`} className="mt-4 md:mt-0 bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 rounded-xl font-bold shadow-md transition w-full md:w-auto text-center">
                      See availability
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold text-gray-500">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
