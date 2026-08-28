const fs = require('fs');

const newContent = "use client";

export default function PartnerLogos() {
  const partners = [
    { name: "Booking.com", url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg" },
    { name: "Agoda", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Agoda_logo.svg" },
    { name: "Expedia", url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Expedia_Logo.svg" },
    { name: "Trip.com", url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Trip.com_logo.svg" },
    { name: "Hotels.com", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Hotels.com_logo.svg" }
  ];

  return (
    <div className="w-full px-4 md:px-10 mt-2 mb-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="text-center md:text-left min-w-[200px]">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">We Compare Prices From</h3>
          <p className="text-xl font-extrabold text-gray-800">100+ Travel Sites</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 transition-all duration-500">
          {partners.map((p, i) => (
            <img key={i} src={p.url} alt={p.name} className="h-6 md:h-8 object-contain drop-shadow-sm" />
          ))}
          <div className="text-lg font-bold text-gray-500 bg-gray-100 px-4 py-1 rounded-full">
            + 100 More
          </div>
        </div>

      </div>
    </div>
  );
}
;

fs.writeFileSync('src/components/PartnerLogos.tsx', newContent);
console.log("Updated PartnerLogos.tsx");
