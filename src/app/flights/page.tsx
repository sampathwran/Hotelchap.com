"use client";

import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import TravelpayoutsFlightWidget from "@/components/TravelpayoutsFlightWidget";
import FlightOffersSlider from "@/components/FlightOffersSlider";
import PopularFlightRoutes from "@/components/PopularFlightRoutes";
import FareAlertsForm from "@/components/FareAlertsForm";
import FlightTipsBlog from "@/components/FlightTipsBlog";
import { Plane, ShieldCheck, Clock, CreditCard, Bell, ChevronDown, ArrowRight } from "lucide-react";

export default function FlightsPage() {

  const airlines = ["EK", "QR", "UL", "SQ", "EY", "MH", "TG", "CX"];

  const faqs = [
    { q: "How can I find the cheapest flight deals?", a: "To find the best deals, try to be flexible with your travel dates. Booking 2-3 months in advance and flying on weekdays (Tuesdays and Wednesdays) usually offers lower fares." },
    { q: "Are there any hidden booking fees?", a: "No! HotelChap connects you directly with the airlines and top travel agencies. The price you see is the final price you pay." },
    { q: "How much baggage is allowed on my flight?", a: "Baggage allowances vary by airline and ticket class. Most budget airlines charge extra for checked bags, while full-service airlines usually include 20-30kg for free. Check the specific airline rules before booking." },
    { q: "What is the best time to book flights for holidays?", a: "For major holidays, it's recommended to book at least 3-4 months in advance. Last-minute deals are very rare during peak seasons." }
  ];



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section with Widget */}
      <div className="relative w-full min-h-[500px] flex items-center justify-center py-12 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">Book Your Next Flight</h1>
          <p className="text-lg md:text-xl text-white/90 font-medium mb-8 drop-shadow-md">Compare over 500 airlines to find the best deals globally</p>
          
          {/* Glassmorphism Wrapper for the Widget */}
          <div className="w-full bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <TravelpayoutsFlightWidget />
          </div>
        </div>
      </div>

      {/* 1. Airlines Trust Banner (Marquee style) */}
      <div className="bg-white py-6 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">We compare thousands of routes from top airlines</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {airlines.map(code => (
              <img key={code} src={`https://pics.avs.io/150/50/${code}.png`} alt={`${code} airline logo`} className="h-8 md:h-10 object-contain mix-blend-multiply" />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Flight Deals / Flash Offers (Dynamic) */}
      <FlightOffersSlider />

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-10 text-center">Why book flights with HotelChap?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
                <Plane size={36} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">500+ Airlines</h3>
              <p className="text-gray-500 font-medium leading-relaxed">We search hundreds of airlines globally to find the cheapest flights for you.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
                <ShieldCheck size={36} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">No Hidden Fees</h3>
              <p className="text-gray-500 font-medium leading-relaxed">The price you see is the price you pay. No surprise booking fees added.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
                <Clock size={36} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Instant Booking</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Get your e-tickets instantly delivered straight to your email address.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
                <CreditCard size={36} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Pay securely with international credit cards or alternative methods.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <PopularFlightRoutes />

      {/* 4. Fare Alerts & 3. FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* FAQ Area (Takes 2 columns) */}
        <div className="lg:col-span-2">
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

        {/* Fare Alerts Sidebar (Takes 1 column) */}
        <FareAlertsForm />
      </div>

      {/* 5. Travel Tips & Blog Section */}
      <FlightTipsBlog />

      {/* Push Footer to bottom */}
      <div className="mt-auto">
        <MegaFooter />
      </div>
    </div>
  );
}
