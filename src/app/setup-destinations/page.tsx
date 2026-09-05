"use client";
import { useState } from "react";
import { collection, addDoc, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "@/firebase";

const DESTINATIONS_DATA = [
  {
    country: { name: "Sri Lanka", flag: "????", image: "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?q=80&w=2161" },
    cities: [
      { name: "Colombo", rating: "4.5", reviews: "2.1k", tags: "City, Shopping, Culture", image: "https://images.unsplash.com/photo-1577727189679-66b96e62de97?q=80&w=2070" },
      { name: "Kandy", rating: "4.7", reviews: "1.8k", tags: "Temple, Mountains, Culture", image: "https://images.unsplash.com/photo-1620959419614-25cb92d908ff?q=80&w=2070" },
      { name: "Galle", rating: "4.8", reviews: "3.2k", tags: "Beach, Fort, History", image: "https://images.unsplash.com/photo-1589723938553-739343ee0657?q=80&w=2070" },
      { name: "Nuwara Eliya", rating: "4.6", reviews: "1.5k", tags: "Tea, Nature, Cold", image: "https://images.unsplash.com/photo-1625068228224-811c75c88bfb?q=80&w=2070" },
      { name: "Ella", rating: "4.9", reviews: "4.1k", tags: "Hiking, Views, Train", image: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=2028" },
      { name: "Sigiriya", rating: "4.8", reviews: "3.8k", tags: "History, Rock, Nature", image: "https://images.unsplash.com/photo-1565293282255-a2761895a0bd?q=80&w=2070" },
      { name: "Mirissa", rating: "4.7", reviews: "2.5k", tags: "Whales, Beach, Surf", image: "https://images.unsplash.com/photo-1590483868285-83e8cf4f0f0c?q=80&w=2070" },
      { name: "Trincomalee", rating: "4.5", reviews: "1.2k", tags: "Beach, Temple, Diving", image: "https://images.unsplash.com/photo-1568283472091-a67a07bfdb3c?q=80&w=2070" },
      { name: "Negombo", rating: "4.4", reviews: "2.0k", tags: "Airport, Beach, Seafood", image: "https://images.unsplash.com/photo-1605335191060-60b6bb7bc71b?q=80&w=2070" },
      { name: "Yala", rating: "4.7", reviews: "3.5k", tags: "Wildlife, Safari, Nature", image: "https://images.unsplash.com/photo-1610419389524-78330761e389?q=80&w=2070" }
    ]
  },
  {
    country: { name: "Maldives", flag: "????", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065" },
    cities: [
      { name: "Male", rating: "4.2", reviews: "1.5k", tags: "Capital, Culture, Market", image: "https://images.unsplash.com/photo-1574044391696-29a3e6203cfc?q=80&w=2070" },
      { name: "Maafushi", rating: "4.6", reviews: "2.8k", tags: "Local Island, Beach, Budget", image: "https://images.unsplash.com/photo-1580978933221-789a7444c119?q=80&w=2070" },
      { name: "Hulhumale", rating: "4.3", reviews: "1.2k", tags: "Airport, Beach, Modern", image: "https://images.unsplash.com/photo-1506509613149-14a0fc8424fb?q=80&w=2070" },
      { name: "Thoddoo", rating: "4.7", reviews: "900", tags: "Farming, Beach, Local", image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?q=80&w=2070" },
      { name: "Dhigurah", rating: "4.8", reviews: "1.1k", tags: "Whale Sharks, Beach, Diving", image: "https://images.unsplash.com/photo-1536768130504-20a273295b95?q=80&w=2070" },
      { name: "Rasdhoo", rating: "4.5", reviews: "850", tags: "Diving, Coral, Island", image: "https://images.unsplash.com/photo-1600216503463-54848037a544?q=80&w=2070" },
      { name: "Ukulhas", rating: "4.6", reviews: "700", tags: "Eco-friendly, Beach, Snorkeling", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2073" },
      { name: "Gulhi", rating: "4.4", reviews: "600", tags: "Quiet, Beach, Local", image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=2052" },
      { name: "Fuvahmulah", rating: "4.9", reviews: "1.5k", tags: "Sharks, Unique, Nature", image: "https://images.unsplash.com/photo-1518182170546-076616fdcd81?q=80&w=2070" },
      { name: "Villingili", rating: "4.3", reviews: "500", tags: "Resort, Luxury, Quiet", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070" }
    ]
  },
  {
    country: { name: "United Arab Emirates", flag: "????", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070" },
    cities: [
      { name: "Dubai", rating: "4.9", reviews: "15k", tags: "Luxury, Shopping, Modern", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070" },
      { name: "Abu Dhabi", rating: "4.8", reviews: "8k", tags: "Culture, Mosque, Luxury", image: "https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=2085" },
      { name: "Sharjah", rating: "4.5", reviews: "3k", tags: "Culture, Museums, Family", image: "https://images.unsplash.com/photo-1615174092404-3652fbc3df23?q=80&w=2070" },
      { name: "Ajman", rating: "4.3", reviews: "1.5k", tags: "Beach, Quiet, Budget", image: "https://images.unsplash.com/photo-1563229864-4458cc5c3c04?q=80&w=2070" },
      { name: "Fujairah", rating: "4.6", reviews: "2.1k", tags: "Mountains, Beach, Diving", image: "https://images.unsplash.com/photo-1627917865203-911855e9ba54?q=80&w=2070" },
      { name: "Ras Al Khaimah", rating: "4.7", reviews: "2.5k", tags: "Adventure, Mountains, Resorts", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2070" },
      { name: "Umm Al Quwain", rating: "4.2", reviews: "800", tags: "Quiet, Mangroves, History", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025" },
      { name: "Al Ain", rating: "4.6", reviews: "1.8k", tags: "Oasis, Heritage, Zoo", image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070" },
      { name: "Khor Fakkan", rating: "4.5", reviews: "1.2k", tags: "Beach, Waterfall, Mountains", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" },
      { name: "Hatta", rating: "4.8", reviews: "2.2k", tags: "Hiking, Dam, Adventure", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070" }
    ]
  },
  {
    country: { name: "Thailand", flag: "????", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039" },
    cities: [
      { name: "Bangkok", rating: "4.8", reviews: "12k", tags: "Street Food, Temples, Shopping", image: "https://images.unsplash.com/photo-1508009603885-50cf7cbf0c56?q=80&w=2070" },
      { name: "Phuket", rating: "4.7", reviews: "10k", tags: "Beach, Nightlife, Islands", image: "https://images.unsplash.com/photo-1583244243673-db96cbab66de?q=80&w=2071" },
      { name: "Chiang Mai", rating: "4.8", reviews: "8k", Culture: "Temples, Mountains, Digital Nomads", image: "https://images.unsplash.com/photo-1510250550474-067885b5d19a?q=80&w=2070" },
      { name: "Pattaya", rating: "4.4", reviews: "7k", tags: "Nightlife, Beach, Entertainment", image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=2070" },
      { name: "Krabi", rating: "4.9", reviews: "6k", tags: "Climbing, Islands, Nature", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039" },
      { name: "Koh Samui", rating: "4.7", reviews: "5.5k", tags: "Luxury Resorts, Beach, Spa", image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=2070" },
      { name: "Hua Hin", rating: "4.5", reviews: "3k", tags: "Royal, Quiet, Beach", image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2070" },
      { name: "Ayutthaya", rating: "4.6", reviews: "2.5k", tags: "History, Ruins, Temples", image: "https://images.unsplash.com/photo-1582200388915-188b200b396b?q=80&w=2070" },
      { name: "Chiang Rai", rating: "4.7", reviews: "2.8k", tags: "White Temple, Art, Culture", image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2070" },
      { name: "Koh Phangan", rating: "4.6", reviews: "4k", tags: "Full Moon Party, Yoga, Beach", image: "https://images.unsplash.com/photo-1531215433405-b829633e0854?q=80&w=2070" }
    ]
  },
  {
    country: { name: "Japan", flag: "????", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070" },
    cities: [
      { name: "Tokyo", rating: "4.9", reviews: "20k", tags: "Modern, Shopping, Food", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2088" },
      { name: "Kyoto", rating: "4.9", reviews: "15k", tags: "Temples, Culture, Geisha", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070" },
      { name: "Osaka", rating: "4.8", reviews: "12k", tags: "Street Food, Castle, Nightlife", image: "https://images.unsplash.com/photo-1590559899731-a382839cecd5?q=80&w=2070" },
      { name: "Sapporo", rating: "4.7", reviews: "5k", tags: "Snow, Beer, Seafood", image: "https://images.unsplash.com/photo-1580137258327-02b1f8ebf94c?q=80&w=2070" },
      { name: "Nara", rating: "4.8", reviews: "6k", tags: "Deer, Temples, History", image: "https://images.unsplash.com/photo-1601614948831-2949704e6c1c?q=80&w=2070" },
      { name: "Hiroshima", rating: "4.7", reviews: "5k", tags: "Peace Park, History, Shrine", image: "https://images.unsplash.com/photo-1560241031-6b2254eec248?q=80&w=2070" },
      { name: "Fukuoka", rating: "4.6", reviews: "4k", tags: "Ramen, Shopping, Shrines", image: "https://images.unsplash.com/photo-1616853164998-5c4bbd513816?q=80&w=2070" },
      { name: "Nagoya", rating: "4.5", reviews: "3k", tags: "Castle, Industry, Food", image: "https://images.unsplash.com/photo-1591035544773-4e4b52b86ab4?q=80&w=2070" },
      { name: "Okinawa", rating: "4.8", reviews: "4.5k", tags: "Beach, Snorkeling, Culture", image: "https://images.unsplash.com/photo-1579603756285-05ce4a2d744e?q=80&w=2070" },
      { name: "Hakone", rating: "4.7", reviews: "3.5k", tags: "Onsen, Fuji Views, Nature", image: "https://images.unsplash.com/photo-1583259838038-f860fb7f0f08?q=80&w=2070" }
    ]
  }
];

export default function SetupDestinations() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const populateDatabase = async () => {
    setLoading(true);
    setStatus("Deleting existing records...");
    try {
      // 1. Delete all existing countries and cities
      const countriesSnap = await getDocs(collection(db, "countries"));
      const citiesSnap = await getDocs(collection(db, "cities"));
      
      const batch1 = writeBatch(db);
      countriesSnap.docs.forEach(doc => batch1.delete(doc.ref));
      await batch1.commit();
      
      const batch2 = writeBatch(db);
      let count = 0;
      for (const doc of citiesSnap.docs) {
         batch2.delete(doc.ref);
         count++;
         if (count === 490) { // Safety limit for batch
             await batch2.commit();
             count = 0;
         }
      }
      if (count > 0) await batch2.commit();

      setStatus("Existing records deleted. Adding new data...");

      // 2. Add new data
      for (const dest of DESTINATIONS_DATA) {
        // Add Country
        const countryRef = await addDoc(collection(db, "countries"), {
          name: dest.country.name,
          flag: dest.country.flag,
          image: dest.country.image
        });

        // Add Cities for that Country
        const cityBatch = writeBatch(db);
        for (const city of dest.cities) {
          const newCityRef = doc(collection(db, "cities"));
          cityBatch.set(newCityRef, {
            name: city.name,
            countryId: countryRef.id,
            rating: city.rating,
            reviews: city.reviews,
            tags: city.tags || "",
            image: city.image
          });
        }
        await cityBatch.commit();
        setStatus(`Added ${dest.country.name} and its cities...`);
      }
      
      setStatus("Success! All 5 countries and 50 cities added to Firebase.");
    } catch (error: any) {
      console.error(error);
      setStatus("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-20 text-center">
      <h1 className="text-3xl font-bold mb-4">Database Setup Script</h1>
      <p className="mb-8">Click the button below to inject 5 countries and 50 cities into your Firebase.</p>
      
      <button 
        onClick={populateDatabase} 
        disabled={loading}
        className="bg-[#673AB7] text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-800 disabled:opacity-50"
      >
        {loading ? "Working..." : "Populate Firebase Now"}
      </button>

      {status && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg max-w-xl mx-auto">
          {status}
        </div>
      )}
    </div>
  );
}
