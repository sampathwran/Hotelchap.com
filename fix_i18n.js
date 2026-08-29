const fs = require("fs");
let code = fs.readFileSync("src/lib/i18n.ts", "utf8");

code = code.replace(/export const translations: Record<string, Record<string, string>> = \{[\s\S]*?export function useTranslation/m, `export const translations: Record<string, Record<string, string>> = {
  EN: {
    hotels: "Hotels",
    flights: "Flights",
    cars: "Cars",
    packages: "Packages",
    transfers: "Transfers",
    attractions: "Attractions",
    cruises: "Cruises",
    getApp: "Get the App",
    listProperty: "List your property",
    support: "Support",
    signIn: "Sign In",
    searchPlaceholder: "Search for a destination...",
    popularDestinations: "Popular Destinations",
    searchBtn: "Search",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    rooms: "Rooms"
  }
};

export function useTranslation`);

fs.writeFileSync("src/lib/i18n.ts", code, "utf8");

