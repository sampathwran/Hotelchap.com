"use client";

import React from "react";

const logos = [
  { name: "Avis", url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Avis_logo.svg" },
  { name: "Hertz", url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hertz_logo.svg" },
  { name: "Europcar", url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Europcar_Logo.svg" },
  { name: "Enterprise", url: "https://upload.wikimedia.org/wikipedia/commons/2/29/Enterprise_Rent-A-Car_logo.svg" },
  { name: "Sixt", url: "https://upload.wikimedia.org/wikipedia/commons/7/74/Sixt_logo.svg" },
  { name: "Budget", url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Budget_Rent_a_Car_logo.svg" },
  { name: "Alamo", url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Alamo_Rent_A_Car_Logo.svg" },
  { name: "National", url: "https://upload.wikimedia.org/wikipedia/commons/9/9b/National_Car_Rental_Logo.svg" },
];

export default function TrustedPartnersMarquee() {
  return (
    <div className="bg-white py-10 border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">In partnership with global leaders</p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden w-full group">
        
        {/* Left/Right Fading Gradients */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Animated Track */}
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] min-w-max items-center">
          {/* We duplicate the array to create an infinite loop effect */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 w-40 md:w-56 flex justify-center items-center px-4">
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="max-h-8 md:max-h-12 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />
    </div>
  );
}
