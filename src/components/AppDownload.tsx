"use client";

export default function AppDownload() {
  return (
    <div className="w-full px-4 md:px-10 mt-20 mb-20">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#673AB7] to-[#4a148c] rounded-[40px] flex flex-col md:flex-row items-center justify-between p-10 md:p-16 relative overflow-hidden shadow-2xl">
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, white 0%, transparent 50%)' }}>
        </div>

        <div className="text-white z-10 max-w-lg mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Get the world in your pocket.</h2>
          <p className="text-white/80 text-lg mb-8">Download the HotelChap app to book flights, hotels, and unlock secret mobile-only deals instantly.</p>
          
          <div className="flex gap-4">
            <button className="bg-black hover:bg-gray-900 text-white flex items-center gap-3 px-6 py-3 rounded-xl transition transform hover:scale-105">
              <span className="text-3xl">🍎</span>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-gray-400">Download on the</p>
                <p className="text-lg font-bold">App Store</p>
              </div>
            </button>
            <button className="bg-black hover:bg-gray-900 text-white flex items-center gap-3 px-6 py-3 rounded-xl transition transform hover:scale-105">
              <span className="text-3xl">▶️</span>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-gray-400">GET IT ON</p>
                <p className="text-lg font-bold">Google Play</p>
              </div>
            </button>
          </div>
        </div>

        {/* Fake Phone Mockup */}
        <div className="z-10 relative">
          <div className="w-[280px] h-[550px] bg-white rounded-[40px] shadow-2xl border-8 border-gray-900 relative overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
            
            {/* Fake App UI */}
            <div className="bg-[#673AB7] h-40 w-full p-6 pt-10 text-white">
              <h4 className="font-bold text-xl">HotelChap</h4>
              <p className="text-xs opacity-80 mt-2">Find your next stay...</p>
              <div className="bg-white/20 h-10 w-full rounded-lg mt-4"></div>
            </div>
            <div className="flex-1 bg-gray-50 p-4">
              <div className="w-full h-32 bg-gray-200 rounded-xl mb-4"></div>
              <div className="w-full h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
