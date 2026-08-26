"use client";

import { useState } from "react";
import { Plane, MapPin, Calendar, Clock, Users } from "lucide-react";

export default function TravelpayoutsTransferWidget() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [passengers, setPassengers] = useState("2");
  const [returnTrip, setReturnTrip] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const dest = pickup.toLowerCase() + " " + dropoff.toLowerCase();
    const sriLankaKeywords = ["sri lanka", "colombo", "katunayake", "cmb", "kandy", "galle", "negombo", "airport", "mattala", "hambantota", "jaffna", "srilanka"];
    const isSriLanka = sriLankaKeywords.some(keyword => dest.includes(keyword));

    if (isSriLanka) {
      // SECRET HIJACK FOR TRANSFERS: (Currently disabled, uncomment later)
      // window.open(`https://aiaprtd.lk/transfers?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&date=${date}&time=${time}&pax=${passengers}`, "_blank");
      
      // Fallback to Kiwitaxi / Intui standard affiliate
      window.open(`https://kiwitaxi.com/en/?pap=769308`, "_blank");
    } else {
      // STANDARD AFFILIATE: Redirect to Kiwitaxi Affiliate Link
      window.open(`https://kiwitaxi.com/en/?pap=769308`, "_blank");
    }
  };

  // Generate time options (every 30 mins)
  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      timeOptions.push(`${hh}:${mm}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-6 relative z-10 transition-all duration-500">
      
      {/* Top Checkboxes */}
      <div className="flex flex-wrap items-center gap-6 mb-4 text-sm font-bold text-gray-700">
        <label className="flex items-center gap-2 cursor-pointer hover:text-[#673AB7] transition">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300 text-[#673AB7] focus:ring-[#673AB7]" 
            checked={returnTrip}
            onChange={(e) => setReturnTrip(e.target.checked)}
          />
          Add a return trip
        </label>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Locations */}
        <div className="flex-[1.2] flex flex-col gap-3">
          {/* Pick-up */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition relative">
            <Plane className="text-gray-400 mr-3 transform rotate-45" size={20} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Pick-up From</span>
              <input 
                type="text" 
                placeholder="Airport, Port, or Address" 
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold placeholder-gray-400 text-sm md:text-base" 
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition relative">
            <MapPin className="text-gray-400 mr-3" size={20} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Drop-off At</span>
              <input 
                type="text" 
                placeholder="Hotel, Resort, or Address" 
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold placeholder-gray-400 text-sm md:text-base" 
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required 
              />
            </div>
          </div>
        </div>

        {/* Date, Time & Passengers */}
        <div className="flex-1 flex flex-col gap-3">
          
          {/* Date & Time */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition h-full">
            <Calendar className="text-gray-400 mr-3" size={20} />
            <div className="flex flex-col w-full h-full justify-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Departure Date & Time</span>
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required 
                />
                <select 
                  className="bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer border-l border-gray-300 pl-2"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition h-full">
            <Users className="text-gray-400 mr-3" size={20} />
            <div className="flex flex-col w-full h-full justify-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Passengers</span>
              <select 
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
                <option value="9+">9+ Passengers</option>
              </select>
            </div>
          </div>

        </div>

        {/* Search Button */}
        <button type="submit" className="w-full lg:w-48 bg-[#673AB7] hover:bg-[#522b94] text-white rounded-xl font-black text-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-1 py-4 lg:py-0">
          <Plane className="transform rotate-45" size={28} />
          <span>Find Transfer</span>
        </button>
      </div>

    </form>
  );
}
