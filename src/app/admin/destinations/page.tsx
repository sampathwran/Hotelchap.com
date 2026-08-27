"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Trash2, Edit2, Plus, Loader2 } from "lucide-react";

export default function DestinationsAdmin() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("4.8");
  const [reviews, setReviews] = useState("10k");

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "destinations"), {
        name,
        desc,
        image,
        rating,
        reviews,
        createdAt: new Date().toISOString()
      });
      // Reset form
      setName(""); setDesc(""); setImage(""); setRating("4.8"); setReviews("10k");
      setIsAdding(false);
      fetchDestinations();
    } catch (error) {
      console.error("Error adding destination:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "destinations", id));
      fetchDestinations();
    } catch (error) {
      console.error("Error deleting destination:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Popular Destinations</h1>
          <p className="text-gray-500 mt-1">Manage the destinations shown on the homepage.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#673AB7] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md hover:bg-[#522b94] transition"
        >
          {isAdding ? "Cancel" : <><Plus size={20} /> Add Destination</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Destination</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. Paris, France" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input type="text" required value={desc} onChange={e => setDesc(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. Eiffel tower & romantic streets" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Unsplash or Firebase Storage)</label>
              <input type="url" required value={image} onChange={e => setImage(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <input type="text" required value={rating} onChange={e => setRating(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. 4.8" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Reviews</label>
              <input type="text" required value={reviews} onChange={e => setReviews(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. 15k" />
            </div>
            <div className="md:col-span-2 mt-2">
              <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition">
                {loading ? "Saving..." : "Save Destination"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && !isAdding ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-[#673AB7]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.length === 0 ? (
            <p className="text-gray-500 col-span-3 text-center py-10">No destinations found. Add one above.</p>
          ) : (
            destinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="h-48 w-full relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => handleDelete(dest.id)} className="p-2 bg-white/90 rounded-full text-red-500 hover:bg-red-50 shadow-sm backdrop-blur-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{dest.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{dest.desc}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm font-medium text-gray-600">
                    <span className="flex items-center gap-1 text-yellow-500">★ {dest.rating}</span>
                    <span>({dest.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
