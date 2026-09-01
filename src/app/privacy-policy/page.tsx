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
      
      {/* Hero Header */}
      <div className="bg-[#111c43] text-white pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Privacy Notice</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Learn how HotelChap processes your personal data, protects your privacy, and what rights you have regarding your information.
        </p>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-3 md:px-6 py-12 md:py-16 -mt-8 relative z-10 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-14">
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Privacy & Data Policy</h2>
            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">Last Updated: October 2025</span>
          </div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed text-[15px] text-justify mb-12">
            <p>
              This Privacy Notice is valid for all websites, applications or other services and offerings (collectively "the Services") operated by HotelChap Inc. and its subsidiaries ("we", "us", or "HotelChap").
            </p>
            <p>
              In this Privacy Notice, we provide information about how HotelChap processes personal data in relation to your use of the Services. Personal data is any data that can be used to identify you, either directly or indirectly. As a travel metasearch company, HotelChap may redirect you to the websites or apps of third parties. Please note that we have no control over these third-party services, and that your use of these third-party services is subject to the privacy policies posted on the corresponding websites or apps, and not to this Privacy Notice.
            </p>
          </div>

          <div className="space-y-12 text-gray-700 leading-relaxed text-[15px] text-justify">
            
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">1</span>
                Who is responsible for the processing of personal data?
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  HotelChap Inc. controls the processing operations described in this Privacy Notice. To exercise your data protection rights, or to ask a general question about the processing of your personal data by HotelChap, you can contact our team by sending an email to privacy@hotelchap.com.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">2</span>
                Your rights
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>2.1 General rights:</strong> You have the legal data protection rights under the relevant legal conditions: the right to access, the right to erasure, the right to rectification, the right to restriction of processing, and the right to data portability.
                </p>
                <p>
                  <strong>2.2 Right to withdraw consent:</strong> You have the right to withdraw consent previously provided to us at any time. The consequence of this will be that we will no longer process your personal data in relation to that consent in the future.
                </p>
                <p>
                  <strong>2.3 Right to object:</strong> If we process your personal data on the basis of legitimate interests, you have the right to object at any time for reasons arising out of your particular situation against such processing.
                </p>
                <p>
                  <strong>2.4 Rights to object to direct marketing:</strong> If we process your personal data for the purpose of direct marketing, you have the right to object at any time to such processing.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">3</span>
                What data we collect from you
              </h3>
              <div className="pl-11 space-y-4">
                <p>When you use our Services, we may process these types of personal data:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><strong>User data:</strong> Personal data collected for the creation of a member account, such as your name, email address, password, profile picture, and search preferences.</li>
                  <li><strong>Usage data:</strong> Information about how you use our Services, including destination, date, number of guests, deals viewed, and links clicked.</li>
                  <li><strong>Affiliate Tracking Data:</strong> When you click a deal, we redirect you to our partners using affiliate tracking codes. Our partners (e.g., Booking.com, Travelpayouts) may share anonymous reporting data with us about whether a booking was completed so we can earn our commission, but this does NOT include your payment information or sensitive personal details.</li>
                  <li><strong>Financial Data:</strong> HotelChap DOES NOT collect, process, or store credit card numbers, bank details, or payment information. All transactions happen securely on our partners' websites.</li>
                  <li><strong>Location data:</strong> We may process approximate location information based on your IP address. With your prior consent, we may use GPS data to provide customised search results on your mobile.</li>
                  <li><strong>Technical data:</strong> IP address, cookies, session ID, device ID, browser software and version, operating system, and language settings.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">4</span>
                Why and how we use your personal data
              </h3>
              <div className="pl-11 space-y-4">
                <p>Your personal data may be used in the following ways:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>To provide our Services, including helping you compare accommodation prices and offers, and find and book your ideal stay.</li>
                  <li>To create and maintain a safe and reliable environment for our Services, including for your HotelChap member accounts.</li>
                  <li>To understand how you use our Services and use feedback to improve our platforms, identify trends, and develop new features (like our AI Planner).</li>
                  <li>To customise and tailor the experience based on your interactions, search history, and profile preferences.</li>
                  <li>To send you direct marketing communications about our Services (subject to your consent).</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">5</span>
                With whom we share your data
              </h3>
              <div className="pl-11 space-y-4">
                <p>We may share your personal data with the following categories of recipients:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><strong>Authentication partners:</strong> when you log in using third-party services like Google or Apple.</li>
                  <li><strong>Service providers:</strong> hosting and storage providers, customer service providers, and analytics platforms.</li>
                  <li><strong>Business partners:</strong> third-party travel suppliers such as hotels, airlines, car hire, and activity providers.</li>
                  <li><strong>Law Enforcement Authorities:</strong> when required by law or to protect our legal rights.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">6</span>
                Service-specific information
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>6.1 Newsletter:</strong> We offer newsletter services, which may include inspirational travel content, reminders about searches, or exclusive deals. You can unsubscribe at any time using the link in the footer of our emails.
                </p>
                <p>
                  <strong>6.2 HotelChap Member Account:</strong> Account creation is voluntary but may be required to make full use of certain functionality. Members benefit from enhanced features, AI planning tools, and access to secret mobile-only deals.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">7</span>
                Information on cookies
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  Cookies are small text files downloaded on your device when you visit a website. We use cookies to recognise users' devices and store information about their preferences.
                </p>
                <p>
                  We use <strong>Strictly necessary cookies</strong> to enable you to use our Services, <strong>Functional cookies</strong> to remember your choices (like currency/language), <strong>Performance cookies</strong> to monitor analytics, and <strong>Marketing cookies</strong> to build profiles and show relevant ads.
                </p>
                <p>
                  You can withdraw or modify your consent to our use of non-essential cookies at any time by configuring your web browser settings to decline cookies.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">8</span>
                Transfer to other countries
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  Because of the global nature of our business, we may share your personal data internationally with our wholly owned subsidiaries and partners. Whenever we transfer data internationally, we take additional measures to make sure that the transfer complies with applicable laws, such as using Standard Contractual Clauses.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">9</span>
                Security and Data Retention
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>9.1 How we protect your data:</strong> We have taken appropriate technical and organisational measures to protect your personal data from being accidentally or intentionally manipulated, lost, destroyed, or accessed by unauthorised persons. These include encryption, firewalls, and strict access controls.
                </p>
                <p>
                  <strong>9.2 When will your data be deleted?</strong> We keep your personal data only for as long as needed or permitted in light of the purposes for which it was collected. Thereafter, we delete the data immediately, unless we still need the data until the expiry of statutory limitation periods (e.g., for tax law reasons).
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <div className="mt-auto">
        <MegaFooter />
      </div>
    </div>
  );
}
