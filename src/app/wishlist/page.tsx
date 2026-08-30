"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import Link from "next/link";
import { Heart, Trash2, MapPin, Star, Calendar, ExternalLink } from "lucide-react";

export type WishlistItem = {
  id: string;
  type: "hotel" | "flight" | "attraction" | "package";
  title: string;
  location: string;
  image: string;
  price: string;
  rating?: number;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load wishlist from local storage
    const loadWishlist = () => {
      const stored = localStorage.getItem("hotelchap_wishlist");
      if (stored) {
        try {
          setWishlist(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse wishlist");
        }
      } else {
        // Mock data so the client can see the beautiful design
        const mockData: WishlistItem[] = [
          {
            id: "1",
            type: "hotel",
            title: "Cinnamon Grand Colombo",
            location: "Colombo, Sri Lanka",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
            price: "$120 / night",
            rating: 4.8
          },
          {
            id: "2",
            type: "attraction",
            title: "Sigiriya Rock Fortress Tour",
            location: "Dambulla, Sri Lanka",
            image: "https://images.unsplash.com/photo-1588615419958-af6081ab2881?q=80&w=800&auto=format&fit=crop",
            price: "$35 / person",
            rating: 4.9
          }
        ];
        setWishlist(mockData);
        localStorage.setItem("hotelchap_wishlist", JSON.stringify(mockData));
      }
      setIsLoading(false);
    };

    loadWishlist();
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("hotelchap_wishlist", JSON.stringify(updated));
  };

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'hotel': return 'bg-blue-100 text-blue-800';
      case 'flight': return 'bg-sky-100 text-sky-800';
      case 'attraction': return 'bg-emerald-100 text-emerald-800';
      case 'package': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 flex items-center gap-4 mb-3">
              <Heart className="text-[#673AB7] fill-[#673AB7]" size={40} />
              Your Wishlist
            </h1>
            <p className="text-lg text-gray-500 font-medium">Keep track of your favorite stays, flights, and activities.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm font-bold text-gray-700">
            {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
          </div>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#673AB7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 flex flex-col items-center text-center shadow-sm border border-gray-100 mt-10">
            <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <Heart size={48} className="opacity-50" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-md mb-8">You haven't saved any items yet. Start exploring our amazing hotels and tours to build your dream trip!</p>
            <Link href="/" className="bg-[#673AB7] hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg">
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm z-10"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md ${getBadgeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center text-gray-500 mb-4 text-sm font-medium">
                    <MapPin size={16} className="mr-1 text-gray-400" />
                    {item.location}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Starting from</p>
                      <p className="text-lg font-black text-[#673AB7]">{item.price}</p>
                    </div>
                    {item.rating && (
                      <div className="flex items-center bg-orange-50 px-2.5 py-1 rounded-lg">
                        <Star size={14} className="text-orange-500 fill-orange-500 mr-1" />
                        <span className="font-bold text-orange-700 text-sm">{item.rating}</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/${item.type === 'attraction' ? 'attractions' : item.type === 'flight' ? 'flights' : 'search'}`} className="mt-5 w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                    View Details
                    <ExternalLink size={16} className="text-gray-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <MegaFooter />
    </div>
  );
}
