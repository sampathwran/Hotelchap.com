"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';
import { Settings, CheckCircle2, BarChart2, Megaphone, ChevronDown, ChevronUp } from 'lucide-react';

const cookieCategories = [
  {
    id: "essential",
    title: "Essential Cookies",
    description: "These cookies are strictly necessary. They're the basic cookies that enable our site to work properly so that you can use the most important functions and navigate the site smoothly.",
    icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
    services: [
      {
        name: "HotelChap Essentials & Affiliate Tracking",
        description: "Core functionality required to keep your session active and strictly necessary affiliate tracking cookies that allow our partners to recognize that you were referred by HotelChap, ensuring we earn our commission.",
        duration: "Session",
      },
      {
        name: "Consent Management Platform",
        description: "Stores your privacy and cookie preferences.",
        duration: "365 days",
      }
    ]
  },
  {
    id: "performance",
    title: "Performance Cookies",
    description: "These cookies allow us to measure and improve the performance of our site. If you deactivate these cookies we won't be able to optimise our site for you.",
    icon: <BarChart2 className="w-6 h-6 text-blue-500" />,
    services: [
      {
        name: "Google Analytics 4",
        description: "This is a web analytics service used to track user interactions and performance metrics.",
        provider: "Google Ireland Limited",
        duration: "731 days",
      },
      {
        name: "Hotjar",
        description: "A behavior analytics service that helps us understand how users navigate our site through heatmaps and surveys.",
        provider: "Hotjar Ltd.",
        duration: "365 days",
      }
    ]
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description: "These cookies enable personalisation by tracking things like what you view, browse, and search for on our site. They may be shared with third-party partners to tailor ads to your profile.",
    icon: <Megaphone className="w-6 h-6 text-purple-500" />,
    services: [
      {
        name: "Google Ads Conversion Tracking",
        description: "Conversion tracking service to measure the effectiveness of our campaigns on Google.",
        provider: "Google Ireland Limited",
        duration: "365 days",
      },
      {
        name: "Facebook Pixel",
        description: "Used to track interactions of visitors with websites after they have clicked on an ad placed on Facebook or other Meta services.",
        provider: "Meta Platforms Ireland Ltd.",
        duration: "365 days",
      },
      {
        name: "TikTok Advertising",
        description: "An advertising service to provide relevant ads and analyze campaign performance on TikTok.",
        provider: "TikTok Information Technologies UK Limited",
        duration: "365 days",
      }
    ]
  }
];

export default function CookiePolicy() {
  const [openCategory, setOpenCategory] = useState<string | null>("essential");

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      {/* Hero Header */}
      <div className="bg-[#111c43] text-white pt-24 pb-16 px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <Settings className="w-8 h-8 text-blue-300" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Cookie Policy</h1>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Cookies are used on HotelChap by us and our trusted affiliate networks (such as Travelpayouts, Booking.com, Agoda) to enhance your experience and securely track affiliate referrals. For example, data is collected to remember recent activity or personalize the ads you see. We never use cookies to change what prices are shown on HotelChap.
        </p>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 -mt-8 relative z-10 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-100 pb-8 mb-10 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage cookie preferences</h2>
              <p className="text-gray-500 text-sm">Below is a detailed list of all cookies used on our platform categorized by their purpose.</p>
            </div>
            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full whitespace-nowrap">Last Updated: August 2026</span>
          </div>
          
          <div className="space-y-6">
            {cookieCategories.map((category) => {
              const isOpen = openCategory === category.id;
              
              return (
                <div key={category.id} className={"border rounded-2xl overflow-hidden transition-all duration-300 " + (isOpen ? 'border-purple-200 shadow-md' : 'border-gray-200 hover:border-purple-300')}>
                  
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={"w-full flex items-start gap-4 p-6 text-left focus:outline-none transition-colors " + (isOpen ? 'bg-purple-50/50' : 'bg-white hover:bg-gray-50/50')}
                  >
                    <div className="mt-1 flex-shrink-0">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-[15px] leading-relaxed text-justify">{category.description}</p>
                    </div>
                    <div className="mt-1 flex-shrink-0 ml-4">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-purple-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {/* Category Details (Services) */}
                  <div className={"overflow-hidden transition-all duration-300 bg-white " + (isOpen ? 'max-h-[2000px] opacity-100 border-t border-purple-100' : 'max-h-0 opacity-0')}>
                    <div className="p-6 md:p-8 space-y-8">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Services Included</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.services.map((service, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <h5 className="font-bold text-gray-900 text-lg mb-3">{service.name}</h5>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 text-justify">
                              {service.description}
                            </p>
                            
                            <div className="space-y-2 mt-auto pt-4 border-t border-gray-200/60">
                              {service.provider && (
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-400 font-semibold uppercase">Processing Company</span>
                                  <span className="text-sm text-gray-700">{service.provider}</span>
                                </div>
                              )}
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-semibold uppercase">Max Storage Duration</span>
                                <span className="text-sm text-gray-700">{service.duration}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <div className="mt-auto">
        <MegaFooter />
      </div>
    </div>
  );
}
