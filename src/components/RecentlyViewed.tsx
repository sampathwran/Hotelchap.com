"use client";
import { useEffect, useState } from "react";

export default function RecentlyViewed() {
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would read from localStorage or Firebase
    // For now, we simulate a recently viewed item
    setRecent([
      { 
        id: 1,
        type: "hotel",
        title: "Marina Bay Sands", 
        location: "Singapore", 
        price: "$450", 
        image: "https://images.unsplash.com/photo-1525625299951-4521dd9d64ba?q=80&w=1000",
        viewedAt: "2 hours ago"
      },
      { 
        id: 2,
        type: "flight",
        title: "Colombo to Dubai", 
        location: "Emirates Airlines", 
        price: "$320", 
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
        viewedAt: "5 hours ago"
      }
    ]);
  }, []);

  if (recent.length === 0) return null;

  return (
    <div className="w-full px-4 md:px-10 mt-12 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🕒</span>
        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {recent.map((item) => (
          <div key={item.id} className="min-w-[280px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-4 flex gap-4 cursor-pointer">
            <div 
              className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url('${item.image}')` }}
            ></div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-[#673AB7] tracking-wider mb-1">{item.type}</span>
              <h4 className="font-bold text-gray-900 leading-tight">{item.title}</h4>
              <p className="text-xs text-gray-500 mb-2">{item.location}</p>
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-gray-900">{item.price}</span>
                <span className="text-xs text-gray-400">{item.viewedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
