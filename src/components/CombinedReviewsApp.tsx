"use client";
import { useTranslation } from "@/lib/i18n";
import { Star } from "lucide-react";

export default function CombinedReviewsApp() {
  const { t } = useTranslation();
  const reviews = [
    {
      name: "John D.",
      type: t("Verified Traveler"),
      avatar: "https://i.pravatar.cc/150?u=1",
      review: t("Saved over $200 on my flight to London! The price comparison is incredibly fast and found a deal I couldn't see anywhere else."),
      rating: 5,
      date: "2 days ago"
    },
    {
      name: "Sarah M.",
      type: t("Verified Traveler"),
      avatar: "https://i.pravatar.cc/150?u=2",
      review: t("Booked my honeymoon in the Maldives through HotelChap. The AI Trip Planner gave us the perfect itinerary, and the hotel was exactly as described."),
      rating: 5,
      date: "1 week ago"
    }
  ];

  return (
    <div className="w-full px-4 md:px-10 py-10 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Side: Reviews */}
        <div className="flex-1">
          <h2 className="text-3xl font-black text-gray-900 mb-2">{t("What our travelers say")}</h2>
          <p className="text-gray-500 mb-8">{t("Real experiences from people who booked their dream trips using HotelChap.")}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-yellow-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />)}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic text-sm">"{rev.review}"</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{rev.name}</h4>
                    <p className="text-[10px] text-gray-500">{rev.type} � {rev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: App Download */}
        <div className="lg:w-[450px] bg-gradient-to-br from-[#673AB7] to-[#4a148c] rounded-3xl p-8 relative overflow-hidden shadow-xl flex flex-col justify-center">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, white 0%, transparent 50%)' }}>
          </div>

          <div className="z-10 text-white relative">
            <h2 className="text-3xl font-black mb-4 leading-tight">{t("Get the world in your pocket.")}</h2>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              {t("Download the HotelChap app to book flights, hotels, and unlock secret mobile-only deals instantly.")}
            </p>
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <button className="bg-black hover:bg-gray-900 text-white flex items-center gap-3 px-5 py-3 rounded-xl transition transform hover:scale-105 border border-gray-800">
                <span className="text-2xl">??</span>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 leading-none mb-1">Download on the</p>
                  <p className="text-sm font-bold leading-none">App Store</p>
                </div>
              </button>
              <button className="bg-black hover:bg-gray-900 text-white flex items-center gap-3 px-5 py-3 rounded-xl transition transform hover:scale-105 border border-gray-800">
                <span className="text-2xl">??</span>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 leading-none mb-1">GET IT ON</p>
                  <p className="text-sm font-bold leading-none">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          
          {/* Decorative floating phone element (Optional/Subtle) */}
          <div className="absolute -bottom-16 -right-12 w-48 h-64 bg-white/10 rounded-[30px] border-4 border-white/20 transform rotate-12 z-0 hidden md:block"></div>
        </div>

      </div>
    </div>
  );
}
