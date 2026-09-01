"use client";

import { useEffect, useState, useRef } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

interface FlightRoute {
  id: string;
  from: string;
  to: string;
  price: string;
  img: string;
}

export default function PopularFlightRoutes() {
  const [routes, setRoutes] = useState<FlightRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const q = query(collection(db, "popular_flight_routes"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FlightRoute));
        setRoutes(data);
      } catch (error) {
        console.error("Error fetching flight routes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  
  useEffect(() => {
    if (routes.length <= 1 || !scrollRef.current) return;
    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container || window.innerWidth >= 768) return; // Only auto-slide on mobile
      const scrollAmount = container.clientWidth;
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      if (isAtEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [routes.length]);

  if (loading) {
    return (
      <div className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded mb-8"></div>
          
        <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div 
          ref={scrollRef}
          className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scroll pb-4 md:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 md:h-72 bg-gray-100 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (routes.length === 0) return null;

  return (
    <div className="bg-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Popular Flight Routes</h2>
            <p className="text-gray-500 font-medium">Explore top destinations</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route) => (
            <div key={route.id} className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer h-40 md:h-72 min-w-[75%] md:min-w-0 snap-center md:snap-align-none">
              <img src={route.img} alt={route.to} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 md:p-6 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/80 text-sm font-bold tracking-wider uppercase mb-1">{route.from} to</p>
                    <h3 className="text-white text-3xl font-black">{route.to}</h3>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg font-bold border border-white/30">
                    from {route.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
