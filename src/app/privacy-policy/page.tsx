import React from 'react';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';

export const metadata = {
  title: 'Privacy Policy - HotelChap',
  description: 'Privacy Policy and Data Handling at HotelChap',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-10">Last Updated: August 2026</p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>At HotelChap, we collect information that you provide directly to us when you register for an account, subscribe to our newsletter, or use our platform. This may include your name, email address, and authentication details provided via third-party logins (like Google).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to operate and improve our platform, personalize your experience, provide customer support, and send you important updates or promotional offers related to travel deals.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Third-Party Affiliates & Booking Partners</h2>
              <p>HotelChap is a travel search and comparison platform. We do not directly handle bookings. When you click on a hotel or flight deal, you are redirected to third-party partners (such as Booking.com, Travelpayouts, etc.). These third-party websites have their own Privacy Policies, and we are not responsible for their data collection practices. Please review their policies before completing any transactions.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookies and Tracking</h2>
              <p>We use cookies and similar tracking technologies (including Google Analytics and Firebase Analytics) to track user activity on our platform. This helps us understand user behavior, remember your preferences, and improve our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h2>
              <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no internet transmission is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at support@hotelchap.com.</p>
            </section>
          </div>
        </div>
      </main>

      <MegaFooter />
    </div>
  );
}
