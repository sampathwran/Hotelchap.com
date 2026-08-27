"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
      setLoading(false);
    };

    fetchDestinations();
  }, []);

  return (
    <div className="w-full px-4 md:px-10 py-10 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-8 md:mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Popular Destinations</h2>
            <p className="text-gray-500 font-medium">Explore top-rated spots chosen by travelers worldwide.</p>
          </div>
          <button className="hidden md:block font-bold text-[#673AB7] hover:bg-purple-50 px-4 py-2 rounded-full transition">
            See all
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#673AB7]"></div>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="font-bold text-lg mb-2">No Destinations Found</p>
            <p>Admin hasn't added any popular destinations yet.</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 pb-6 snap-x">
            {destinations.map((dest, idx) => (
              <div 
                key={dest.id || idx}
                onClick={() => {
                  import('@/lib/analytics').then(m => m.trackEvent('clicks'));
                  // window.open('YOUR_AFFILIATE_LINK_HERE', '_blank');
                }}
                className="snap-start shrink-0 w-[260px] md:w-[300px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 cursor-pointer"
              >
                {/* Image Box */}
                <div className="h-[200px] md:h-[240px] w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse -z-10"></div>
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 flex items-center shadow-sm">
                    <span className="text-yellow-500 mr-1">★</span> {dest.rating}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#673AB7] transition-colors line-clamp-1">{dest.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">{dest.desc}</p>
                  
                  {/* Meta Stats */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs font-semibold text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">💬</span> {dest.reviews}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
