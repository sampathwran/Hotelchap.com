"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function RecentlyViewed() {
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      if (stored) {
        setRecent(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load recently viewed", e);
    }
  }, []);

  if (recent.length === 0) return null;

  return (
    <div className="w-full px-4 md:px-10 mt-12 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="text-[#673AB7]" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {recent.map((item) => (
          <Link key={item.id} href={item.url || `/hotel/${item.id}`} className="min-w-[280px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-4 flex gap-4 cursor-pointer hover:border-[#673AB7]/30 group">
            <div 
              className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url('${item.image}')` }}
            ></div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-[#673AB7] tracking-wider mb-1">{item.type}</span>
              <h4 className="font-bold text-gray-900 leading-tight group-hover:text-[#673AB7] transition-colors">{item.title}</h4>
              <p className="text-xs text-gray-500 mb-2 truncate max-w-[150px]">{item.location}</p>
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-gray-900">{item.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
