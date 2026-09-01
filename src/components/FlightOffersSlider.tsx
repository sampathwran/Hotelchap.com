"use client";

import { useEffect, useState, useRef } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Plane, ShieldCheck, Globe, Star, Zap, Sun, Umbrella, Heart, Map, Clock } from "lucide-react";

interface FlightOffer {
  id: string;
  title: string;
  badgeText: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  designId: number;
}

const DESIGN_PRESETS: Record<number, { bgClass: string; icon: any; iconColor: string; textColor: string; subTextColor: string; buttonBg: string; buttonText: string }> = {
  1: { bgClass: "from-blue-600 to-indigo-700", icon: Plane, iconColor: "text-white/10", textColor: "text-white", subTextColor: "text-blue-100", buttonBg: "bg-white", buttonText: "text-indigo-700" },
  2: { bgClass: "from-orange-500 to-red-500", icon: ShieldCheck, iconColor: "text-white/10", textColor: "text-white", subTextColor: "text-red-100", buttonBg: "bg-white", buttonText: "text-red-500" },
  3: { bgClass: "from-teal-500 to-emerald-600", icon: Globe, iconColor: "text-white/10", textColor: "text-white", subTextColor: "text-teal-100", buttonBg: "bg-white", buttonText: "text-emerald-700" },
  4: { bgClass: "from-purple-500 to-pink-500", icon: Star, iconColor: "text-white/10", textColor: "text-white", subTextColor: "text-purple-100", buttonBg: "bg-white", buttonText: "text-purple-700" },
  5: { bgClass: "from-gray-900 to-black", icon: Zap, iconColor: "text-green-500/10", textColor: "text-white", subTextColor: "text-gray-400", buttonBg: "bg-green-500", buttonText: "text-black" },
  6: { bgClass: "from-yellow-400 to-amber-500", icon: Sun, iconColor: "text-orange-600/10", textColor: "text-gray-900", subTextColor: "text-gray-800", buttonBg: "bg-gray-900", buttonText: "text-white" },
  7: { bgClass: "from-cyan-400 to-blue-500", icon: Umbrella, iconColor: "text-white/10", textColor: "text-white", subTextColor: "text-cyan-100", buttonBg: "bg-white", buttonText: "text-blue-600" },
  8: { bgClass: "from-rose-500 to-orange-400", icon: Heart, iconColor: "text-white/10", textColor: "text-white", subTextColor: "text-rose-100", buttonBg: "bg-white", buttonText: "text-rose-600" },
  9: { bgClass: "from-indigo-800 to-purple-900", icon: Map, iconColor: "text-white/5", textColor: "text-white", subTextColor: "text-indigo-200", buttonBg: "bg-white", buttonText: "text-indigo-900" },
  10: { bgClass: "from-slate-700 to-gray-800", icon: Clock, iconColor: "text-white/5", textColor: "text-white", subTextColor: "text-gray-300", buttonBg: "bg-white", buttonText: "text-gray-900" },
};

export default function FlightOffersSlider() {
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const q = query(collection(db, "flight_offers"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FlightOffer));
        setOffers(data);
      } catch (error) {
        console.error("Error fetching flight offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (offers.length <= 1 || !scrollContainerRef.current) return;
    
    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const scrollAmount = container.clientWidth;
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      
      if (isAtEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [offers.length]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  if (offers.length === 0) {
    return null; // Hide the section completely if there are no offers
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 w-full overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {offers.map((offer) => {
          const design = DESIGN_PRESETS[offer.designId] || DESIGN_PRESETS[1];
          const IconComponent = design.icon;

          return (
            <div 
              key={offer.id} 
              className={`min-w-[80%] sm:min-w-[60%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start shrink-0 bg-gradient-to-r ${design.bgClass} rounded-xl md:rounded-3xl p-4 md:p-8 relative overflow-hidden shadow-lg transform hover:-translate-y-1 transition duration-300`}
            >
              <div className={`absolute right-0 top-0 w-64 h-64 transform translate-x-16 -translate-y-16 ${design.iconColor}`}>
                <IconComponent size={256} />
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between items-start min-h-[130px] md:min-h-[220px]">
                <div>
                  <span className={`${design.textColor === "text-white" ? "bg-white/20" : "bg-black/10"} px-2 py-1 md:px-3 rounded-full text-[10px] md:text-sm font-bold tracking-widest uppercase mb-4 inline-block ${design.textColor}`}>
                    {offer.badgeText}
                  </span>
                  <h3 className={`text-base md:text-3xl font-black mb-1 md:mb-3 ${design.textColor}`}>
                    {offer.title}
                  </h3>
                  <p className={`${design.subTextColor} mb-4 md:mb-8 max-w-sm font-medium text-xs md:text-base line-clamp-2 md:line-clamp-3`}>
                    {offer.description}
                  </p>
                </div>
                
                <a 
                  href={offer.buttonLink || "#"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${design.buttonBg} ${design.buttonText} font-bold px-3 py-1.5 md:px-6 md:py-3 rounded-md md:rounded-xl text-[10px] md:text-base shadow-md hover:scale-105 transition-transform mt-auto`}
                >
                  {offer.buttonText || "Book Now"}
                </a>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Hide scrollbar styles injection */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
