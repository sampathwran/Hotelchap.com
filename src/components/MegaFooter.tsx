"use client";
import { useState } from "react";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export default function MegaFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    
    try {
      await addDoc(collection(db, "subscribers"), {
        email: email.trim(),
        source: "footer_newsletter",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("Error subscribing:", err);
      setStatus("idle");
    }
  };
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Newsletter Signup (Added) */}
        <div className="bg-gray-800 rounded-2xl md:rounded-3xl p-5 md:p-8 mb-10 md:mb-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="text-left">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2 text-center md:text-left">Subscribe to unlock secret deals!</h3>
            <p className="text-xs md:text-base text-gray-400 text-center md:text-left">Get member-only prices and travel inspiration sent straight to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col w-full md:w-auto gap-2 relative">
            <div className="flex w-full gap-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                disabled={status === 'loading' || status === 'success'}
                className="w-full md:w-80 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#673AB7] disabled:opacity-50 transition-colors"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={"text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-xl font-bold transition flex items-center justify-center min-w-[100px] md:min-w-[120px] " + (status === 'success' ? "bg-green-600" : "bg-[#673AB7] hover:bg-[#522b94] disabled:opacity-70")}
              >
                {status === 'loading' ? (
                   <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : status === 'success' ? (
                   "Subscribed ?"
                ) : (
                   "Subscribe"
                )}
              </button>
            </div>
            {status === 'success' && (
              <p className="text-green-400 text-sm mt-1 absolute -bottom-6 animate-in fade-in slide-in-from-top-2">Thank you! We've added you to our list.</p>
            )}
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-black mb-6">HotelChap.</h3>
            <p className="text-gray-400 mb-6 max-w-sm">
              Your ultimate travel companion. Compare prices from 100+ travel sites and book your perfect stay, flight, or rental car.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] transition cursor-pointer text-gray-400 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E4405F] transition cursor-pointer text-gray-400 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition cursor-pointer text-gray-400 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.28A6.32 6.32 0 0 0 17 16.53V8.83a8.19 8.19 0 0 0 4.65 1.54V6.9a4.67 4.67 0 0 1-2.06-.21z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF0000] transition cursor-pointer text-gray-400 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Top Countries</h4>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li><Link href="/destinations/sri-lanka" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Hotels in Sri Lanka</Link></li>
              <li><Link href="/destinations/maldives" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Hotels in Maldives</Link></li>
              <li><Link href="/destinations/uae" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Hotels in UAE</Link></li>
              <li><Link href="/destinations/thailand" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Hotels in Thailand</Link></li>
              <li><Link href="/destinations/japan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Hotels in Japan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Top Cities</h4>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li><Link href="/destinations/dubai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Dubai</Link></li>
              <li><Link href="/destinations/london" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">London</Link></li>
              <li><Link href="/destinations/paris" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Paris</Link></li>
              <li><Link href="/destinations/new-york" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">New York</Link></li>
              <li><Link href="/destinations/tokyo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Tokyo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="flex flex-col gap-3 text-gray-400">
                <li><Link href="/help-center" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Help Center</Link></li>
                <li><Link href="/about" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/cookie-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Cookie Policy</Link></li>
              </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© 2026 HotelChap. All rights reserved.</p>
          <div className="flex gap-6">
            <span>English (US)</span>
            <span>USD ($)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
