"use client";

import { useState } from "react";
import { Ship, MapPin, Calendar, Anchor } from "lucide-react";

export default function CruiseSearchWidget() {
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [month, setMonth] = useState("");
  const [cruiseLine, setCruiseLine] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Alert for now, can be replaced with actual affiliate redirect later
    alert("Searching for cruises to " + (destination || "Anywhere") + " in " + (month || "Any Month"));
  };

  return (
    <form onSubmit={handleSearch} className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-6 relative z-10 transition-all duration-500">
      
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Destination & Departure */}
        <div className="flex-[1.2] flex flex-col sm:flex-row gap-3">
          {/* Destination */}
          <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition relative">
            <MapPin className="text-gray-400 mr-3" size={20} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Destination</span>
              <select 
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm md:text-base cursor-pointer appearance-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Any Destination</option>
                <option value="Caribbean">Caribbean</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Alaska">Alaska</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Europe">Northern Europe</option>
                <option value="Asia">Asia</option>
              </select>
            </div>
          </div>

          {/* Departure Port */}
          <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition relative">
            <Anchor className="text-gray-400 mr-3" size={20} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Departure Port</span>
              <input 
                type="text" 
                placeholder="Any Port" 
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold placeholder-gray-400 text-sm md:text-base" 
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Date & Cruise Line */}
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          {/* Date */}
          <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition">
            <Calendar className="text-gray-400 mr-3" size={20} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">When</span>
              <input 
                type="month" 
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer" 
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
          </div>

          {/* Cruise Line */}
          <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition">
            <Ship className="text-gray-400 mr-3" size={20} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Cruise Line</span>
              <select 
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer appearance-none"
                value={cruiseLine}
                onChange={(e) => setCruiseLine(e.target.value)}
              >
                <option value="">Any Line</option>
                <option value="Royal Caribbean">Royal Caribbean</option>
                <option value="Carnival">Carnival</option>
                <option value="Norwegian">Norwegian (NCL)</option>
                <option value="MSC">MSC Cruises</option>
                <option value="Celebrity">Celebrity</option>
                <option value="Princess">Princess</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button type="submit" className="w-full lg:w-48 bg-[#673AB7] hover:bg-[#522b94] text-white rounded-xl font-black text-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-1 py-4 lg:py-0">
          <Ship size={28} />
          <span>Search</span>
        </button>
      </div>

    </form>
  );
}
