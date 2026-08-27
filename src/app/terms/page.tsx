import React from 'react';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';

export const metadata = {
  title: 'Terms of Service - HotelChap',
  description: 'Terms and Conditions for using HotelChap',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-10">Last Updated: August 2026</p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using HotelChap.com ("the Website"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Nature of Service</h2>
              <p>HotelChap is a travel metasearch engine and affiliate platform. We aggregate and compare prices for hotels, flights, and rental cars. We are <strong>not a travel agency</strong> and we do not provide ticketing, booking, or accommodation services directly.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Affiliate Disclaimer</h2>
              <p>When you click on deals or offers on our website, you are redirected to third-party booking providers (e.g., Booking.com, Expedia, Agoda). We may earn an affiliate commission from these providers at no additional cost to you. All bookings, payments, and customer service related to your trip are handled strictly by the third-party provider, not HotelChap.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Accuracy of Information</h2>
              <p>While we strive to display accurate pricing and availability, prices fluctuate rapidly based on the third-party providers. We do not guarantee that the prices displayed on HotelChap will be the final price you pay at the booking provider's checkout.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. User Accounts</h2>
              <p>You may need to create an account to use certain features (like saving to a wishlist). You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
              <p>HotelChap shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services, or from any booking made through our third-party partners.</p>
            </section>
          </div>
        </div>
      </main>

      <MegaFooter />
    </div>
  );
}
