"use client";

export default function PartnerLogos() {
  const partners = [
    { name: "Booking.com", file: "booking.png", color: "text-[#003580]" },
    { name: "Agoda", file: "agoda.png", color: "text-[#f5a623]" },
    { name: "Expedia", file: "expedia.jpg", color: "text-[#00008b]" },
    { name: "Trip.com", file: "trip.png", color: "text-[#3264ff]" },
    { name: "Hotels.com", file: "hotels.png", color: "text-[#d32f2f]" }
  ];

  return (
    <div className="w-full px-4 md:px-10 mt-2 mb-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="text-center md:text-left min-w-[200px]">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">We Compare Prices From</h3>
          <p className="text-xl font-extrabold text-gray-800">100+ Travel Sites</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 transition-all duration-500">
          {partners.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <img src={`/logos/${p.file}`} alt={p.name} className="w-6 h-6 md:w-8 md:h-8 rounded-full shadow-sm bg-white" />
              <span className={`text-lg md:text-xl font-black ${p.color} tracking-tight`}>
                {p.name}
              </span>
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
