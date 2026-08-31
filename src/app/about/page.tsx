import React from 'react';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';
import { Globe, Shield, Sparkles, Heart } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - HotelChap',
  description: 'Learn more about HotelChap, your ultimate travel companion.',
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')" }}
        ></div>
        
        <div className="relative z-20 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">HotelChap</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-md">
            Your ultimate travel companion. We believe the journey should be just as beautiful as the destination.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full -mt-20 relative z-30">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-16 mb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                At HotelChap, we simplify the way the world travels. We know that finding the right flight, hotel, or rental car can be overwhelming with so many options available online.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                That's why we aggregate prices from over 100+ top travel sites into one seamless, easy-to-use platform. Whether you are planning a quick business trip or a month-long honeymoon, we bring the best deals directly to your fingertips.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] relative">
              <img 
                src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop" 
                alt="Travelers" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <hr className="border-gray-100 mb-16" />

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HotelChap?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We're not just another booking site. We provide smart tools and exclusive access to make your travel planning effortless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={28} />
              </div>
              <h3 className="font-bold text-xl mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">Compare prices across 100+ travel agencies and airlines worldwide instantly.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={28} />
              </div>
              <h3 className="font-bold text-xl mb-2">Secure & Trusted</h3>
              <p className="text-gray-600 text-sm">We partner only with verified, highly-rated travel providers to ensure a safe journey.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} />
              </div>
              <h3 className="font-bold text-xl mb-2">AI Trip Planner</h3>
              <p className="text-gray-600 text-sm">Use our cutting-edge AI to generate personalized itineraries for your next adventure.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={28} />
              </div>
              <h3 className="font-bold text-xl mb-2">Secret Deals</h3>
              <p className="text-gray-600 text-sm">Unlock mobile-only discounts and exclusive member prices you won't find elsewhere.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Push Footer to bottom */}
      <div className="mt-auto">
        <MegaFooter />
      </div>
    </div>
  );
}
