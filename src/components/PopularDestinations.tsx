"use client";

import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function PopularDestinations() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"countries" | "cities">("countries");
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [expandedCities, setExpandedCities] = useState<Set<string>>(new Set());

  const countriesScrollRef = useRef<HTMLDivElement>(null);
  const citiesScrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          ref.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          ref.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    };

    const interval = setInterval(() => {
      if (activeTab === "countries") scrollContainer(countriesScrollRef);
      else scrollContainer(citiesScrollRef);
    }, 4000); // 4 seconds auto slide

    return () => clearInterval(interval);
  }, [activeTab]);

  const toggleExpand = (id: string) => {
    setExpandedCities(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesSnap, citiesSnap] = await Promise.all([
          getDocs(collection(db, "countries")),
          getDocs(collection(db, "cities"))
        ]);
        
        const countriesData = countriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const citiesData = citiesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setCountries(countriesData);
        setCities(citiesData);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCountryClick = (countryId: string) => {
    setSelectedCountryId(countryId);
    setActiveTab("cities");
  };

  const handleCityClick = (cityName: string) => {
    trackEvent("clicks");
    window.location.href = `/search?city=${encodeURIComponent(cityName)}`;
  };

  const displayedCities = selectedCountryId 
    ? cities.filter(c => c.countryId === selectedCountryId)
    : cities;

  return (
    <div className="w-full px-4 md:px-10 py-10 md:py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Best Destinations</h2>
            <p className="text-gray-500 font-medium">Explore the world's top countries and vibrant cities.</p>
          </div>
          
          {/* Custom Tabs */}
          <div className="flex bg-white p-1 rounded-full shadow-sm border border-gray-100">
            <button 
              onClick={() => { setActiveTab("countries"); setSelectedCountryId(null); }}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === "countries" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}
            >
              Countries
            </button>
            <button 
              onClick={() => setActiveTab("cities")}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === "cities" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}
            >
              Cities
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#673AB7]"></div>
          </div>
        ) : activeTab === "countries" ? (
          /* COUNTRIES VIEW */
          countries.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="font-bold text-lg mb-2">No Countries Found</p>
              <p>Admin hasn't added any countries yet.</p>
            </div>
          ) : (
            <div ref={countriesScrollRef} className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory hide-scrollbar scroll-smooth">
              {countries.map((country) => (
                <div 
                  key={country.id}
                  onClick={() => handleCountryClick(country.id)}
                  className="w-[75vw] sm:w-[280px] md:w-[320px] shrink-0 snap-start group relative h-[280px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gray-200 animate-pulse -z-10"></div>
                  <img src={country.image} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{country.flag}</span>
                      <h3 className="text-2xl font-bold">{country.name}</h3>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{cities.filter(c => c.countryId === country.id).length} Cities</p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* CITIES VIEW */
          displayedCities.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="font-bold text-lg mb-2">No Cities Found</p>
              <p>{selectedCountryId ? "No cities added for this country yet." : "No cities added yet."}</p>
              {selectedCountryId && (
                <button onClick={() => { setActiveTab("countries"); setSelectedCountryId(null); }} className="mt-4 text-[#673AB7] font-bold underline">
                  Back to Countries
                </button>
              )}
            </div>
          ) : (
            <div>
              {selectedCountryId && (
                 <div className="mb-6 flex items-center gap-2">
                   <button onClick={() => { setActiveTab("countries"); setSelectedCountryId(null); }} className="text-gray-500 hover:text-[#673AB7] font-bold text-sm flex items-center gap-1">
                     &larr; All Countries
                   </button>
                   <span className="text-gray-300">|</span>
                   <span className="text-gray-700 font-bold text-sm">Showing cities for {countries.find(c => c.id === selectedCountryId)?.name}</span>
                 </div>
              )}
              <div ref={citiesScrollRef} className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory hide-scrollbar scroll-smooth">
                {displayedCities.map((city) => (
                  <div key={city.id} className="w-[85vw] sm:w-[320px] md:w-[350px] shrink-0 snap-start bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-[520px]">
                    {/* Image Box */}
                      <div className="h-[220px] w-full relative overflow-hidden shrink-0">
                        <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                        
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer group/heart">
                          <svg className="w-5 h-5 text-gray-400 group-hover/heart:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>

                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 flex items-center shadow-sm">
                          <span className="text-yellow-500 mr-1">⭐</span> {city.rating}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-white">
                          {city.reviews} reviews
                        </div>
                      </div>

                    {/* Content Box */}
                      <div className="p-5 flex flex-col grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#673AB7] transition-colors">{city.name}</h3>
                        </div>

                        {/* Tags */}
                        {city.tags && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {city.tags.split(',').map((tag: string, i: number) => (
                              <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="grow mb-3 overflow-hidden flex flex-col">
                          <div className={`text-sm text-gray-500 leading-relaxed transition-all flex-grow ${expandedCities.has(city.id) ? 'overflow-y-auto max-h-[100px] hide-scrollbar' : 'line-clamp-3'}`}>
                            {city.desc}
                          </div>
                          {city.desc && city.desc.length > 100 && (
                            <button 
                              onClick={() => toggleExpand(city.id)}
                              className="text-[#673AB7] text-xs font-bold mt-1 hover:underline focus:outline-none self-start"
                            >
                              {expandedCities.has(city.id) ? '[ Show Less ]' : '[ Read More... ]'}
                            </button>
                          )}
                        </div>
                        
                        {/* Meta Info */}
                        <div className="bg-gray-50 rounded-lg p-2.5 mb-3 flex flex-col gap-1.5 shrink-0">
                          {city.bestTime && (
                            <div className="flex items-center text-xs text-gray-600 font-medium">
                              <span className="mr-2 text-sm">🗓️</span> Best time: {city.bestTime}
                            </div>
                          )}
                          {city.startingPrice && (
                            <div className="flex items-center text-xs text-gray-600 font-medium">
                              <span className="mr-2 text-sm">💰</span> Starting from <span className="font-bold text-gray-900 ml-1">${city.startingPrice} / night</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 shrink-0">
                          <button 
                            onClick={() => handleCityClick(city.name)}
                            className="w-full py-2.5 bg-[#673AB7]/10 hover:bg-[#673AB7] text-[#673AB7] hover:text-white font-bold rounded-xl transition-all duration-300 flex justify-center items-center gap-2"
                          >
                            View Hotels
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          </button>

                          <a href="/attractions" className="w-full py-1 text-gray-500 hover:text-[#673AB7] text-sm font-bold flex justify-center items-center gap-2 transition-colors">
                            <span className="text-lg">🎡</span> Top Attractions
                          </a>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
