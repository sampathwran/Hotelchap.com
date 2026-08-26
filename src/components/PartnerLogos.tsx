"use client";

export default function PartnerLogos() {
  const partners = [
    { name: "Booking.com", color: "text-[#003580]" },
    { name: "Agoda", color: "text-[#f5a623]" },
    { name: "Expedia", color: "text-[#00008b]" },
    { name: "Trip.com", color: "text-[#3264ff]" },
    { name: "Hotels.com", color: "text-[#d32f2f]" }
  ];

  return (
    <div className="w-full px-4 md:px-10 mt-2 mb-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="text-center md:text-left min-w-[200px]">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">We Compare Prices From</h3>
          <p className="text-xl font-extrabold text-gray-800">100+ Travel Sites</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((p, i) => (
            <div key={i} className={`text-xl md:text-2xl font-black ${p.color} tracking-tight`}>
              {p.name}
            </div>
          ))}
          <div className="text-lg font-bold text-gray-500 bg-gray-100 px-4 py-1 rounded-full">
            + 100 More
          </div>
        </div>

      </div>
    </div>
  );
}
