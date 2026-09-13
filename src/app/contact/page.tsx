"use client";
import React from 'react';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#673AB7]/5 z-10 pointer-events-none"></div>
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Get in <span className="text-[#673AB7]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Have a question, need help with a booking, or want to partner with us? We're always here to help you navigate your travel journey.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left: Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#673AB7]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#673AB7]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-2">For general inquiries, support, and partnerships.</p>
                  <a href="mailto:support@hotelchap.com" className="text-[#673AB7] font-semibold hover:underline">
                    support@hotelchap.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#673AB7]/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#673AB7]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Help Center</h3>
                  <p className="text-gray-600 mb-2">Check out our FAQ for quick answers to common questions.</p>
                  <Link href="/help-center" className="text-[#673AB7] font-semibold hover:underline">
                    Visit Help Center &rarr;
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#673AB7]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#673AB7]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Global Operations</h3>
                  <p className="text-gray-600">
                    HotelChap is a digital-first platform serving travelers worldwide. While we operate globally online, our support team is ready to assist you anywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message! Our team will get back to you soon."); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">First Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/20 focus:border-[#673AB7] transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Last Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/20 focus:border-[#673AB7] transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/20 focus:border-[#673AB7] transition-all" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/20 focus:border-[#673AB7] transition-all bg-white">
                  <option>General Inquiry</option>
                  <option>Booking Assistance</option>
                  <option>Partnerships & Affiliates</option>
                  <option>Feedback & Suggestions</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/20 focus:border-[#673AB7] transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#673AB7] hover:bg-[#522b94] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </section>

      <MegaFooter />
    </div>
  );
}
