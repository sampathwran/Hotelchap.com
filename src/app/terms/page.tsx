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
      
      {/* Hero Header */}
      <div className="bg-[#111c43] text-white pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          HotelChap is a comprehensive travel search engine offering users information about accommodations, travel areas, and services associated with travel.
        </p>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-3 md:px-6 py-12 md:py-16 -mt-8 relative z-10 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-14">
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900">General Terms & Conditions</h2>
            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">Last Updated: August 2026</span>
          </div>
          
          <div className="space-y-12 text-gray-700 leading-relaxed text-[15px] text-justify">
            
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">1</span>
                Scope of Service
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>1.1.</strong> These terms and conditions are subject to occasional changes and apply to all our services that are directly or indirectly provided (i.e. via third parties) via the internet, on mobile devices, by email or by telephone.
                </p>
                <p>
                  <strong>1.2.</strong> By using our website, you confirm that you have read, understood and agree to these terms and conditions, as well as the privacy policy, including the use of cookies.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">2</span>
                Services and Contract
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>2.1.</strong> On the HotelChap website, you have the ability to compare third-party services via the HotelChap system.
                </p>
                <p>
                  <strong>2.2.</strong> HotelChap is a travel metasearch engine and affiliate platform. When you find a deal on our site, you are redirected to a third-party booking site (e.g., Booking.com, Agoda, Travelpayouts networks) to complete your reservation. HotelChap is NOT a travel operator, agency, or payment processor. We do not collect your payment information, nor do we issue tickets. We act solely as a referrer. By making a booking on the third-party website, you agree to their terms and conditions. HotelChap accepts absolutely zero liability for cancellations, refunds, or booking disputes, which must be handled directly with the third-party provider.
                </p>
                <p>
                  <strong>2.3.</strong> This agreement is not affected by any other agreements between the hotel and users.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">3</span>
                HotelChap Community and Member Area
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>3.1.</strong> Users have the option of joining the HotelChap Community (hereafter "Community") and/or creating a member account within the HotelChap Member Area. Users who register for the Community can publish self-generated content, as well as actively participate in the platform's development via the administrative functions. Unregistered users may read the content on HotelChap for free.
                </p>
                <p>
                  <strong>3.2.</strong> Using the HotelChap Member Area users have the option to administer and store their searches. In order to create the account, users are asked to provide personal information. Aside from the User's name, no personal information is made visible. For further information, please check our privacy policy. By deleting the account, any and all of the User's data will be permanently removed.
                </p>
                <p>
                  <strong>3.3.</strong> A user cannot register multiple times. The user is responsible for the accuracy and completeness of their personal information.
                </p>
                <p>
                  <strong>3.4.</strong> The user is responsible for the confidentiality of their user account information, in particular their password. They are also responsible for the use of their account with regard to HotelChap and third parties. The user should not divulge this data to third parties.
                </p>
                <p>
                  <strong>3.5.</strong> In the event of unauthorised use of the HotelChap services using the wrong username and password, the registered user must notify HotelChap immediately.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">4</span>
                Privacy, Email Advertisements
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>4.1.</strong> The protection of personal data provided by the user is of the highest priority for HotelChap. As such, HotelChap makes every effort to ensure compliance with data protection.
                </p>
                <p>
                  <strong>4.2.</strong> HotelChap collects, processes and uses your personal data (hereafter "data") only if we have obtained your consent or a statutory provision allows for the collection, processing or use of your data.
                </p>
                <p>
                  <strong>4.3.</strong> HotelChap will only raise, process and use data necessary for the provision of the services rendered by HotelChap, for the use and operation of the websites/apps and the services offered. 
                </p>
                <p>
                  <strong>4.4.</strong> If the user has agreed to receive information about HotelChap during registration for the Community or at another time using HotelChap's services, the user will receive periodic product information. The consent may be revoked at any time by written communication or by email. 
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">5</span>
                User Obligations
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>5.1.</strong> The user is responsible for the acquisition of rights to the content (text, photos, reviews, links, etc.) they upload to HotelChap. They ensure that they have all the rights in respect to the content they publish on the HotelChap platform and thereby do not violate the rights of any third parties.
                </p>
                <p>
                  <strong>5.2.</strong> The user guarantees not to use the HotelChap services to create content that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                  <li>Is advertising disguised as reviews.</li>
                  <li>Does not have specific content for a reviewed item.</li>
                  <li>Is not objective or intentionally untrue.</li>
                  <li>Is immoral, pornographic, or in any other way offensive.</li>
                  <li>Infringes upon the rights of third parties, in particular copyright.</li>
                  <li>Violates applicable laws in any way or constitutes a criminal offense.</li>
                  <li>Contains viruses or other computer programmes that may damage software or hardware.</li>
                  <li>Is a survey or chain letter.</li>
                  <li>Is aimed at collecting or using personal data from other users, especially for commercial purposes.</li>
                </ul>
                <p className="mt-4">
                  <strong>5.3.</strong> The user guarantees not to use programmes or functions to generate automated page impressions or content on HotelChap.
                </p>
                <p>
                  <strong>5.4.</strong> If there is a breach in the terms and conditions, HotelChap reserves the right to remove content without declaration of reason, to withhold payments earned in the HotelChap Community and to permanently ban members from HotelChap. The right to prosecution of criminal acts remains unaffected.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">6</span>
                Termination
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>6.1.</strong> HotelChap reserves the right to terminate a user's access and to delete their registration within a period of one week after receipt of relevant information via email about improper use of the website. The user may also terminate their own access and registration within the same period. The right to immediate termination for good cause remains unaffected.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">7</span>
                Liability
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  <strong>7.1.</strong> HotelChap is not liable for the accuracy, quality, completeness, reliability or credibility of content provided by users and/or booking sites. In particular, there is no advice or information from HotelChap regarding the selection of accommodations.
                </p>
                <p>
                  <strong>7.2.</strong> All agreements that arise through this service are between the HotelChap user and the respective external contracting booking site. In particular, HotelChap does not act as organiser or travel agency at any time. The terms and conditions of the respective organiser or travel agency apply exclusively.
                </p>
                <p>
                  <strong>7.3.</strong> HotelChap does not verify the accuracy of content uploaded by booking sites or members of the Community. This content is provided for publication on our website with reference to the respective hotel. HotelChap has no influence on this information.
                </p>
                <p>
                  <strong>7.4.</strong> In particular, hyperlinks, advertising banners, information about accommodations, travel destinations or providers do not represent recommendations or information from HotelChap. For technical reasons, no updating of the prices we receive from booking sites are done in real time. Therefore it is possible that the price that appears on the booking site does not correspond to the price specified on the HotelChap sites.
                </p>
                <p>
                  <strong>7.5.</strong> HotelChap is not liable for technical malfunctions for which the cause is not within HotelChap's sphere of responsibility or for damages caused by force majeure.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">8</span>
                Changes to the Terms and Conditions
              </h3>
              <div className="pl-11 space-y-4">
                <p>
                  The current terms and conditions when using HotelChap apply. Registered users receive notifications about changes by email. Users may download and print the current terms and conditions on their own computer system.
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
