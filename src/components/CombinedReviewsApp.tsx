"use client";
import { useTranslation } from "@/lib/i18n";

export default function CombinedReviewsApp() {
  const { t } = useTranslation();
  

  return (
    <div className="w-full px-4 md:px-10 py-8 md:py-16 bg-white border-t border-gray-100">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Right Side: App Download */}
        <div className="w-full bg-gradient-to-br from-[#673AB7] to-[#4a148c] rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl flex flex-col justify-center mt-2 md:mt-0">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, white 0%, transparent 50%)' }}>
          </div>

          <div className="z-10 text-white relative">
            <h2 className="text-xl md:text-3xl font-black mb-2 md:mb-4 leading-tight">{t("Get the world in your pocket.")}</h2>
            <p className="text-white/80 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
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
