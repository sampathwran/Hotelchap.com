"use client";

import { useEffect, useState } from "react";

// Database of destinations based on User's Country
const destinationDatabase: any = {
  // If user is from Sri Lanka
  "LK": [
    { name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000", rating: "4.9", reviews: "12k", hotels: "1,204", flights: "Direct", desc: "Luxury resorts & crystal clear waters" },
    { name: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000", rating: "4.8", reviews: "25k", hotels: "3,450", flights: "Direct", desc: "Modern architecture & luxury shopping" },
    { name: "Singapore", image: "https://images.unsplash.com/photo-1525625299951-4521dd9d64ba?q=80&w=1000", rating: "4.9", reviews: "18k", hotels: "980", flights: "Direct", desc: "Clean city, amazing food & gardens" },
    { name: "Bangkok, Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c5855d0?q=80&w=1000", rating: "4.7", reviews: "30k", hotels: "4,200", flights: "Direct", desc: "Street food, temples & vibrant nightlife" },
    { name: "Kuala Lumpur", image: "https://images.unsplash.com/photo-1582639590011-f5a8416d1101?q=80&w=1000", rating: "4.6", reviews: "15k", hotels: "2,100", flights: "Direct", desc: "Petronas towers & diverse culture" },
    { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000", rating: "4.8", reviews: "40k", hotels: "5,600", flights: "1 Stop", desc: "Beautiful beaches & spiritual temples" },
    { name: "Seychelles", image: "https://images.unsplash.com/photo-1570188981440-1d90069ce008?q=80&w=1000", rating: "4.9", reviews: "8k", hotels: "350", flights: "1 Stop", desc: "Pristine nature & exclusive resorts" },
    { name: "Phuket, Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000", rating: "4.7", reviews: "22k", hotels: "3,100", flights: "1 Stop", desc: "Island hopping & amazing beaches" },
    { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000", rating: "4.9", reviews: "50k", hotels: "4,800", flights: "1 Stop", desc: "Future tech, anime & sushi" },
    { name: "Paris, France", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000", rating: "4.8", reviews: "80k", hotels: "6,200", flights: "1 Stop", desc: "Eiffel tower & romantic streets" },
    { name: "London, UK", image: "https://images.unsplash.com/photo-1513635269975-5969336cd100?q=80&w=1000", rating: "4.7", reviews: "65k", hotels: "5,900", flights: "1 Stop", desc: "Historic landmarks & museums" },
    { name: "Sydney, Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000", rating: "4.8", reviews: "28k", hotels: "2,300", flights: "1 Stop", desc: "Opera house & Bondi beach" },
    { name: "New York, USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000", rating: "4.8", reviews: "90k", hotels: "7,100", flights: "1 Stop", desc: "Times Square & Central Park" },
    { name: "Rome, Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000", rating: "4.9", reviews: "55k", hotels: "4,500", flights: "1 Stop", desc: "Ancient ruins & amazing pasta" },
    { name: "Seoul, South Korea", image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1000", rating: "4.8", reviews: "32k", hotels: "3,800", flights: "1 Stop", desc: "K-Pop, palaces & street food" },
  ],
  // Default fallback for any other country
  "DEFAULT": [
    { name: "Sri Lanka", image: "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?q=80&w=1000", rating: "4.8", reviews: "15k", hotels: "2,500", flights: "Direct", desc: "Beaches, tea gardens & wildlife" },
    { name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000", rating: "4.9", reviews: "12k", hotels: "1,204", flights: "Direct", desc: "Luxury resorts & crystal clear waters" },
    { name: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000", rating: "4.8", reviews: "25k", hotels: "3,450", flights: "Direct", desc: "Modern architecture & luxury shopping" },
    { name: "Singapore", image: "https://images.unsplash.com/photo-1525625299951-4521dd9d64ba?q=80&w=1000", rating: "4.9", reviews: "18k", hotels: "980", flights: "Direct", desc: "Clean city, amazing food & gardens" },
    { name: "Bangkok, Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c5855d0?q=80&w=1000", rating: "4.7", reviews: "30k", hotels: "4,200", flights: "Direct", desc: "Street food, temples & vibrant nightlife" },
    { name: "Kuala Lumpur", image: "https://images.unsplash.com/photo-1582639590011-f5a8416d1101?q=80&w=1000", rating: "4.6", reviews: "15k", hotels: "2,100", flights: "Direct", desc: "Petronas towers & diverse culture" },
    { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000", rating: "4.8", reviews: "40k", hotels: "5,600", flights: "1 Stop", desc: "Beautiful beaches & spiritual temples" },
    { name: "Seychelles", image: "https://images.unsplash.com/photo-1570188981440-1d90069ce008?q=80&w=1000", rating: "4.9", reviews: "8k", hotels: "350", flights: "1 Stop", desc: "Pristine nature & exclusive resorts" },
    { name: "Phuket, Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000", rating: "4.7", reviews: "22k", hotels: "3,100", flights: "1 Stop", desc: "Island hopping & amazing beaches" },
    { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000", rating: "4.9", reviews: "50k", hotels: "4,800", flights: "1 Stop", desc: "Future tech, anime & sushi" },
    { name: "Paris, France", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000", rating: "4.8", reviews: "80k", hotels: "6,200", flights: "1 Stop", desc: "Eiffel tower & romantic streets" },
    { name: "London, UK", image: "https://images.unsplash.com/photo-1513635269975-5969336cd100?q=80&w=1000", rating: "4.7", reviews: "65k", hotels: "5,900", flights: "1 Stop", desc: "Historic landmarks & museums" },
    { name: "Sydney, Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000", rating: "4.8", reviews: "28k", hotels: "2,300", flights: "1 Stop", desc: "Opera house & Bondi beach" },
    { name: "New York, USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000", rating: "4.8", reviews: "90k", hotels: "7,100", flights: "1 Stop", desc: "Times Square & Central Park" },
    { name: "Rome, Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000", rating: "4.9", reviews: "55k", hotels: "4,500", flights: "1 Stop", desc: "Ancient ruins & amazing pasta" },
  ]
};

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [userCountry, setUserCountry] = useState<string>("Loading...");

  useEffect(() => {
    // Detect User's Country based on IP Address
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const countryCode = data.country_code; // e.g., "LK" or "US"
        setUserCountry(data.country_name || "Unknown");
        
        // Load destinations based on country, fallback to DEFAULT
        if (destinationDatabase[countryCode]) {
          setDestinations(destinationDatabase[countryCode]);
        } else {
          setDestinations(destinationDatabase["DEFAULT"]);
        }
      })
      .catch((err) => {
        // Fallback if API fails
        setUserCountry("Global");
        setDestinations(destinationDatabase["DEFAULT"]);
      });
  }, []);

  return (
    <div className="w-full px-4 md:px-10 mt-8 md:mt-10 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
          <p className="text-gray-500 font-medium">
            Based on your location: <span className="text-[#673AB7] font-bold">{userCountry} 📍</span>
          </p>
        </div>
        <button className="text-[#673AB7] font-semibold hover:underline hidden md:block mt-4 md:mt-0">
          See all destinations →
        </button>
      </div>

      {/* Horizontal Scroll Container for 15 Images */}
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {destinations.length > 0 ? (
          destinations.map((dest, i) => (
            <div 
              key={i} 
              className="group relative min-w-[280px] md:min-w-[320px] h-[350px] md:h-[400px] bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer snap-center flex-shrink-0 border border-gray-100 flex flex-col"
            >
              {/* Top Half: Image */}
              <div className="relative h-[60%] w-full overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${dest.image}')` }}
                ></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold text-gray-900 flex items-center gap-1 shadow-sm">
                  <span className="text-yellow-500">★</span> {dest.rating}
                </div>
              </div>
              
              {/* Bottom Half: Details */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#673AB7] transition-colors line-clamp-1">{dest.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-1">{dest.desc}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Hotels</span>
                    <span className="text-sm font-bold text-gray-800">{dest.hotels}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Flights</span>
                    <span className="text-sm font-bold text-gray-800">{dest.flights}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Loading Skeletons
          [1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="min-w-[280px] md:min-w-[320px] h-[350px] md:h-[400px] bg-gray-200 animate-pulse rounded-[24px] flex-shrink-0"></div>
          ))
        )}
      </div>
    </div>
  );
}
