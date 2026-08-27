import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleOneTap from "@/components/GoogleOneTap";
import VisitTracker from "@/components/VisitTracker";

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
      <body className="min-h-full flex flex-col">
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
