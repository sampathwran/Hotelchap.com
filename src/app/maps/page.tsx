"use client";
import { useTranslation } from "@/lib/i18n";

import { useState } from "react";
import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import { Search, MapPin, Navigation, Star, Map as MapIcon, Coffee, Bed, Camera } from "lucide-react";

export default function MapsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  // Default map location is Sri Lanka
  const [mapLocation, setMapLocation] = useState("Sri Lanka");

  const trendingLocations = [
    { name: t("Colombo, Sri Lanka"), desc: t("Vibrant city life and coastal views"), img: "https://images.unsplash.com/photo-1572973211553-61ebce67c61c?q=80&w=200&auto=format&fit=crop" },
    { name: t("Kandy, Sri Lanka"), desc: t("Cultural capital and lush mountains"), img: "https://images.unsplash.com/photo-1620619553765-b1a8d0526e0e?q=80&w=200&auto=format&fit=crop" },
    { name: t("Galle, Sri Lanka"), desc: t("Historic fort and stunning beaches"), img: "https://images.unsplash.com/photo-1549479361-bd80c05763bd?q=80&w=200&auto=format&fit=crop" },
    { name: t("Bali, Indonesia"), desc: t("Tropical paradise and temples"), img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=200&auto=format&fit=crop" },
    { name: t("Paris, France"), desc: t("The city of love and lights"), img: "https://images.unsplash.com/photo-1502602898657-3e907614d642?q=80&w=200&auto=format&fit=crop" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setMapLocation(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Header />

      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-96px)]">
        
        {/* Left Sidebar (Search & Trending) */}
        <div className="w-full lg:w-[400px] xl:w-[450px] bg-white border-r border-gray-200 flex flex-col h-full z-10 shadow-[5px_0_15px_rgba(0,0,0,0.02)] shrink-0 overflow-y-auto hidden-scrollbar">
          <div className="p-6">
            <h1 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
              <MapIcon className="text-[#673AB7]" size={32} />
              {t("Explore Maps")}
            </h1>
            <p className="text-gray-500 text-sm font-medium mb-6">{t("Discover hotels, attractions, and hidden gems around the world.")}</p>
            
            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative mb-8">
              <input 
                type="text" 
                placeholder="Search a city, country, or place..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-xl py-3.5 pl-12 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#673AB7] font-medium"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <button type="submit" className="hidden"></button>
            </form>

            {/* Quick Filters */}
            <div className="flex gap-2 overflow-x-auto hidden-scrollbar mb-8 pb-2">
              <button className="bg-[#673AB7] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 whitespace-nowrap shadow-md">
                <Bed size={16} /> Hotels
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors">
                <Camera size={16} /> {t("Attractions")}
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors">
                <Coffee size={16} /> Restaurants
              </button>
            </div>

            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <Star className="text-orange-500 fill-orange-500" size={18} />
              {t("Trending Locations")}
            </h2>
            
            <div className="space-y-4">
              {trendingLocations.map((loc, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setMapLocation(loc.name);
                    setSearchQuery(loc.name);
                  }}
                  className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all border ${mapLocation === loc.name ? 'border-[#673AB7] bg-purple-50 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
                >
                  <img src={loc.img} alt={loc.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                  <div>
                    <h3 className={`font-bold ${mapLocation === loc.name ? 'text-[#673AB7]' : 'text-gray-900'}`}>{loc.name}</h3>
                    <p className="text-xs font-medium text-gray-500 mt-1">{loc.desc}</p>
                  </div>
                  <Navigation size={16} className={`ml-auto ${mapLocation === loc.name ? 'text-[#673AB7]' : 'text-gray-300'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Map Area */}
        <div className="flex-1 bg-gray-200 relative h-[500px] lg:h-auto">
          {/* We use a Google Maps iframe for an authentic interactive map experience */}
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            className="absolute inset-0"
          ></iframe>
          
          {/* Overlay Pill */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-3 z-20 pointer-events-none">
            <MapPin className="text-red-500" size={20} />
            <span className="font-bold text-gray-800">Viewing: {mapLocation}</span>
          </div>
        </div>

      </main>

    </div>
  );
}
