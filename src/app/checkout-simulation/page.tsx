"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") || "Booking Partner";
  const price = searchParams.get("price") || "0.00";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-2">Simulated Booking!</h1>
        <p className="text-gray-500 mb-8">
          In a real meta-search engine, the user would have been redirected to <strong>{provider}</strong> to complete their payment of <strong>${price}</strong>.
        </p>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-8 text-left">
          <h3 className="font-bold text-gray-900 mb-2">Why this happens:</h3>
          <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
            <li>Sites like Trivago/Travelpayouts are <strong>Aggregators</strong>.</li>
            <li>They only compare prices, they don't take money.</li>
            <li>When the user books on {provider}, {provider} pays you a commission!</li>
          </ul>
        </div>

        <Link href="/" className="bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 rounded-xl font-bold shadow-md transition inline-block">
          Back to HotelChap
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSimulationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
