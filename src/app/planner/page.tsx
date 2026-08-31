"use client";
import { useTranslation } from "@/lib/i18n";


import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function AIPlanner() {
  const { t } = useTranslation();
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("5");
  const [style, setStyle] = useState("Balanced");
  const [notes, setNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [itinerary, setItinerary] = useState<any[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    
    setIsGenerating(true);
    setShowResults(false);
    
    try {
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, style, notes }),
      });
      
      const data = await res.json();
      
      if (data.itinerary) {
        setItinerary(data.itinerary);
        setShowResults(true);
      } else {
        alert("Failed to generate plan. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error generating plan.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      
      {/* Global Top Navbar */}
      <header className="h-20 w-full flex items-center justify-between px-4 md:px-8 bg-white shadow-sm z-[60] sticky top-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="HotelChap Logo" className="h-20 md:h-28 w-auto object-contain" />
          </Link>
          <div className="hidden sm:block font-bold text-xl text-[#673AB7] border-l-2 border-gray-200 pl-6">
            AI Trip Planner ✨
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold text-gray-600 hover:text-[#673AB7] transition">{t("Back to Home")}</Link>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 relative">
        <Sidebar />

        <main className="flex-1 flex flex-col w-full md:w-[calc(100%-80px)] min-h-screen items-center py-10 px-4">
          
          {!showResults ? (
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 md:p-12 mt-10 border border-gray-100">
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Design your dream trip with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#673AB7] to-pink-500">AI</span>
                </h1>
                <p className="text-gray-500 text-lg">{t("Tell us where you want to go, and our AI will instantly generate a full day-by-day itinerary with hotels and flights.")}</p>
              </div>

              <form onSubmit={handleGenerate} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Where do you want to go?</label>
                  <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Sri Lanka, Paris, Bali..." 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/50 focus:border-[#673AB7] transition-all text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">How many days?</label>
                    <select 
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/50"
                    >
                      {[3,4,5,6,7,10,14].map(num => <option key={num} value={num}>{num} Days</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Travel Style</label>
                    <select 
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/50"
                    >
                      <option>Balanced</option>
                      <option>Luxury & Relaxing</option>
                      <option>Budget Backpacking</option>
                      <option>Adventure & Nature</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Any special requests or ideas? (Optional)</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. I want to visit historical places, I am traveling with kids, I need vegan food..." 
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/50 focus:border-[#673AB7] transition-all text-base"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isGenerating}
                  className={`mt-6 w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex justify-center items-center gap-3 ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#673AB7] to-purple-600 hover:scale-[1.02] hover:shadow-xl'}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Google AI is thinking...
                    </>
                  ) : (
                    <>✨ Generate AI Itinerary</>
                  )}
                </button>
              </form>
            </div>
          ) : (
            
            /* AI RESULTS VIEW */
            <div className="w-full max-w-5xl mt-6 animate-fade-in-up">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-900 capitalize">{destination} Tour Plan</h1>
                  <p className="text-gray-500 mt-2 text-lg">{days} Days • {style} Style</p>
                </div>
                <button onClick={() => setShowResults(false)} className="text-[#673AB7] font-semibold hover:bg-purple-50 px-4 py-2 rounded-lg transition">
                  ← Edit Search
                </button>
              </div>

              {/* Dynamic Itinerary Mapping */}
              {itinerary.map((dayPlan: any, index: number) => {
                const colors = ['blue', 'green', 'purple', 'orange', 'pink'];
                const themeColor = colors[index % colors.length];
                
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-${themeColor}-500`}></div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Day {dayPlan.day}: {dayPlan.title}</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {dayPlan.description}
                    </p>
                    
                    {/* Affiliate Booking Recommendations */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">🤖 AI Recommended Bookings for Day {dayPlan.day}</h3>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl">🏨</div>
                            <div>
                              <p className="font-bold text-sm text-gray-900">{dayPlan.hotelName || "Best Local Hotel"}</p>
                              <p className="text-xs text-gray-500">Highly Rated • AI Pick</p>
                            </div>
                          </div>
                          <Link href="/search" target="_blank" rel="noopener noreferrer" className="bg-[#673AB7] text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-purple-700 transition inline-block text-center">View Prices</Link>
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 bg-${themeColor}-100 text-${themeColor}-600 rounded-full flex items-center justify-center text-xl`}>🗺️</div>
                            <div>
                              <p className="font-bold text-sm text-gray-900">{dayPlan.activityName || "Guided Tour"}</p>
                              <p className="text-xs text-gray-500">Popular Activity</p>
                            </div>
                          </div>
                          <Link href="/attractions" target="_blank" rel="noopener noreferrer" className={`bg-${themeColor}-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-${themeColor}-700 transition inline-block text-center`}>Book Ticket</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Targeted Affiliate Banner for Sri Lanka */}
              {(destination.toLowerCase().includes("sri lanka") || destination.toLowerCase().includes("colombo") || destination.toLowerCase().includes("kandy") || destination.toLowerCase().includes("galle")) && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-8 rounded-2xl shadow-sm border border-orange-200 flex flex-col md:flex-row items-center justify-between mt-8 mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl md:text-2xl font-black text-orange-900 mb-2">Need a local travel agent in Sri Lanka?</h3>
                    <p className="text-orange-800 text-sm md:text-base">We highly recommend booking your tour through <strong className="text-orange-950">Summer Lanka Tours</strong>, our premier partner for Sri Lankan adventures.</p>
                  </div>
                  <a href="http://www.summerlankatours.com/" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 text-center">
                    Visit Summer Lanka Tours
                  </a>
                </div>
              )}

              {/* Book Entire Trip Button */}
              <div className="sticky bottom-6 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 flex flex-col md:flex-row items-center justify-between mt-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Ready for this adventure?</h3>
                  <p className="text-gray-500 text-sm mt-1">Our AI has found the best rates for these exact hotels and flights via Travelpayouts.</p>
                </div>
                <button className="mt-4 md:mt-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                  <span>💼</span> Book Entire Trip Bundle
                </button>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
