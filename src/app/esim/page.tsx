"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";

export default function EsimPage() {
  const { t } = useTranslation();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only load the script once
    if (widgetRef.current && widgetRef.current.children.length === 0) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://tpwidg.com/content?trs=566034&shmarker=769308&locale=en&powered_by=true&color_button=%23f2685f&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=5&plain=false&no_labels=true&promo_id=8588&campaign_id=541";
      script.charset = "utf-8";
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:px-8 pt-24 md:pt-32">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            {t("Global eSIM & Data")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("Stay connected wherever you travel with affordable digital eSIMs. No physical SIM card required.")}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto min-h-[500px]">
          <div className="p-2 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-[#673AB7] uppercase tracking-wider">Powered by Airalo</span>
          </div>
          <div className="p-4 md:p-8 flex justify-center items-center min-h-[400px]">
            {/* Widget Container */}
            <div ref={widgetRef} className="w-full h-full flex justify-center" />
          </div>
        </div>
        
        {/* Why eSIM Section */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold text-gray-900 mb-2">Instant Setup</h3>
                <p className="text-sm text-gray-500">Download your eSIM immediately after purchase and connect in minutes.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="font-bold text-gray-900 mb-2">200+ Countries</h3>
                <p className="text-sm text-gray-500">Get local data rates in over 200 countries and regions worldwide.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold text-gray-900 mb-2">No Roaming Fees</h3>
                <p className="text-sm text-gray-500">Avoid expensive carrier roaming fees with prepaid local data.</p>
            </div>
        </div>
      </main>
    </div>
  );
}
