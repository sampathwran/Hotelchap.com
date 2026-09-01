"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { Bell, CheckCircle } from "lucide-react";

export default function FareAlertsForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "subscribers"), {
        email: email.trim(),
        source: "fare_alert",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error("Error subscribing:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#673AB7] rounded-2xl md:rounded-3xl p-5 md:p-8 text-center text-white relative overflow-hidden shadow-lg h-full flex flex-col justify-center">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 text-white/10 opacity-50 pointer-events-none transform rotate-12">
        <Bell size={160} />
      </div>
      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md relative z-10">
        <Bell className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-3 relative z-10">Never miss a deal!</h3>
      <p className="text-xs md:text-base text-purple-200 mb-4 md:mb-6 font-medium relative z-10">
        Subscribe to fare alerts and get notified instantly when prices drop to your favorite destinations.
      </p>

      {success ? (
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 flex flex-col items-center gap-2 relative z-10">
          <CheckCircle className="text-green-300" size={32} />
          <p className="font-bold text-white">You're Subscribed!</p>
          <p className="text-sm text-purple-100">We'll send the best deals to your inbox.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative z-10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="px-4 py-3 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
          {error && <p className="text-red-300 text-sm font-bold text-left px-1">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>
      )}
    </div>
  );
}
