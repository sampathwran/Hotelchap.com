import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleOneTap from "@/components/GoogleOneTap";
import VisitTracker from "@/components/VisitTracker";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HotelChap - Book Hotels, Flights, Cars",
  description: "Find your perfect stay anywhere in the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sky-50 text-gray-900">
        {/* Stay22 LetMeAllez Script for Affiliate Monetization */}
        <Script id="stay22-script" strategy="afterInteractive">
          {`
            (function (s, t, a, y, twenty, two) {
              s.Stay22 = s.Stay22 || {};
              s.Stay22.params = { lmaID: '6a9143efa8f4d825a1a48e5a' };
              twenty = t.createElement(a);
              two = t.getElementsByTagName(a)[0];
              twenty.async = 1;
              twenty.src = y;
              two.parentNode.insertBefore(twenty, two);
            })(window, document, 'script', 'https://scripts.stay22.com/letmeallez.js');
          `}
        </Script>

        <GoogleOAuthProvider clientId="138916892371-uk50uaqnu7ambeml7nvb81k2u45rauvo.apps.googleusercontent.com">
        <AuthProvider>
          <VisitTracker />
          <GoogleOneTap />
          {children}
        </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
