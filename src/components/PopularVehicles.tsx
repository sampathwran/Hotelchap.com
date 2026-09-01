"use client";
import { useTranslation } from "@/lib/i18n";

import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PopularVehicles() {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const q = query(
          collection(db, "popular_vehicles"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const fetchedVehicles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (vehicles.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [vehicles.length]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-8 md:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{t("Popular Vehicle Types")}</h2>
              <p className="text-gray-500 font-medium text-xs md:text-base">{t("Choose the perfect wheels for your adventure")}</p>
            </div>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-[#673AB7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (vehicles.length === 0) return null;

  return (
    <div className="bg-gray-50 py-8 md:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{t("Popular Vehicle Types")}</h2>
            <p className="text-gray-500 font-medium">{t("Choose the perfect wheels for your adventure")}</p>
          </div>
          
          <div className="hidden md:flex gap-2">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#673AB7] hover:text-white hover:border-[#673AB7] transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#673AB7] hover:text-white hover:border-[#673AB7] transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 -mb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle.id} 
              className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col min-w-[220px] md:min-w-[280px] w-[220px] md:w-[300px] flex-shrink-0 snap-center cursor-pointer"
            >
              <div className="h-36 md:h-48 overflow-hidden bg-gray-100">
                <img src={vehicle.img} alt={vehicle.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{vehicle.name}</h3>
                <p className="text-gray-500 font-medium text-[10px] md:text-sm mb-2 md:mb-4">{vehicle.desc}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm font-bold text-gray-400">Starting from</span>
                  <span className="text-lg font-black text-[#673AB7]">{vehicle.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </div>
  );
}
