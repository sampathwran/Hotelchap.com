"use client";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";

export default function FlashDeals() {
  const [deals, setDeals] = useState<any[]>([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update 'now' every second for the countdown timers
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

  if (deals.length === 0) return null; // Don't show the section if no active deals

  return (
    <div className="w-full px-4 md:px-10 mt-6 md:mt-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-red-50 border border-red-100 p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-red-500 text-white text-3xl p-3 rounded-xl animate-pulse">🔥</div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Flash Deals</h2>
            <p className="text-red-500 font-bold">Hurry! Limited time offers selected for you.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 group cursor-pointer">
            <div className="relative h-48 w-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${deal.imageUrl}')` }}
              ></div>
              <div className="absolute top-4 left-4 bg-gray-900 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm flex items-center gap-2">
                ⏳ {formatTimeLeft(deal.endTime)}
              </div>
              {deal.discountBadge && (
                <div className="absolute top-4 right-4 bg-red-600 text-white font-black px-3 py-1 rounded-full shadow-lg text-sm transform rotate-3">
                  {deal.discountBadge}
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{deal.title || 'Special Deal'}</h3>
              <p className="text-sm text-gray-500 mb-4">Click below to view this exclusive offer before time runs out!</p>
              
              <button 
                onClick={() => {
                  import('@/lib/analytics').then(m => m.trackEvent('clicks'));
                  if (deal.targetUrl) {
                    window.open(deal.targetUrl, '_blank');
                  }
                }}
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl group-hover:bg-red-600 transition-colors shadow-md"
              >
                Claim Deal Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
