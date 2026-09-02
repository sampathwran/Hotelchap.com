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
