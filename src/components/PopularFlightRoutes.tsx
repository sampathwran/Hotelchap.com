"use client";

import { useEffect, useState } from "react";
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

  if (loading) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 bg-gray-100 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (routes.length === 0) return null;

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Popular Flight Routes</h2>
            <p className="text-gray-500 font-medium">Explore top destinations</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route) => (
            <div key={route.id} className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer h-72">
              <img src={route.img} alt={route.to} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
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
