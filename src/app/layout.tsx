import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleOneTap from "@/components/GoogleOneTap";
import VisitTracker from "@/components/VisitTracker";
import Script from "next/script";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HotelChap | Best Hotel, Flight & Car Booking Site",
    template: "%s | HotelChap"
  },
  description: "Find the best and cheapest hotel deals, flights, and car rentals worldwide. Compare millions of options and book your perfect stay securely with HotelChap.",
  keywords: ["hotel booking", "cheap flights", "car rentals", "travel deals", "vacation packages", "HotelChap"],
  authors: [{ name: "HotelChap" }],
  creator: "HotelChap",
  publisher: "HotelChap",
  icons: {
    icon: '/image/HotelChap%20App%20Icon.png',
    shortcut: '/image/HotelChap%20App%20Icon.png',
    apple: '/image/HotelChap%20App%20Icon.png',
  },
  openGraph: {
    title: "HotelChap | Best Hotel, Flight & Car Booking Site",
    description: "Compare prices on hotels, flights, and cars. Save big on your next trip with HotelChap.",
    url: "https://www.hotelchap.com",
    siteName: "HotelChap",
    images: [
      {
        url: "/image/HotelChap%20App%20Icon.png",
        width: 800,
        height: 600,
        alt: "HotelChap Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sky-50 text-gray-900">
                {/* Travelpayouts Drive Script */}
        <Script id="travelpayouts-drive" strategy="beforeInteractive">
          {`
            (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.setAttribute("data-cmp-ab","2");
                script.src = 'https://emrld.ltd/NTY2MDM0.js?t=566034';
                document.head.appendChild(script);
            })();
          `}
        </Script>

        {/* Stay22 LetMeAllez Script */}
        <Script id="stay22-lma" strategy="beforeInteractive">
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
        <SettingsProvider>
        <AuthProvider>
          <VisitTracker />
          <GoogleOneTap />
          <Sidebar />
          {children}
        </AuthProvider>
        </SettingsProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
