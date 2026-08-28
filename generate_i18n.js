const fs = require("fs");
const code = `import { useSettings } from "@/context/SettingsContext";

export const translations: Record<string, Record<string, string>> = {
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
  },
  SI: {
    hotels: "?????",
    flights: "????? ????",
    cars: "????",
    packages: "?????",
    transfers: "????????",
    attractions: "??????",
    cruises: "????",
    getApp: "App ?? ????",
    listProperty: "??? ???? ???? ?????",
    support: "????",
    signIn: "????? ????",
    searchPlaceholder: "?????????? ??????...",
    popularDestinations: "???????? ???????",
    searchBtn: "??????",
    checkIn: "???????",
    checkOut: "??????",
    guests: "????????",
    rooms: "????"
  },
  ES: {
    hotels: "Hoteles",
    flights: "Vuelos",
    cars: "Coches",
    packages: "Paquetes",
    transfers: "Traslados",
    attractions: "Atracciones",
    cruises: "Cruceros",
    getApp: "Obtener la App",
    listProperty: "Registra tu propiedad",
    support: "Soporte",
    signIn: "Iniciar sesión",
    searchPlaceholder: "Buscar un destino...",
    popularDestinations: "Destinos populares",
    searchBtn: "Buscar",
    checkIn: "Llegada",
    checkOut: "Salida",
    guests: "Huéspedes",
    rooms: "Habitaciones"
  },
  FR: {
    hotels: "Hôtels",
    flights: "Vols",
    cars: "Voitures",
    packages: "Forfaits",
    transfers: "Transferts",
    attractions: "Attractions",
    cruises: "Croisières",
    getApp: "Obtenir lappli",
    listProperty: "Inscrivez votre établissement",
    support: "Assistance",
    signIn: "Se connecter",
    searchPlaceholder: "Rechercher une destination...",
    popularDestinations: "Destinations populaires",
    searchBtn: "Rechercher",
    checkIn: "Arrivée",
    checkOut: "Départ",
    guests: "Clients",
    rooms: "Chambres"
  },
  AR: {
    hotels: "?????",
    flights: "?????",
    cars: "??????",
    packages: "?????",
    transfers: "???",
    attractions: "?????",
    cruises: "????? ?????",
    getApp: "???? ??? ???????",
    listProperty: "???? ?????",
    support: "?????",
    signIn: "????? ??????",
    searchPlaceholder: "???? ?? ????...",
    popularDestinations: "????? ?????",
    searchBtn: "???",
    checkIn: "????? ??????",
    checkOut: "????? ????????",
    guests: "??????",
    rooms: "???"
  }
};

export function useTranslation() {
  const { language } = useSettings();
  
  const t = (key: string) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations["EN"][key]) {
      return translations["EN"][key];
    }
    return key;
  };

  return { t, language };
}
`;
fs.writeFileSync("src/lib/i18n.ts", code, "utf8");

