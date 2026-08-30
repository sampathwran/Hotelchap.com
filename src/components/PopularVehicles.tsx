"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default function PopularVehicles() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const q = query(
          collection(db, "popular_vehicles"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const fetchedVehicles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Popular Vehicle Types</h2>
              <p className="text-gray-500 font-medium">Choose the perfect wheels for your adventure</p>
            </div>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-[#673AB7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (vehicles.length === 0) return null;

  return (
    <div className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Popular Vehicle Types</h2>
            <p className="text-gray-500 font-medium">Choose the perfect wheels for your adventure</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer">
              <div className="h-48 overflow-hidden bg-gray-100">
                <img src={vehicle.img} alt={vehicle.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                <p className="text-gray-500 font-medium text-sm mb-4">{vehicle.desc}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm font-bold text-gray-400">Starting from</span>
                  <span className="text-lg font-black text-[#673AB7]">{vehicle.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
