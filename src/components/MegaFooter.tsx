"use client";
import { useState } from "react";

export default function MegaFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Newsletter Signup (Added) */}
        <div className="bg-gray-800 rounded-3xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Subscribe to unlock secret deals!</h3>
            <p className="text-gray-400">Get member-only prices and travel inspiration sent straight to your inbox.</p>
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
                className="w-full md:w-80 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#673AB7] disabled:opacity-50 transition-colors"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={"text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center min-w-[120px] " + (status === 'success' ? "bg-green-600" : "bg-[#673AB7] hover:bg-[#522b94] disabled:opacity-70")}
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
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#673AB7] transition cursor-pointer">📘</div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#673AB7] transition cursor-pointer">📸</div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#673AB7] transition cursor-pointer">🐦</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Top Countries</h4>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition">Hotels in Sri Lanka</li>
              <li className="hover:text-white cursor-pointer transition">Hotels in Maldives</li>
              <li className="hover:text-white cursor-pointer transition">Hotels in UAE</li>
              <li className="hover:text-white cursor-pointer transition">Hotels in Thailand</li>
              <li className="hover:text-white cursor-pointer transition">Hotels in Japan</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Top Cities</h4>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition">Dubai</li>
              <li className="hover:text-white cursor-pointer transition">London</li>
              <li className="hover:text-white cursor-pointer transition">Paris</li>
              <li className="hover:text-white cursor-pointer transition">New York</li>
              <li className="hover:text-white cursor-pointer transition">Tokyo</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition">About Us</li>
              <li className="hover:text-white cursor-pointer transition">Careers</li>
              <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition">Contact Support</li>
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
