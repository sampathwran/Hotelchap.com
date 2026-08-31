"use client";
import { useTranslation } from "@/lib/i18n";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Heart, Wifi, Coffee, Car, Check, ChevronRight, Utensils, Info, Clock, AlertCircle, Sparkles, Navigation, Train, ShoppingBag, Wind } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { allCurrencies } from "@/components/CurrencyModal";
import { convertCurrency } from "@/lib/exchangeRates";
import { useState, Suspense, useEffect } from "react";
import MegaFooter from "@/components/MegaFooter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Header from "@/components/Header";

function HotelDetailsContent() {
  const { t } = useTranslation();
  const params = useParams();
  const { currency } = useSettings();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const hotelId = params?.id as string || "unknown";
  
  // Read core details from URL
  const urlName = searchParams.get("name") || "Hotel";
  const urlPrice = searchParams.get("price");
  const baseCurrency = searchParams.get("baseCurrency") || "USD";
  const displayPrice = urlPrice ? convertCurrency(Number(urlPrice), baseCurrency, currency) : 100;
  const urlImage = searchParams.get("image");
  const urlRating = searchParams.get("rating");
  const urlReviews = searchParams.get("reviews");
  const bookingUrl = searchParams.get("url") || "https://www.booking.com";

  const hotel = {
    id: hotelId,
    name: urlName,
    price: displayPrice,
    image: urlImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    rating: urlRating || "8.5",
    reviews: urlReviews || "120",
    location: "City Center",
  };

  // Add to recently viewed
  useEffect(() => {
    if (hotel.id !== "unknown" && hotel.name !== "Hotel") {
      try {
        const viewedItem = {
          id: hotel.id,
          type: "hotel",
          title: hotel.name,
          location: hotel.location,
          price: "$" + hotel.price,
          image: hotel.image,
          url: window.location.search ? `/hotel/${hotel.id}${window.location.search}` : `/hotel/${hotel.id}`,
          timestamp: Date.now()
        };
        
        const existingStr = localStorage.getItem('recentlyViewed');
        let existing = [];
        if (existingStr) {
          existing = JSON.parse(existingStr);
        }
        
        // Remove if already exists
        existing = existing.filter((item: any) => item.id !== hotel.id);
        
        // Add to beginning
        existing.unshift(viewedItem);
        
        // Keep only last 10
        if (existing.length > 10) {
          existing = existing.slice(0, 10);
        }
        
        localStorage.setItem('recentlyViewed', JSON.stringify(existing));
      } catch (e) {
        console.error("Failed to save recently viewed", e);
      }
    }
  }, [hotel.id, hotel.name, hotel.price, hotel.image, hotel.location]);

  const providers = [
    { name: "Booking.com", logo: "https://www.google.com/s2/favicons?domain=booking.com&sz=64", color: "border-blue-900", text: "text-blue-900", discount: 0, url: bookingUrl },
    { name: "Agoda", logo: "https://www.google.com/s2/favicons?domain=agoda.com&sz=64", color: "border-blue-500", text: "text-blue-500", discount: 5, url: `https://www.agoda.com/search?text=${encodeURIComponent(hotel.name)}` },
    { name: "Expedia", logo: "https://www.google.com/s2/favicons?domain=expedia.com&sz=64", color: "border-yellow-500", text: "text-yellow-600", discount: 2, url: `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(hotel.name)}` },
    { name: "Trip.com", logo: "https://www.google.com/s2/favicons?domain=trip.com&sz=64", color: "border-cyan-600", text: "text-cyan-600", discount: -2, url: `https://us.trip.com/hotels/list?city=1&keyword=${encodeURIComponent(hotel.name)}` },
  ];

  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);
  
  // Real Data State
  const [realDescription, setRealDescription] = useState("");
  const [realPhotos, setRealPhotos] = useState<string[]>([]);
  const [realFacilities, setRealFacilities] = useState<string[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`/api/hotels/details?id=${hotelId}`);
        const data = await res.json();
        
        if (data.description) {
          setRealDescription(data.description);
        }
        if (data.photos && data.photos.length > 0) {
          setRealPhotos(data.photos);
        }
        if (data.facilities && data.facilities.length > 0) {
          setRealFacilities(data.facilities);
        }
      } catch (err) {
        console.error("Failed to fetch real details:", err);
      } finally {
        setIsLoadingDetails(false);
      }
    }
    
    if (hotelId !== "unknown") {
      fetchDetails();
    }
  }, [hotelId]);

  const handleBook = (providerName: string, providerUrl: string) => {
    setIsRedirecting(providerName);
    setTimeout(() => {
      window.open(providerUrl, '_blank');
      setIsRedirecting(null);
    }, 2000);
  };

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#673AB7] border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Redirecting to {isRedirecting}...</h2>
        <p className="text-gray-500 font-medium">Please wait while we transfer you securely to complete your booking.</p>
      </div>
    );
  }

  // Fallback to URL image if real photos are missing/loading
  const displayPhotos = realPhotos.length >= 3 ? realPhotos : [hotel.image, hotel.image, hotel.image, hotel.image, hotel.image];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#673AB7]">{t("Home")}</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/search" className="hover:text-[#673AB7]">{t("Search Results")}</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 font-medium truncate max-w-xs">{hotel.name}</span>
        </div>

        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#673AB7] text-white text-xs font-bold px-2 py-1 rounded">{t("Recommended")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{hotel.name}</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin size={16} />
              <span className="font-medium underline decoration-dotted">{hotel.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-500">Guest rating</p>
              <p className="text-[#673AB7] font-bold">Excellent ({hotel.reviews} reviews)</p>
            </div>
            <div className="bg-[#673AB7] text-white text-2xl font-black px-4 py-2 rounded-xl">
              {hotel.rating}
            </div>
          </div>
        </div>

        {/* Dynamic Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[300px] md:h-[450px] mb-10">
          <div className="md:col-span-2 md:row-span-2 h-full">
            <img src={displayPhotos[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
          </div>
          <div className="hidden md:block h-full">
            <img src={displayPhotos[1]} alt="Side 1" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
          </div>
          <div className="hidden md:block h-full">
            <img src={displayPhotos[2]} alt="Side 2" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
          </div>
          <div className="hidden md:block h-full">
            <img src={displayPhotos[3]} alt="Side 3" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
          </div>
          <div className="hidden md:block h-full relative">
            <img src={displayPhotos[4]} alt="Side 4" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
            {realPhotos.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition">
                <span className="text-white font-bold text-xl">+{realPhotos.length - 5} photos</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content & Prices */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-2/3 space-y-10">
            {/* Description Section */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-4">About this property</h2>
              {isLoadingDetails ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ) : (
                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {realDescription}
                </div>
              )}
            </section>

            {/* Facilities Section */}
            {realFacilities.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Top Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                  {realFacilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Map Section */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-4">Location</h2>
              <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden relative">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(hotel.name)}&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          </div>

          {/* Pricing Sidebar (Metasearch Core) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">
                Compare Prices
              </h3>

              <div className="space-y-4">
                {providers.sort((a, b) => b.discount - a.discount).map((provider, idx) => {
                  const providerPrice = Math.round(hotel.price * (1 - provider.discount / 100));
                  const isCheapest = idx === 0;

                  return (
                    <div key={provider.name} className={`flex items-center justify-between p-3 rounded-xl border ${isCheapest ? 'border-green-400 bg-green-50' : 'border-gray-100 hover:border-gray-200'} transition`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-50 border ${provider.color}`}>
                          <img src={provider.logo} alt={provider.name} className="w-5 h-5 object-contain" />
                        </div>
                        <div>
                          <p className={`font-bold ${isCheapest ? 'text-gray-900' : 'text-gray-700'}`}>{provider.name}</p>
                          {isCheapest && <p className="text-[10px] uppercase font-black text-green-600 tracking-wider">Lowest Price</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-gray-900">${getCurrencySymbol(currency)} {providerPrice}</p>
                        <button 
                          onClick={() => handleBook(provider.name, provider.url)}
                          className={`mt-1 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm transition ${isCheapest ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          View Deal
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getCurrencySymbol = (code: string) => allCurrencies.find(c => c.code === code)?.symbol || code;

export default function HotelDetailsPage() {
    return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold text-gray-500">Loading hotel details...</div>}>
      <HotelDetailsContent />
    </Suspense>
  );
}
