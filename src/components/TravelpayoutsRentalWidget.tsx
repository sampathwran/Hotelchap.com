"use client";

import { useState } from "react";
import { Car, MapPin, Calendar, Clock, User } from "lucide-react";

export default function TravelpayoutsRentalWidget() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [driverAge, setDriverAge] = useState("30-65");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const dest = pickup.toLowerCase();
    const sriLankaKeywords = ["sri lanka", "colombo", "katunayake", "cmb", "kandy", "galle", "negombo", "airport", "mattala", "hambantota", "jaffna", "srilanka"];
    const isSriLanka = sriLankaKeywords.some(keyword => dest.includes(keyword));

    const finalDropoff = differentDropoff ? dropoff : pickup;

    if (isSriLanka) {
      window.open("https://www.summerrides.lk/", "_blank");
    } else {
      // STANDARD AFFILIATE: Redirect to DiscoverCars
      window.open(`https://discovercars.com/?pick_up_location=${encodeURIComponent(pickup)}&drop_off_location=${encodeURIComponent(finalDropoff)}&pick_up_date=${pickupDate}&drop_off_date=${dropoffDate}&a_aid=769308`, "_blank");
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
            checked={differentDropoff}
            onChange={(e) => setDifferentDropoff(e.target.checked)}
          />
          Return car to a different location
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:text-[#673AB7] transition">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300 text-[#673AB7] focus:ring-[#673AB7]" 
            checked={driverAge === "30-65"}
            onChange={(e) => setDriverAge(e.target.checked ? "30-65" : "other")}
          />
          Driver aged 30 - 65?
        </label>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Locations */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition">
            <MapPin className="text-gray-400 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Pick-up location (City, Airport or Address)" 
              className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold placeholder-gray-400" 
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required 
            />
          </div>

          {differentDropoff && (
            <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition">
              <MapPin className="text-gray-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Drop-off location (City, Airport or Address)" 
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold placeholder-gray-400" 
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required={differentDropoff} 
              />
            </div>
          )}
        </div>

        {/* Dates & Times */}
        <div className="flex-[1.5] flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Pick-up Date & Time */}
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition">
              <Calendar className="text-gray-400 mr-3" size={20} />
              <div className="flex flex-col w-full">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pick-up</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="date" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer" 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required 
                  />
                  <select 
                    className="bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer border-l border-gray-300 pl-2"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  >
                    {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Drop-off Date & Time */}
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#673AB7] focus-within:ring-2 focus-within:ring-[#673AB7]/20 transition">
              <Calendar className="text-gray-400 mr-3" size={20} />
              <div className="flex flex-col w-full">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Drop-off</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="date" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer" 
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    required 
                  />
                  <select 
                    className="bg-transparent border-none focus:outline-none text-gray-800 font-bold text-sm cursor-pointer border-l border-gray-300 pl-2"
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                  >
                    {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button type="submit" className="w-full lg:w-48 bg-[#673AB7] hover:bg-[#522b94] text-white rounded-xl font-black text-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-1 py-4 lg:py-0">
          <Car size={28} />
          <span>Search</span>
        </button>
      </div>

    </form>
  );
}
