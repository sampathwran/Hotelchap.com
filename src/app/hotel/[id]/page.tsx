"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Heart, Wifi, Coffee, Car, Check, ChevronRight, Utensils, Info, Clock, AlertCircle, Sparkles, Navigation, Train, ShoppingBag, Wind } from "lucide-react";
import { mockHotels } from "@/lib/mockHotels";
import { useState } from "react";
import MegaFooter from "@/components/MegaFooter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Header from "@/components/Header";

export default function HotelDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const hotelId = params.id as string;
  
  const hotel = mockHotels.find(h => h.id === hotelId) || mockHotels[0];

  const providers = [
    { name: "Agoda", logo: "A", color: "bg-blue-500", text: "text-blue-500", discount: 5 },
    { name: "Booking.com", logo: "B", color: "bg-blue-900", text: "text-blue-900", discount: 0 },
    { name: "Trip.com", logo: "T", color: "bg-cyan-600", text: "text-cyan-600", discount: -2 },
    { name: "Traveloka", logo: "V", color: "bg-sky-500", text: "text-sky-500", discount: 3 }
  ];

  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);

  const handleBook = (provider: string, finalPrice: number) => {
    setIsRedirecting(provider);
    setTimeout(() => {
      router.push(`/checkout-simulation?hotel=${hotel.id}&provider=${provider}&price=${finalPrice}`);
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
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-6 border-b border-gray-200 mb-6 pb-2 text-sm font-bold text-gray-600">
          <a href="#overview" className="text-[#673AB7] border-b-2 border-[#673AB7] pb-2 whitespace-nowrap">Overview</a>
          <a href="#rooms" className="hover:text-[#673AB7] whitespace-nowrap">Rooms & Prices</a>
          <a href="#facilities" className="hover:text-[#673AB7] whitespace-nowrap">Facilities</a>
          <a href="#location" className="hover:text-[#673AB7] whitespace-nowrap">Location</a>
          <a href="#policies" className="hover:text-[#673AB7] whitespace-nowrap">Policies</a>
          <a href="#reviews" className="hover:text-[#673AB7] whitespace-nowrap">Reviews ({hotel.reviews})</a>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-4">
          <Link href="/" className="hover:text-[#673AB7]">Home</Link>
          <ChevronRight size={14} />
          <Link href="/search" className="hover:text-[#673AB7]">Search Results</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900">{hotel.name}</span>
        </div>

        {/* Title & Top Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4" id="overview">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex text-yellow-400">
                {[...Array(hotel.starRating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </span>
              <span className="bg-gray-200 text-xs px-2 py-0.5 rounded font-bold text-gray-700">Hotel</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900">{hotel.name}</h1>
            <p className="text-gray-500 font-medium mt-2 flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#673AB7]"/> 
              <span>{hotel.address} <br/> 
                <span className="text-[#673AB7] font-bold cursor-pointer hover:underline">Excellent location - show map</span>
              </span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-right">
                <p className="text-sm text-gray-500 font-bold">Prices from</p>
                <p className="text-3xl font-black text-gray-900">${hotel.price}</p>
              </div>
              <button className="bg-white border border-gray-200 text-[#673AB7] p-3 rounded-lg shadow-sm hover:bg-gray-50">
                <Heart size={20} />
              </button>
            </div>
            <a href="#rooms" className="bg-[#673AB7] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#522b94] transition shadow-md whitespace-nowrap text-lg w-full text-center md:w-auto">
              Select Room
            </a>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 h-[300px] md:h-[450px] mb-8 rounded-xl overflow-hidden">
          <div className="col-span-1 md:col-span-2 h-full relative group">
            <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${hotel.gallery[0] || hotel.image}')` }}></div>
          </div>
          <div className="hidden md:flex flex-col gap-3 h-full">
            <div className="flex-1 relative group overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${hotel.gallery[1] || hotel.image}')` }}></div>
            </div>
            <div className="flex-1 relative group overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${hotel.gallery[2] || hotel.image}')` }}></div>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-3 h-full">
            <div className="flex-1 relative group overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${hotel.gallery[3] || hotel.image}')` }}></div>
            </div>
            <div className="flex-1 relative group overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${hotel.gallery[4] || hotel.image}')` }}></div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition">
                <span className="text-white font-bold text-lg">See All Photos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Left Column */}
          <div className="w-full lg:w-2/3">
            
            {/* Highlights & AI Summary */}
            <div className="mb-10">
              <div className="flex flex-wrap gap-3 mb-6">
                {hotel.highlights?.map((h, i) => (
                  <span key={i} className="bg-orange-50 text-orange-700 border border-orange-100 font-bold text-xs px-3 py-1.5 rounded-full">
                    🔥 {h}
                  </span>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-100 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-[#673AB7]" />
                  <h3 className="font-black text-gray-900">Review Summary <span className="text-xs font-bold text-gray-500 bg-white px-2 py-0.5 rounded border ml-2">Powered by AI</span></h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  "{hotel.aiSummary}"
                </p>
              </div>

              <h2 className="text-2xl font-black text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                {hotel.description}
              </p>
            </div>

            {/* Room Types (Meta-Search per room) */}
            <div id="rooms" className="mb-10">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Available Rooms</h2>
              
              <div className="space-y-6">
                {hotel.roomTypes?.map((room, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                    {/* Room Info */}
                    <div className="w-full md:w-1/3 border-r border-gray-100 p-0 relative">
                      <div className="h-48 md:h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${room.image}')` }}></div>
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800 flex items-center gap-1">
                        <Wind size={12}/> {room.size}
                      </div>
                    </div>
                    
                    {/* Room Details & Meta-Search Offers */}
                    <div className="w-full md:w-2/3 p-5 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-xl text-gray-900">{room.name}</h3>
                        <div className="flex text-gray-400">{'👤'.repeat(room.guests)}</div>
                      </div>
                      <p className="text-sm text-gray-600 font-bold mb-4">🛏️ {room.beds}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {room.features.map(f => (
                          <span key={f} className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">
                            ✓ {f}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto border-t border-gray-100 pt-4">
                        <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Compare Offers</h4>
                        
                        {room.offers.map((offer, oIdx) => {
                          const baseOfferPrice = Math.round(room.basePrice * offer.multiplier);
                          return (
                            <div key={oIdx} className="mb-4 last:mb-0">
                              <p className="text-sm font-bold text-gray-800 mb-2">{offer.type}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {providers.map((p, pIdx) => {
                                  const finalPrice = baseOfferPrice - p.discount;
                                  return (
                                    <div key={pIdx} className="border border-gray-200 rounded-lg p-2 text-center hover:border-[#673AB7] transition group cursor-pointer" onClick={() => handleBook(p.name, finalPrice)}>
                                      <span className={`text-xs font-black block mb-1 ${p.text}`}>{p.name}</span>
                                      <span className="text-lg font-black text-gray-900 block">${finalPrice}</span>
                                      <button className="text-[10px] bg-gray-100 group-hover:bg-[#673AB7] group-hover:text-white font-bold w-full py-1 rounded mt-1 transition">
                                        View Deal
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                        
                        {room.left < 3 && <p className="text-xs text-red-600 font-bold mt-4 animate-pulse">🔥 Hurry! Only {room.left} rooms left for your dates.</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Amenities */}
            <div id="facilities" className="mb-10">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Facilities & Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 border border-gray-200 rounded-2xl">
                <div>
                  <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2 text-lg"><Wifi size={20} className="text-[#673AB7]"/> Internet</h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-medium">
                    {hotel.amenities?.internet.map(a => <li key={a}>• {a}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2 text-lg"><Car size={20} className="text-[#673AB7]"/> Parking</h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-medium">
                    {hotel.amenities?.parking.map(a => <li key={a}>• {a}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2 text-lg"><Heart size={20} className="text-[#673AB7]"/> Wellness</h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-medium">
                    {hotel.amenities?.wellness.map(a => <li key={a}>• {a}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2 text-lg"><Utensils size={20} className="text-[#673AB7]"/> Food & Drink</h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-medium">
                    {hotel.amenities?.foodAndDrink.map(a => <li key={a}>• {a}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div id="policies" className="mb-10">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Property Policies</h2>
              <div className="border border-gray-200 rounded-2xl overflow-hidden text-sm bg-white">
                <div className="flex border-b border-gray-100 p-4 lg:p-6">
                  <div className="w-1/3 font-black text-gray-900 flex items-center gap-2"><Clock size={18} className="text-gray-400"/> Check-in</div>
                  <div className="w-2/3 text-gray-700 font-medium">{hotel.policies?.checkIn}</div>
                </div>
                <div className="flex border-b border-gray-100 p-4 lg:p-6">
                  <div className="w-1/3 font-black text-gray-900 flex items-center gap-2"><Clock size={18} className="text-gray-400"/> Check-out</div>
                  <div className="w-2/3 text-gray-700 font-medium">{hotel.policies?.checkOut}</div>
                </div>
                <div className="flex border-b border-gray-100 p-4 lg:p-6">
                  <div className="w-1/3 font-black text-gray-900 flex items-center gap-2"><Info size={18} className="text-gray-400"/> Children</div>
                  <div className="w-2/3 text-gray-700 font-medium">{hotel.policies?.children}</div>
                </div>
                <div className="flex p-4 lg:p-6">
                  <div className="w-1/3 font-black text-gray-900 flex items-center gap-2"><AlertCircle size={18} className="text-gray-400"/> Pets</div>
                  <div className="w-2/3 text-gray-700 font-medium">{hotel.policies?.pets}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar Column */}
          <div className="w-full lg:w-1/3">
            
            {/* Reviews Widget */}
            <div id="reviews" className="bg-[#673AB7] text-white p-6 rounded-2xl shadow-lg mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white text-[#673AB7] w-14 h-14 flex items-center justify-center font-black text-2xl rounded-xl">
                  {(hotel.rating * 2).toFixed(1)}
                </div>
                <div>
                  <h4 className="font-black text-xl">Exceptional</h4>
                  <p className="text-white/80 font-medium text-sm">{hotel.reviews} verified reviews</p>
                </div>
              </div>
              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between items-center">
                  <span>Cleanliness</span> <div className="w-1/2 bg-white/20 h-2 rounded-full overflow-hidden"><div className="bg-green-400 h-full w-[95%]"></div></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Location</span> <div className="w-1/2 bg-white/20 h-2 rounded-full overflow-hidden"><div className="bg-green-400 h-full w-[98%]"></div></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Service</span> <div className="w-1/2 bg-white/20 h-2 rounded-full overflow-hidden"><div className="bg-green-400 h-full w-[90%]"></div></div>
                </div>
              </div>
            </div>

            {/* Map & Location */}
            <div id="location" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
              <div className="h-48 bg-gray-200 relative cursor-pointer group">
                <div className="absolute inset-0 flex items-center justify-center bg-[#ebf3ff]">
                  <img src="https://static-00.iconduck.com/assets.00/map-icon-2048x1420-137a85i8.png" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500" />
                  <div className="absolute bg-[#673AB7] text-white px-5 py-2.5 rounded-xl font-black shadow-lg flex items-center gap-2 group-hover:bg-[#522b94] transition">
                    <MapPin size={18} /> View on Map
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2"><Navigation size={18} className="text-[#673AB7]"/> In the Area</h4>
                <div className="space-y-3">
                  {hotel.surroundings?.map((s, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-2 text-gray-700 font-medium">
                        {s.type === 'transport' ? <Train size={14} className="text-gray-400"/> : s.type === 'shopping' ? <ShoppingBag size={14} className="text-gray-400"/> : <MapPin size={14} className="text-gray-400"/>}
                        {s.name}
                      </span>
                      <span className="text-gray-500 font-bold">{s.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
