"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Heart, Wifi, Coffee, Car, Check, ChevronRight, Utensils, Info, Clock, AlertCircle, Sparkles, Navigation, Train, ShoppingBag, Wind } from "lucide-react";
import { useState, Suspense } from "react";
import MegaFooter from "@/components/MegaFooter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Header from "@/components/Header";

function HotelDetailsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const hotelId = params?.id as string || "unknown";
  
  // Read details from URL if available
  const urlName = searchParams.get("name");
  const urlPrice = searchParams.get("price");
  const urlImage = searchParams.get("image");
  const urlRating = searchParams.get("rating");
  const urlReviews = searchParams.get("reviews");
  const bookingUrl = searchParams.get("url") || "https://www.booking.com";

  const hotel = {
    id: hotelId,
    name: urlName || "Grand Plaza Hotel",
    price: urlPrice ? parseInt(urlPrice) : 150,
    image: urlImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    rating: urlRating || "8.5",
    reviews: urlReviews || "120",
    location: "City Center",
    gallery: [
      urlImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop",
    ]
  };

  const providers = [
    { name: "Agoda", logo: "https://www.google.com/s2/favicons?domain=agoda.com&sz=64", color: "border-blue-500", text: "text-blue-500", discount: 5, url: `https://www.agoda.com/search?text=${encodeURIComponent(hotel.name)}` },
    { name: "Expedia", logo: "https://www.google.com/s2/favicons?domain=expedia.com&sz=64", color: "border-yellow-500", text: "text-yellow-600", discount: 2, url: `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(hotel.name)}` },
    { name: "Booking.com", logo: "https://www.google.com/s2/favicons?domain=booking.com&sz=64", color: "border-blue-900", text: "text-blue-900", discount: 0, url: bookingUrl },
    { name: "Trip.com", logo: "https://www.google.com/s2/favicons?domain=trip.com&sz=64", color: "border-cyan-600", text: "text-cyan-600", discount: -2, url: `https://us.trip.com/hotels/list?city=1&keyword=${encodeURIComponent(hotel.name)}` },
    { name: "Hotels.com", logo: "https://www.google.com/s2/favicons?domain=hotels.com&sz=64", color: "border-red-600", text: "text-red-600", discount: 1, url: `https://www.hotels.com/search.do?q-destination=${encodeURIComponent(hotel.name)}` },
    { name: "Traveloka", logo: "https://www.google.com/s2/favicons?domain=traveloka.com&sz=64", color: "border-sky-500", text: "text-sky-500", discount: 3, url: `https://www.traveloka.com/en-en/hotel/search?keyword=${encodeURIComponent(hotel.name)}` },
    { name: "Trivago", logo: "https://www.google.com/s2/favicons?domain=trivago.com&sz=64", color: "border-orange-500", text: "text-orange-500", discount: -1, url: `https://www.trivago.com/search?query=${encodeURIComponent(hotel.name)}` },
    { name: "Kayak", logo: "https://www.google.com/s2/favicons?domain=kayak.com&sz=64", color: "border-orange-600", text: "text-orange-600", discount: 4, url: `https://www.kayak.com/hotels/${encodeURIComponent(hotel.name)}` }
  ];

  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);

  const handleBook = (providerName: string, providerUrl: string) => {
    setIsRedirecting(providerName);
    setTimeout(() => {
      // Direct user to the actual OTA using Stay22 interception logic
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#673AB7]">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/search" className="hover:text-[#673AB7]">Search Results</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 font-medium truncate max-w-xs">{hotel.name}</span>
        </div>

        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#673AB7] text-white text-xs font-bold px-2 py-1 rounded">Recommended</span>
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

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden h-[400px] mb-10">
          <div className="md:col-span-2 h-full">
            <img src={hotel.gallery[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={hotel.gallery[1]} alt="Side 1" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
            <img src={hotel.gallery[2]} alt="Side 2" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
          </div>
        </div>

        {/* Main Content & Prices */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-2/3 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-600 leading-relaxed">
                Experience world-class service at {hotel.name}. Located centrally in {hotel.location}, 
                this property offers luxurious accommodations, stunning views, and top-tier amenities.
              </p>
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
                  const providerPrice = hotel.price - provider.discount;
                  const isCheapest = idx === 0;

                  return (
                    <div key={provider.name} className={"flex items-center justify-between p-3 rounded-xl border  transition"}>
                      <div className="flex items-center gap-3">
                        <div className={"w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-50 border "}>
                          <img src={provider.logo} alt={provider.name} className="w-5 h-5 object-contain" />
                        </div>
                        <div>
                          <p className={"font-bold "}>{provider.name}</p>
                          {isCheapest && <p className="text-[10px] uppercase font-black text-green-600 tracking-wider">Lowest Price</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-gray-900">US$${providerPrice}</p>
                        <button 
                          onClick={() => handleBook(provider.name, provider.url)}
                          className={"mt-1 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm transition "}
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

export const dynamic = 'force-dynamic';

export default function HotelDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold text-gray-500">Loading hotel details...</div>}>
      <HotelDetailsContent />
    </Suspense>
  );
}
