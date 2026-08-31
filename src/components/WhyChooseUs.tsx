"use client";
import { useTranslation } from "@/lib/i18n";

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const reasons = [
    { icon: "🛡️", title: t("Secure Booking"), desc: t("Bank-level security for all your transactions.") },
    { icon: "💰", title: t("Best Price Match"), desc: t("Find a lower price? We'll match it instantly.") },
    { icon: "🎧", title: t("24/7 Support"), desc: t("Our travel experts are always here to help.") },
    { icon: "⭐", title: t("Millions of Reviews"), desc: t("Real photos and reviews from actual guests.") }
  ];

  return (
    <div className="w-full px-4 md:px-10 py-16 bg-white border-y border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-gray-900">{t("Why book with HotelChap?")}</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {reasons.map((r, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition cursor-pointer">
            <div className="text-5xl mb-4 bg-purple-50 p-4 rounded-full">{r.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
            <p className="text-gray-500 text-sm">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
