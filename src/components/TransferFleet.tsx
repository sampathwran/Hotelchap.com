"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Users, Luggage } from "lucide-react";

export default function TransferFleet() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const q = query(
          collection(db, "transfer_vehicles"),
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
      <div className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Fleet Options</h2>
              <p className="text-gray-500 font-medium text-lg">A vehicle for every traveler and group size</p>
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
    <div className="bg-gray-50 py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Fleet Options</h2>
            <p className="text-gray-500 font-medium text-lg">A vehicle for every traveler and group size</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
              <div className="h-56 overflow-hidden relative">
                <img src={vehicle.img} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">{vehicle.name}</h3>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-500 font-medium text-sm mb-6 flex-grow">{vehicle.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-600 font-bold gap-1.5">
                    <Users size={18} className="text-[#673AB7]" />
                    <span>{vehicle.pax || 0} Max</span>
                  </div>
                  <div className="flex items-center text-gray-600 font-bold gap-1.5">
                    <Luggage size={18} className="text-[#673AB7]" />
                    <span>{vehicle.luggage || 0} Max</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
