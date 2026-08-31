"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';
import { Search, ChevronDown, ChevronUp, Plane, Info, User, HelpCircle, Mail, ExternalLink } from 'lucide-react';

const faqCategories = [
  {
    title: "Bookings & Cancellations",
    icon: <Plane className="w-6 h-6 text-blue-500" />,
    questions: [
      {
        q: "How do I book a hotel or flight?",
        a: "HotelChap is a travel search engine. When you find a deal you like, we redirect you to our trusted partners (such as Booking.com, Agoda, or airlines) to securely complete your booking and payment on their website."
      },
      {
        q: "Can I cancel or change my booking through HotelChap?",
        a: "No. Because your booking is made directly with the partner site (e.g., Agoda, Booking.com), you must contact them directly to cancel or modify your reservation. HotelChap does not have access to your booking records."
      },
      {
        q: "Where can I find my booking confirmation?",
        a: "Your confirmation email is sent directly by the partner you booked with immediately after your payment is processed. Please check your spam folder if you cannot find it, or contact the partner's support team."
      }
    ]
  },
  {
    title: "Payments & Pricing",
    icon: <Info className="w-6 h-6 text-purple-500" />,
    questions: [
      {
        q: "Does HotelChap charge any fees?",
        a: "No! HotelChap is 100% free to use. We do not add any hidden fees or charges to the prices we show you. We earn a small commission from our partners when you book through our links, at absolutely no extra cost to you."
      },
      {
        q: "Why do I pay on another website?",
        a: "We are a price comparison platform, not a travel agency. We aggregate the best deals from across the web, but the actual transaction is always handled securely by the booking partner you select."
      },
      {
        q: "Who do I contact for a refund?",
        a: "All refund requests must be directed to the partner you booked with, as HotelChap does not process payments, hold funds, or manage transactions."
      }
    ]
  },
  {
    title: "Account & General",
    icon: <User className="w-6 h-6 text-amber-500" />,
    questions: [
      {
        q: "How do I subscribe to Fare Alerts?",
        a: "You can subscribe to our newsletter and Fare Alerts using the form in our website footer. Just enter your email and we'll notify you when we find massive price drops."
      },
      {
        q: "Do I need a HotelChap account to book?",
        a: "No account is required! You can use HotelChap as a guest to compare prices and be redirected to our partners for booking."
      }
    ]
  }
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      {/* Hero Header */}
      <div className="bg-[#111c43] text-white pt-24 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 z-10 pointer-events-none"></div>
        <div className="relative z-20 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Help Center</h1>
          <p className="text-lg text-gray-300 mb-10">
            Find answers to common questions about how our search engine works.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search our FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 pr-6 rounded-2xl text-gray-900 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all border-none"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full relative z-30 -mt-12">
        <div className="space-y-12">
          
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions
                  .filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((faq, faqIndex) => {
                  const uniqueId = String(catIndex) + "-" + String(faqIndex);
                  const isOpen = openIndex === uniqueId;
                  
                  return (
                    <div 
                      key={faqIndex} 
                      className={"border rounded-2xl overflow-hidden transition-all duration-300 " + (isOpen ? 'border-purple-200 bg-purple-50/30' : 'border-gray-200 hover:border-purple-300')}
                    >
                      <button
                        onClick={() => toggleFaq(uniqueId)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                      >
                        <span className={"font-semibold text-[17px] " + (isOpen ? 'text-purple-700' : 'text-gray-800')}>
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      <div 
                        className={"overflow-hidden transition-all duration-300 " + (isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}
                      >
                        <p className="px-6 pb-6 text-gray-600 leading-relaxed text-justify">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact Support Banner */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden mt-8">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <HelpCircle className="w-48 h-48" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl font-black mb-4">Important Notice regarding Support</h3>
              <p className="text-lg text-purple-100 mb-8 leading-relaxed text-justify">
                Because HotelChap is a price comparison search engine, we do not have access to your booking details, payment records, or reservations. If you have an issue with a booking, please contact the customer support team of the booking partner (e.g., Booking.com, Agoda) directly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 bg-purple-700/50 hover:bg-purple-700/70 text-white font-bold rounded-xl border border-purple-400/30 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email for General Inquiries
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <div className="mt-8">
        <MegaFooter />
      </div>
    </div>
  );
}
