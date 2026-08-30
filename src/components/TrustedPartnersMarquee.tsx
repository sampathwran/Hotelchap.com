"use client";

import React from "react";

const logos = [
  { name: "Avis", url: "/partners/avis.png" },
  { name: "Hertz", url: "/partners/hertz.jpg" },
  { name: "Europcar", url: "/partners/europcar.jpg" },
  { name: "Enterprise", url: "/partners/enterprise.png" },
  { name: "Sixt", url: "/partners/sixt.png" },
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
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const nextSibling = (e.target as HTMLImageElement).nextElementSibling;
                  if (nextSibling) {
                    nextSibling.classList.remove('hidden');
                  }
                }}
                className="max-h-8 md:max-h-12 w-auto object-contain hover:scale-110 transition-transform duration-300"
              />
              <span className="hidden font-black text-xl md:text-2xl text-gray-800 opacity-40 uppercase tracking-widest">{logo.name}</span>
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
