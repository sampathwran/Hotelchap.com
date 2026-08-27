"use client";
import { useState, useEffect } from "react";

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState(8500); // roughly 2h 21m

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
  };

  const deals = [
    { title: "Maldives Luxury Resort", discount: "50% OFF", oldPrice: "$800", newPrice: "$400", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000" },
    { title: "Dubai 5-Star Hotel", discount: "40% OFF", oldPrice: "$500", newPrice: "$300", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000" },
    { title: "Bali Private Villa", discount: "60% OFF", oldPrice: "$300", newPrice: "$120", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000" }
  ];

  return (
    <div className="w-full px-4 md:px-10 mt-6 md:mt-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-red-50 border border-red-100 p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-red-500 text-white text-3xl p-3 rounded-xl animate-pulse">🔥</div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Flash Deals</h2>
            <p className="text-red-500 font-bold">Hurry! Prices drop for a limited time.</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-sm border border-red-100 text-red-600 font-mono font-bold text-xl">
          ⏳ Ends in: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 group cursor-pointer">
            <div className="relative h-48 w-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${deal.image}')` }}
              ></div>
              <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-3 py-1 rounded-full shadow-lg">
                {deal.discount}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{deal.title}</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-[#673AB7]">{deal.newPrice}</span>
                <span className="text-sm text-gray-400 line-through mb-1">{deal.oldPrice}</span>
                <span className="text-xs text-gray-500 mb-1 ml-1">/ night</span>
              </div>
              <button 
                onClick={() => {
                  import('@/lib/analytics').then(m => m.trackEvent('clicks'));
                  // window.open('YOUR_AFFILIATE_LINK_HERE', '_blank');
                }}
                className="w-full mt-4 bg-gray-900 text-white font-bold py-2 rounded-xl group-hover:bg-[#673AB7] transition-colors"
              >
                Claim Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
