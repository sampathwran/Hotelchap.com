"use client";
import { useTranslation } from "@/lib/i18n";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Heart, Wifi, Coffee, Car, Check, Calendar, UserCheck } from "lucide-react";
import { Suspense, useState, useMemo, useEffect } from "react";
import MegaFooter from "@/components/MegaFooter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Header from "@/components/Header";
import { filterCategories } from "@/lib/filterData";
import { allCurrencies } from "@/components/CurrencyModal";
import { useSettings } from "@/context/SettingsContext";
import { addToWishlist, isInWishlist, removeFromWishlist } from "@/utils/wishlistStore";

const getCurrencySymbol = (code: string) => allCurrencies.find(c => c.code === code)?.symbol || code;

function SearchResults() {
  const { t } = useTranslation();
  const { currency } = useSettings();
  const searchParams = useSearchParams();
  
  // Calculate today and tomorrow for dynamic defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const destination = searchParams.get("city") || searchParams.get("destination") || "Colombo";
  const checkin = searchParams.get("checkin") || todayStr;
  const checkout = searchParams.get("checkout") || tomorrowStr;
  
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [adults, setAdults] = useState(parseInt(searchParams.get("adults") || "2", 10));
  const [children, setChildren] = useState(parseInt(searchParams.get("children") || "0", 10));
  const [rooms, setRooms] = useState(parseInt(searchParams.get("rooms") || "1", 10));

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
        const res = await fetch(`/api/hotels/search?city=${destination}&checkin=${checkin}&checkout=${checkout}&currency=${currency}`, { cache: 'no-store' });
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
  }, [destination, checkin, checkout, currency]);

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
      
      {/* Search Bar */}
        <div className="bg-white border-b border-gray-200 py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <form key={destination + checkin + checkout} action="/search" method="GET" className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-3 md:p-4 flex flex-col md:flex-row items-center gap-3 mt-4 relative z-10 transition-all duration-500">
<div className="flex-1 w-full flex flex-col bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-1.5 md:py-1 border border-gray-200 focus-within:border-[#673AB7] focus-within:bg-white transition relative">
                    <label className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mb-0.5">{t("Destination")}</label>
                    <div className="flex items-center">
                      <MapPin size={18} className="text-gray-400 mr-2" />
                      <input type="text" name="city" placeholder={t("Find your next stay...")} defaultValue={destination} className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-bold placeholder-gray-400" required />
                    </div>
                  </div>

                  <div className="flex w-full md:w-auto gap-2">
                    <div className="flex-1 md:w-36 flex flex-col bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-1.5 md:py-1 border border-gray-200 focus-within:border-[#673AB7] focus-within:bg-white transition relative">
                      <label className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mb-0.5">{t("Check-in")}</label>
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2 hidden md:block" />
                        <input type="date" name="checkin" min={todayStr} defaultValue={checkin} className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-bold text-sm cursor-pointer" required />
                      </div>
                    </div>
                    
                    <div className="flex-1 md:w-36 flex flex-col bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-1.5 md:py-1 border border-gray-200 focus-within:border-[#673AB7] focus-within:bg-white transition relative">
                      <label className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mb-0.5">{t("Check-out")}</label>
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2 hidden md:block" />
                        <input type="date" name="checkout" min={todayStr} defaultValue={checkout} className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-bold text-sm cursor-pointer" required />
                      </div>
                    </div>
                  </div>

                  {/* Custom Guest Picker */}
                  <div className="w-full md:w-auto min-w-[200px] flex flex-col bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-1.5 md:py-1 border border-gray-200 transition relative">
                    <label className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mb-0.5">{t("Guests & Rooms")}</label>
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => setShowGuestPicker(!showGuestPicker)}
                    >
                      <UserCheck size={18} className="text-gray-400 mr-2 hidden md:block" />
                      <div className="text-sm font-bold text-gray-900 select-none truncate">
                        {adults + children} {adults + children === 1 ? t('Guest') : t('Guests')}, {rooms} {rooms === 1 ? t('Room') : t('Rooms')}
                      </div>
                    </div>
                    
                    {/* Dropdown Menu */}
                    {showGuestPicker && (
                      <>
                        {/* Overlay to close when clicking outside */}
                        <div className="fixed inset-0 z-40" onClick={() => setShowGuestPicker(false)}></div>
                        
                        <div className="absolute top-[110%] right-0 md:left-0 w-full md:w-80 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                          
                          {/* Adults */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{t("Adults")}</p>
                              <p className="text-xs text-gray-500 font-medium">{t("Age 18+")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm disabled:opacity-50" disabled={adults <= 1}>
                                <span className="text-xl leading-none">-</span>
                              </button>
                              <span className="font-bold text-lg w-6 text-center">{adults}</span>
                              <button type="button" onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm">
                                <span className="text-xl leading-none">+</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Children */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{t("Children")}</p>
                              <p className="text-xs text-gray-500 font-medium">{t("Ages 0-17")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm disabled:opacity-50" disabled={children <= 0}>
                                <span className="text-xl leading-none">-</span>
                              </button>
                              <span className="font-bold text-lg w-6 text-center">{children}</span>
                              <button type="button" onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm">
                                <span className="text-xl leading-none">+</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Rooms */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{t("Rooms")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm disabled:opacity-50" disabled={rooms <= 1}>
                                <span className="text-xl leading-none">-</span>
                              </button>
                              <span className="font-bold text-lg w-6 text-center">{rooms}</span>
                              <button type="button" onClick={() => setRooms(rooms + 1)} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm">
                                <span className="text-xl leading-none">+</span>
                              </button>
                            </div>
                          </div>
                          
                          <button type="button" onClick={() => setShowGuestPicker(false)} className="w-full py-3 bg-[#673AB7]/10 text-[#673AB7] font-bold text-lg rounded-xl hover:bg-[#673AB7] hover:text-white transition-colors duration-300">
                            {t("Done")}
                          </button>
                        </div>
                      </>
                    )}
                    <input type="hidden" name="adults" value={adults} />
                    <input type="hidden" name="children" value={children} />
                    <input type="hidden" name="rooms" value={rooms} />
                  </div>

                  <button type="submit" className="w-full md:w-auto bg-[#673AB7] hover:bg-purple-700 text-white px-8 py-4 md:py-3 rounded-lg font-bold transition transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2 text-lg md:text-base">
                    {t("Search")}
                  </button>
</form>

            <div className="mt-4 text-gray-600 font-medium text-sm">
              <span className="font-bold text-gray-900">{destination}: {apiHotels.length} properties found</span> &nbsp;|&nbsp; Check-in: {checkin} &nbsp;|&nbsp; Check-out: {checkout}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8 w-full relative z-10">
        
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
                    <span className="text-gray-400 text-xs font-bold mr-1">USD</span>
                    <input type="number" value="0" disabled className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none" />
                  </div>
                  <span className="text-gray-400 font-bold">-</span>
                  <div className="flex-1 bg-white border border-gray-200 rounded-lg p-2 flex items-center">
                    <span className="text-gray-400 text-xs font-bold mr-1">USD</span>
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
                  <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToWishlist({
                          id: hotel.id,
                          type: "hotel",
                          title: hotel.name,
                          location: "City Center",
                          image: hotel.image,
                          price: `{getCurrencySymbol(currency)}${hotel.price}`,
                          rating: hotel.rating
                        });
                      }}
                      className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition z-10"
                    >
                      <Heart size={20} />
                    </button>
                </div>

                {/* Content Section */}
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/hotel/${hotel.id}?checkin=${checkin}&checkout=${checkout}&name=${encodeURIComponent(hotel.name)}&price=${hotel.price}&baseCurrency=${currency}&image=${encodeURIComponent(hotel.image)}&rating=${hotel.rating}&reviews=${hotel.reviews}&url=${btoa(hotel.bookingUrl || "")}`}>
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
                        <span className="text-gray-400 line-through text-sm font-medium">{getCurrencySymbol(currency)} {hotel.originalPrice}</span>
                        <span className="text-3xl font-black text-gray-900">{getCurrencySymbol(currency)} {hotel.price}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">Includes taxes and charges</p>
                    </div>
                    
                    <Link href={`/hotel/${hotel.id}?checkin=${checkin}&checkout=${checkout}&name=${encodeURIComponent(hotel.name)}&price=${hotel.price}&baseCurrency=${currency}&image=${encodeURIComponent(hotel.image)}&rating=${hotel.rating}&reviews=${hotel.reviews}&url=${btoa(hotel.bookingUrl || "")}`} className="mt-4 md:mt-0 bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 rounded-xl font-bold shadow-md transition w-full md:w-auto text-center">
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

export default function SearchPage() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold text-gray-500">{t("Loading search results...")}</div>}>
      <SearchResults />
    </Suspense>
  );
}
