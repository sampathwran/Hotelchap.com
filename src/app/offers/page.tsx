"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import { db } from "@/firebase";
import { collection, query, where, getDocs, Timestamp, orderBy } from "firebase/firestore";
import { Tag, Clock, ChevronRight, Gift, Mail, ShieldCheck, Headphones, CreditCard } from "lucide-react";

export type SpecialOffer = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  discountBadge: string;
  linkUrl: string;
  endTime: Date;
};

export default function OffersPage() {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // Fetch active special offers
        const q = query(
          collection(db, "special_offers"), 
          where("endTime", ">", Timestamp.now()),
          orderBy("endTime", "asc")
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedOffers: SpecialOffer[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedOffers.push({
            id: doc.id,
            title: data.title || "",
            description: data.description || "Grab this limited-time exclusive offer before it expires! Click the link below to learn more and secure your deal today.",
            imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
            discountBadge: data.discountBadge || "",
            linkUrl: data.targetUrl || "#",
            endTime: data.endTime.toDate(),
          });
        });

        setOffers(fetchedOffers);
      } catch (error) {
        console.error("Error fetching special offers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const formatTimeLeft = (endTime: Date) => {
    const diff = endTime.getTime() - new Date().getTime();
    if (diff <= 0) return "Expired";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-12 md:py-20">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 text-pink-600 mb-6 shadow-sm">
            <Gift size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Exclusive Special Offers
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Discover our latest promotions, heavily discounted travel packages, and limited-time deals curated just for you.
          </p>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#673AB7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : offers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 flex flex-col items-center text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <Tag size={48} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-3">No active offers right now</h2>
            <p className="text-gray-500">Check back later or subscribe to our newsletter to be the first to know when new deals drop!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {offer.discountBadge && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-black tracking-wider uppercase shadow-md">
                      {offer.discountBadge}
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 flex items-center gap-2 shadow-sm">
                    <Clock size={16} className="text-orange-500" />
                    {formatTimeLeft(offer.endTime)}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{offer.title}</h3>
                  <p className="text-gray-500 font-medium mb-6 line-clamp-3 leading-relaxed">
                    {offer.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <a 
                      href={offer.linkUrl} 
                      target={offer.linkUrl.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="w-full bg-[#673AB7] hover:bg-purple-700 text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg"
                    >
                      Claim Offer <ChevronRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Value Propositions Section */}
        <div className="mt-24 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Price Guarantee</h3>
              <p className="text-gray-500 font-medium">Find a lower price? We'll match it and give you an extra 10% discount on your next booking.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CreditCard size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Payments</h3>
              <p className="text-gray-500 font-medium">Book now and pay later. Enjoy flexible cancellation policies on thousands of hotels and flights.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <Headphones size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Premium Support</h3>
              <p className="text-gray-500 font-medium">Our travel experts are always on standby to help you whenever and wherever you need assistance.</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-[#1a1c29] to-[#0B1120] rounded-[40px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 mt-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#673AB7] rounded-full blur-[100px] opacity-30"></div>
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Never Miss a Secret Deal!</h2>
            <p className="text-gray-400 font-medium text-lg">
              Sign up for our newsletter to get VIP access to flash sales, exclusive promo codes, and 50% off secret hotel rates.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto flex-1 max-w-md">
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#673AB7] backdrop-blur-md"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-[#673AB7] hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center md:text-left">No spam. You can unsubscribe at any time.</p>
          </div>
        </div>

      </main>

      <MegaFooter />
    </div>
  );
}
