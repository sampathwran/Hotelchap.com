"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';
import { Search, ChevronDown, ChevronUp, Plane, CreditCard, User, HelpCircle, Mail, MessageSquare } from 'lucide-react';

const faqCategories = [
  {
    title: "Booking & Reservations",
    icon: <Plane className="w-6 h-6 text-blue-500" />,
    questions: [
      {
        q: "How do I book a hotel or flight?",
        a: "To book, simply enter your destination, travel dates, and number of guests in our search bar. Click 'Search' to view available options. Once you find a suitable deal, click 'Book Now' and follow the secure checkout process."
      },
      {
        q: "Can I cancel or change my booking?",
        a: "Yes! Most bookings offer free cancellation up to 24 hours before your check-in date. To cancel or modify, log into your HotelChap account, go to 'My Trips', and select the booking you wish to change."
      },
      {
        q: "Where can I find my booking confirmation?",
        a: "A confirmation email with your itinerary and booking reference is sent immediately after your payment is processed. You can also view all your active bookings in the 'My Trips' section of your account."
      }
    ]
  },
  {
    title: "Payments & Pricing",
    icon: <CreditCard className="w-6 h-6 text-purple-500" />,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards including Visa, MasterCard, and American Express. We also support PayPal, Apple Pay, and Google Pay for faster checkout."
      },
      {
        q: "Are there any hidden fees?",
        a: "No! The price you see on our final checkout page is the total price you will pay. It includes all taxes and standard fees. We believe in 100% price transparency."
      },
      {
        q: "When will I be charged for my booking?",
        a: "For most 'Pay Now' bookings, your card is charged immediately to secure the reservation. For 'Pay at Property' bookings, you will only be charged when you arrive at the hotel."
      }
    ]
  },
  {
    title: "Account & Settings",
    icon: <User className="w-6 h-6 text-amber-500" />,
    questions: [
      {
        q: "How do I reset my password?",
        a: "Click on 'Sign In' at the top right, then select 'Forgot Password?'. Enter the email address associated with your account, and we will send you a secure link to reset your password."
      },
      {
        q: "How can I subscribe to the Fare Alerts?",
        a: "You can subscribe to Fare Alerts by navigating to the Flights section or using the 'Secret Deals' form in our website footer. Just enter your email and we'll send you the best customized deals."
      },
      {
        q: "How do I delete my account?",
        a: "If you wish to permanently delete your account and all associated data, please navigate to your Profile Settings, scroll to the bottom, and click 'Delete Account'. This action cannot be undone."
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
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">How can we help you?</h1>
          <p className="text-lg text-gray-300 mb-10">
            Search our knowledge base or browse categories below to find answers to your questions.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Type your question here (e.g. 'cancel booking')"
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
                
                {/* Empty State if search doesn't match this category */}
                {category.questions.filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                   <p className="text-gray-400 italic py-4">No results found in this category.</p>
                )}
              </div>
            </div>
          ))}

          {/* Contact Support Banner */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden mt-8">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <HelpCircle className="w-48 h-48" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl font-black mb-4">Still need help?</h3>
              <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                Can't find the answer you're looking for? Our dedicated support team is available 24/7 to assist you with any questions or issues.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Live Chat
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-purple-700/50 hover:bg-purple-700/70 text-white font-bold rounded-xl border border-purple-400/30 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Support
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
