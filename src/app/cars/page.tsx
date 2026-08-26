"use client";

import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import TravelpayoutsRentalWidget from "@/components/TravelpayoutsRentalWidget";
import { Car, ShieldCheck, MapPin, HeadphonesIcon, ChevronDown, CheckCircle } from "lucide-react";

export default function CarsPage() {
  const popularVehicles = [
    { name: "Economy Car", desc: "Perfect for city driving", price: "$25/day", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop" },
    { name: "Luxury SUV", desc: "Spacious for the whole family", price: "$80/day", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=600&auto=format&fit=crop" },
    { name: "City Scooter", desc: "Beat the traffic easily", price: "$12/day", img: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=600&auto=format&fit=crop" },
    { name: "Off-Road Bike", desc: "Adventure ready", price: "$30/day", img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600&auto=format&fit=crop" },
  ];

  const faqs = [
    { q: "What do I need to rent a car or bike?", a: "You will need a valid driver's license (International Driving Permit for some countries), a passport or ID card, and a credit card in the main driver's name for the deposit." },
    { q: "Is insurance included in the rental price?", a: "Most rentals include basic Collision Damage Waiver (CDW) and Theft Protection. You can always purchase comprehensive insurance at the counter for total peace of mind." },
    { q: "Can I pick up the vehicle at the airport?", a: "Yes! We offer convenient airport pick-up locations worldwide. Just enter your arrival airport in the search box above." },
    { q: "Is there a mileage limit?", a: "Many of our partners offer unlimited mileage, but some special vehicles might have a daily limit. Always check the rental conditions before booking." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section with Widget */}
      <div className="relative w-full min-h-[500px] flex items-center justify-center py-12 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">Hit the road with HotelChap</h1>
          <p className="text-lg md:text-xl text-white/90 font-medium mb-8 drop-shadow-md">Compare the best car and bike rental deals worldwide</p>
          
          {/* Glassmorphism Wrapper for the Widget */}
          <div className="w-full bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <TravelpayoutsRentalWidget />
          </div>
        </div>
      </div>

      {/* Trusted Partners */}
      <div className="bg-white py-6 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">In partnership with global leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale font-black text-xl text-gray-800">
            <span>Avis</span>
            <span>Hertz</span>
            <span>Europcar</span>
            <span>Enterprise</span>
            <span>Sixt</span>
            <span>Budget</span>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-16 w-full">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-10 text-center">Why rent with HotelChap?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <Car size={36} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">Huge Selection</h3>
            <p className="text-gray-500 font-medium leading-relaxed">From economy cars to luxury SUVs and agile scooters, find your perfect ride.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <ShieldCheck size={36} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">Secure & Insured</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Most of our rentals come with basic insurance included for your peace of mind.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <MapPin size={36} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">Anywhere You Go</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Pick up your vehicle from airports, train stations, or downtown city locations.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <HeadphonesIcon size={36} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">24/7 Support</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Our multi-lingual customer support team is always here to help you on the road.</p>
          </div>
        </div>
      </div>

      {/* Popular Vehicles */}
      <div className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Popular Vehicle Types</h2>
              <p className="text-gray-500 font-medium">Choose the perfect wheels for your adventure</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularVehicles.map((vehicle, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={vehicle.img} alt={vehicle.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                  <p className="text-gray-500 font-medium text-sm mb-4">{vehicle.desc}</p>
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-400">Starting from</span>
                    <span className="text-lg font-black text-[#673AB7]">{vehicle.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits & FAQ */}
      <div className="max-w-7xl mx-auto px-4 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-6">Drive your own adventure</h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">Whether you're exploring winding mountain roads on a motorcycle, or cruising along the coastline with your family in a spacious SUV, we have exactly what you need.</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-700 font-bold"><CheckCircle className="text-green-500" size={24} /> Free cancellation on most bookings</li>
            <li className="flex items-center gap-3 text-gray-700 font-bold"><CheckCircle className="text-green-500" size={24} /> No hidden credit card fees</li>
            <li className="flex items-center gap-3 text-gray-700 font-bold"><CheckCircle className="text-green-500" size={24} /> Flexible pick-up and drop-off</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm open:bg-[#673AB7] open:text-white transition-colors duration-300">
                <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center group-open:text-white text-gray-800">
                  {faq.q}
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-gray-500 group-open:text-white/90 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Push Footer to bottom */}
      <div className="mt-auto">
        <MegaFooter />
      </div>
    </div>
  );
}
