import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';
import Image from 'next/image';
import { MapPin, Star, ChevronRight, ExternalLink, Search, Plane } from 'lucide-react';
import Link from 'next/link';

// Pre-defined SEO data for destinations
const destinationsData: Record<string, any> = {
  'sri-lanka': {
    name: 'Sri Lanka',
    type: 'Country',
    heroImage: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?q=80&w=2161&auto=format&fit=crop',
    description: 'Discover the pearl of the Indian Ocean. From pristine beaches in Mirissa to the lush tea gardens of Ella, Sri Lanka offers a diverse range of accommodations for every traveler.',
    whyVisit: 'Endless beaches, timeless ruins, welcoming people, oodles of elephants, rolling surf, cheap prices, fun trains, famous tea and flavourful food make Sri Lanka irresistible.',
    topHotels: [
      { name: 'Cinnamon Grand Colombo', location: 'Colombo', rating: 4.8, reviews: 3420, price: 'From $120', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Anantara Peace Haven', location: 'Tangalle', rating: 4.9, reviews: 2150, price: 'From $350', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Heritance Kandalama', location: 'Dambulla', rating: 4.7, reviews: 4100, price: 'From $180', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop' },
    ]
  },
  'maldives': {
    name: 'Maldives',
    type: 'Country',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop',
    description: 'Experience ultimate luxury in the Maldives. Stay in overwater villas, swim in crystal-clear lagoons, and enjoy world-class hospitality in this tropical paradise.',
    whyVisit: 'Unrivaled luxury, stunning white-sand beaches and an amazing underwater world make the Maldives an obvious choice for a true holiday of a lifetime.',
    topHotels: [
      { name: 'Soneva Jani', location: 'Noonu Atoll', rating: 5.0, reviews: 1200, price: 'From $1,500', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2073&auto=format&fit=crop' },
      { name: 'Kurumba Maldives', location: 'North Male Atoll', rating: 4.8, reviews: 5400, price: 'From $400', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop' },
      { name: 'LUX* South Ari Atoll', location: 'South Ari Atoll', rating: 4.9, reviews: 3200, price: 'From $650', image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=2052&auto=format&fit=crop' },
    ]
  },
  'uae': {
    name: 'United Arab Emirates',
    type: 'Country',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop',
    description: 'From the futuristic skyline of Dubai to the cultural heritage of Abu Dhabi, the UAE offers unparalleled luxury hotels, massive shopping malls, and desert adventures.',
    whyVisit: 'Experience the perfect blend of traditional Arabian culture and hyper-modern luxury, featuring the world\'s tallest buildings and largest malls.',
    topHotels: [
      { name: 'Burj Al Arab Jumeirah', location: 'Dubai', rating: 4.9, reviews: 8500, price: 'From $1,200', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop' },
      { name: 'Emirates Palace', location: 'Abu Dhabi', rating: 4.8, reviews: 6200, price: 'From $450', image: 'https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=2085&auto=format&fit=crop' },
      { name: 'Atlantis The Palm', location: 'Dubai', rating: 4.7, reviews: 15400, price: 'From $550', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  'thailand': {
    name: 'Thailand',
    type: 'Country',
    heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop',
    description: 'Discover the Land of Smiles. Whether you prefer the bustling streets of Bangkok or the tranquil beaches of Phuket, Thailand has incredible accommodations for every budget.',
    whyVisit: 'Friendly and fun-loving, cultured and historic, Thailand radiates a golden hue from its glittering temples and tropical beaches.',
    topHotels: [
      { name: 'Mandarin Oriental', location: 'Bangkok', rating: 4.9, reviews: 4200, price: 'From $450', image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=2060&auto=format&fit=crop' },
      { name: 'Keemala', location: 'Phuket', rating: 4.8, reviews: 1800, price: 'From $600', image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Four Seasons Resort', location: 'Chiang Mai', rating: 4.9, reviews: 1500, price: 'From $700', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  'japan': {
    name: 'Japan',
    type: 'Country',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    description: 'Experience the harmony of ancient traditions and cutting-edge technology. Stay in a traditional ryokan or a high-rise luxury hotel with sweeping city views.',
    whyVisit: 'Japan is truly timeless, a place where ancient traditions are fused with modern life as if it were the most natural thing in the world.',
    topHotels: [
      { name: 'Aman Tokyo', location: 'Tokyo', rating: 4.9, reviews: 2100, price: 'From $900', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop' },
      { name: 'Hoshinoya', location: 'Kyoto', rating: 4.8, reviews: 1100, price: 'From $850', image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Park Hyatt', location: 'Tokyo', rating: 4.7, reviews: 3400, price: 'From $750', image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop' },
    ]
  },
  'dubai': {
    name: 'Dubai',
    type: 'City',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop',
    description: 'Dubai is a city of superlatives. Find the best deals on luxury resorts, desert camps, and downtown apartments in this global hub of commerce and tourism.',
    whyVisit: 'Home to the Burj Khalifa, massive artificial islands, and the world\'s largest shopping malls, Dubai is an unmissable destination.',
    topHotels: [
      { name: 'Burj Al Arab Jumeirah', location: 'Jumeirah Beach', rating: 4.9, reviews: 8500, price: 'From $1,200', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop' },
      { name: 'Atlantis The Palm', location: 'Palm Jumeirah', rating: 4.7, reviews: 15400, price: 'From $550', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Address Downtown', location: 'Downtown Dubai', rating: 4.8, reviews: 5200, price: 'From $400', image: 'https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=2085&auto=format&fit=crop' },
    ]
  },
  'london': {
    name: 'London',
    type: 'City',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59693e0d8ce6?q=80&w=2070&auto=format&fit=crop',
    description: 'Immerse yourself in history and culture. From boutique hotels in Covent Garden to grand stays in Mayfair, compare the best accommodation prices in London.',
    whyVisit: 'London is a dynamic metropolis where historic monuments stand alongside world-class museums, vibrant markets, and towering skyscrapers.',
    topHotels: [
      { name: 'The Savoy', location: 'Westminster', rating: 4.8, reviews: 6700, price: 'From $650', image: 'https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=2085&auto=format&fit=crop' },
      { name: 'Shangri-La The Shard', location: 'Southwark', rating: 4.9, reviews: 4300, price: 'From $700', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop' },
      { name: 'The Ritz London', location: 'Mayfair', rating: 4.7, reviews: 5100, price: 'From $800', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  'paris': {
    name: 'Paris',
    type: 'City',
    heroImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
    description: 'The City of Light awaits. Find romantic boutique hotels with Eiffel Tower views or affordable stays in the Latin Quarter through our trusted partners.',
    whyVisit: 'Paris\' monument-lined boulevards, museums, classical bistros and boutiques are enhanced by a new wave of multimedia galleries and creative wine bars.',
    topHotels: [
      { name: 'Four Seasons Hotel George V', location: '8th Arrondissement', rating: 4.9, reviews: 3200, price: 'From $1,100', image: 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66b?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Le Meurice', location: '1st Arrondissement', rating: 4.8, reviews: 2100, price: 'From $950', image: 'https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=2085&auto=format&fit=crop' },
      { name: 'Pullman Paris Tour Eiffel', location: '15th Arrondissement', rating: 4.5, reviews: 8900, price: 'From $350', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  'new-york': {
    name: 'New York',
    type: 'City',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
    description: 'The city that never sleeps. Compare rates across Manhattan, Brooklyn, and beyond to find your perfect base for exploring the Big Apple.',
    whyVisit: 'Epicenter of the arts. Dining and shopping capital. Trendsetter. New York City wears many crowns, and spreads an irresistible feast for all.',
    topHotels: [
      { name: 'The Plaza', location: 'Midtown Manhattan', rating: 4.7, reviews: 9200, price: 'From $650', image: 'https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=2085&auto=format&fit=crop' },
      { name: '1 Hotel Brooklyn Bridge', location: 'Brooklyn', rating: 4.8, reviews: 3400, price: 'From $500', image: 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66b?q=80&w=2070&auto=format&fit=crop' },
      { name: 'The Langham', location: 'Fifth Avenue', rating: 4.9, reviews: 2800, price: 'From $700', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  'tokyo': {
    name: 'Tokyo',
    type: 'City',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop',
    description: 'Experience the bustling energy of Tokyo. We aggregate prices from across the web to help you find the best deals on luxury stays, capsule hotels, and traditional ryokans.',
    whyVisit: 'Yoyogi Park\'s cherry blossoms, the scramble crossing in Shibuya, and ancient temples tucked between skyscrapers make Tokyo a city of contrasts.',
    topHotels: [
      { name: 'Aman Tokyo', location: 'Otemachi', rating: 4.9, reviews: 2100, price: 'From $900', image: 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66b?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Park Hyatt Tokyo', location: 'Shinjuku', rating: 4.7, reviews: 3400, price: 'From $750', image: 'https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=2085&auto=format&fit=crop' },
      { name: 'The Ritz-Carlton', location: 'Roppongi', rating: 4.8, reviews: 2600, price: 'From $800', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop' },
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = destinationsData[slug];
  if (!data) return { title: 'Destination Not Found' };
  
  return {
    title: "Best Hotels in " + data.name + " - Compare Prices | HotelChap",
    description: data.description,
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = destinationsData[slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image 
          src={data.heroImage} 
          alt={data.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-6xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-full text-sm uppercase tracking-widest mb-4 shadow-lg">
              Top {data.type}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">
              {data.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl drop-shadow-md leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-12">
          {/* Intro */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Why visit {data.name}?</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              {data.whyVisit} At HotelChap, we compare prices from hundreds of trusted booking partners to ensure you get the absolute best deal for your stay in {data.name}. We don't take your money directly�we just connect you to the lowest price.
            </p>
          </section>

          {/* Top Hotels List */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-gray-900">Top Rated Hotels</h2>
              <Link href={"/search?destination=" + data.name + "&type=hotel"} className="hidden sm:flex items-center gap-1 text-blue-600 font-bold hover:text-blue-700 transition">
                View all <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="space-y-6">
              {data.topHotels.map((hotel: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row hover:shadow-xl transition-shadow group">
                  <div className="relative h-56 sm:h-auto sm:w-1/3 overflow-hidden">
                    <Image 
                      src={hotel.image} 
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                      <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-bold text-sm">
                        <Star className="w-4 h-4 fill-blue-700" />
                        {hotel.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      {hotel.location}, {data.name}
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-6 text-justify">
                      Based on {hotel.reviews.toLocaleString()} reviews from our affiliate partners.
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase">Estimated Price</p>
                        <p className="text-xl font-black text-gray-900">{hotel.price}</p>
                      </div>
                      <Link href={"/search?destination=" + encodeURIComponent(hotel.name + " " + data.name)} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-2">
                        Check Prices <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link href={"/search?destination=" + data.name + "&type=hotel"} className="sm:hidden flex items-center justify-center gap-1 text-blue-600 font-bold hover:text-blue-700 transition mt-6 bg-blue-50 p-4 rounded-xl">
              View all hotels in {data.name} <ChevronRight className="w-5 h-5" />
            </Link>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111c43] to-[#2a3f85] rounded-3xl p-8 text-white shadow-xl sticky top-8">
            <h3 className="text-2xl font-black mb-4">Ready to go to {data.name}?</h3>
            <p className="text-blue-100 mb-8 leading-relaxed text-justify">
              Compare millions of deals instantly. We search Booking.com, Agoda, and hundreds of other sites so you don't have to.
            </p>
            
            <div className="space-y-4">
              <Link href={"/search?destination=" + data.name} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-900 py-4 px-6 rounded-xl font-bold transition shadow-lg">
                <Search className="w-5 h-5" />
                Find Hotels
              </Link>
              <Link href={"/search?destination=" + data.name + "&type=flights"} className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-4 px-6 rounded-xl font-bold transition">
                <Plane className="w-5 h-5" />
                Find Flights
              </Link>
            </div>
            
            <p className="text-xs text-center text-blue-200 mt-6 opacity-80 text-justify">
              *HotelChap is a metasearch engine. You pay nothing extra to use our service.
            </p>
          </div>
        </div>

      </main>

      <MegaFooter />
    </div>
  );
}
