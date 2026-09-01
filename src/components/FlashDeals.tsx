"use client";
import { useState, useEffect, useRef } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";

export default function FlashDeals() {
  const [deals, setDeals] = useState<any[]>([]);
  const [now, setNow] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const q = query(collection(db, "flash_deals"), where("endTime", ">", Timestamp.now()));
        const snapshot = await getDocs(q);
        const fetchedDeals = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDeals(fetchedDeals);
      } catch (error) {
        console.error("Error fetching flash deals:", error);
      }
    }
    fetchDeals();
  }, []);

  const formatTimeLeft = (endTime: any) => {
    if (!endTime) return "00h : 00m : 00s";
    const end = endTime.toDate();
    const diff = Math.floor((end.getTime() - now.getTime()) / 1000);
    if (diff <= 0) return "Expired";
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
  };

  const activeDeals = deals.filter((deal) => {
    if (!deal.startTime) return true;
    return deal.startTime.toDate() <= now;
  });

  
  // Auto slide for PC
  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
          }
        }
      }
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };

  if (activeDeals.length === 0) return null;

  return (
    <div className="w-full px-4 md:px-10 mt-6 md:mt-8 pb-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-red-50 border border-red-100 p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-red-500 text-white text-base md:text-xl font-bold p-2 md:p-3 rounded-lg md:rounded-xl animate-pulse">HOT</div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900">Flash Deals</h2>
            <p className="text-xs md:text-base text-red-500 font-bold">Hurry! Limited time offers selected for you.</p>
          </div>
        </div>
        
        {/* Navigation Arrows for Desktop */}
        {activeDeals.length > 3 && (
          <div className="hidden md:flex gap-3 mt-4 md:mt-0">
            <button 
              onClick={scrollLeft} 
              className="w-10 h-10 rounded-full bg-white border border-red-200 text-red-500 flex items-center justify-center shadow hover:bg-red-50 transition font-bold"
              aria-label="Previous Deals"
            >
              &lt;
            </button>
            <button 
              onClick={scrollRight} 
              className="w-10 h-10 rounded-full bg-white border border-red-200 text-red-500 flex items-center justify-center shadow hover:bg-red-50 transition font-bold"
              aria-label="Next Deals"
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      
      {/* Slider Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory hide-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {activeDeals.map((deal) => (
          <div 
            key={deal.id} 
            className="min-w-[60%] sm:min-w-[calc(50%-12px)] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(25%-18px)] flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 group cursor-pointer"
            onClick={() => window.open(deal.targetUrl || '#', '_blank')}
          >
            <div className="relative h-36 md:h-64 w-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${deal.imageUrl}')` }}
              ></div>
              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-gray-900 text-white font-bold px-2 py-1 md:px-3 rounded-full shadow-lg text-[10px] md:text-sm flex items-center gap-1 md:gap-2">
                Time Left: {formatTimeLeft(deal.endTime)}
              </div>
              {deal.discountBadge && (
                <div className="absolute bottom-4 right-4 bg-red-600 text-white font-black px-3 py-1 rounded-full shadow-lg text-sm transform rotate-3">
                  {deal.discountBadge}
                </div>
              )}
            </div>
            <div className="p-3 md:p-5">
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2 truncate">{deal.title || 'Special Deal'}</h3>
              <button className="w-full mt-2 bg-red-50 text-red-600 font-bold py-1.5 md:py-2 rounded-lg md:rounded-xl text-sm md:text-base group-hover:bg-red-500 group-hover:text-white transition-colors">
                Grab Deal &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
