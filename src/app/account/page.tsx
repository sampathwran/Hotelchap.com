"use client";
import { useTranslation } from "@/lib/i18n";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut, updateProfile, updatePassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User as UserIcon, CreditCard, Lock, LogOut, Camera, Shield, Briefcase, Heart, Gift, Users, Settings, Bell, Plane } from "lucide-react";
import Link from "next/link";
import { countryCodes as countryCodesList } from "@/lib/countryCodes";
import Header from "@/components/Header";

export default function AccountPage() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("profile");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [countryCode, setCountryCode] = useState("+94");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Travelers state
  const [travelers, setTravelers] = useState<any[]>([]);
  const [isAddingTraveler, setIsAddingTraveler] = useState(false);
  const [newTraveler, setNewTraveler] = useState({ firstName: "", lastName: "", type: "Adult", passport: "" });

  // Preferences state
  const [preferences, setPreferences] = useState({
    currency: "USD",
    language: "English",
    flightSeat: "Any",
    hotelBed: "Any",
    smoking: "Non-Smoking",
    meal: "No Preference"
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.countryCode) setCountryCode(data.countryCode);
            if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
            if (data.travelers) setTravelers(data.travelers);
            if (data.preferences) setPreferences(data.preferences);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-bold">Loading...</div>;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ text: "Image must be less than 2MB.", type: "error" });
      return;
    }

    setIsUpdating(true);
    setMessage({ text: "Uploading image...", type: "success" });

    try {
      const storageRef = ref(storage, `profiles/${user.uid}/${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      
      setPhotoURL(downloadURL);
      await updateProfile(user, { photoURL: downloadURL });
      setMessage({ text: "Profile image updated successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage({ text: "", type: "" });
    try {
      await updateProfile(user, { displayName, photoURL });
      
      // Save phone number to Firestore
      await setDoc(doc(db, "users", user.uid), {
        countryCode,
        phoneNumber,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage({ text: "", type: "" });
    try {
      await updatePassword(user, newPassword);
      setMessage({ text: "Password updated successfully!", type: "success" });
      setNewPassword("");
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveTraveler = async () => {
    if (!newTraveler.firstName || !newTraveler.lastName) {
      setMessage({ text: "Please enter at least first and last name.", type: "error" });
      return;
    }
    
    setIsUpdating(true);
    try {
      const updatedTravelers = [...travelers, { ...newTraveler, id: Date.now().toString() }];
      await setDoc(doc(db, "users", user.uid), { travelers: updatedTravelers }, { merge: true });
      setTravelers(updatedTravelers);
      setNewTraveler({ firstName: "", lastName: "", type: "Adult", passport: "" });
      setIsAddingTraveler(false);
      setMessage({ text: "Traveler added successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteTraveler = async (travelerId: string) => {
    if (!confirm("Are you sure you want to remove this traveler?")) return;
    
    setIsUpdating(true);
    try {
      const updatedTravelers = travelers.filter(t => t.id !== travelerId);
      await setDoc(doc(db, "users", user.uid), { travelers: updatedTravelers }, { merge: true });
      setTravelers(updatedTravelers);
      setMessage({ text: "Traveler removed.", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage({ text: "", type: "" });
    try {
      await setDoc(doc(db, "users", user.uid), { preferences }, { merge: true });
      setMessage({ text: "Preferences saved successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Main Content */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center mb-4">
            <div 
              className="w-24 h-24 rounded-full bg-gray-100 border-4 border-[#673AB7]/20 flex items-center justify-center overflow-hidden mb-4 relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {photoURL || user.photoURL ? (
                <img src={photoURL || user.photoURL || ""} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-[#673AB7] font-bold">{user.email?.charAt(0).toUpperCase()}</span>
              )}
              <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white transition">
                <Camera size={24} />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <h3 className="font-black text-gray-900 text-lg">{user.displayName || "Traveler"}</h3>
            <p className="text-xs text-gray-500 font-medium">{user.email}</p>
          </div>
          <div className="flex flex-col gap-1 mt-4 border-t border-gray-100 pt-4">
            <button onClick={() => setActiveTab("bookings")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "bookings" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
              <Briefcase size={18} /> My Bookings
            </button>
            <button onClick={() => setActiveTab("wishlist")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "wishlist" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
              <Heart size={18} /> {t("Saved & Wishlist")}
            </button>
            <button onClick={() => setActiveTab("rewards")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "rewards" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
              <Gift size={18} /> Rewards & Points
            </button>
          </div>
          
          <div className="flex flex-col gap-1 mt-4 border-t border-gray-100 pt-4">
            <button onClick={() => setActiveTab("travelers")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "travelers" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
              <Users size={18} /> Co-Travelers
            </button>
            <button onClick={() => setActiveTab("preferences")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "preferences" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
              <Settings size={18} /> Preferences
            </button>
            <button onClick={() => setActiveTab("alerts")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "alerts" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
              <Bell size={18} /> Price Alerts
            </button>
          </div>
          <button onClick={() => setActiveTab("profile")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "profile" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
            <UserIcon size={18} /> Profile Details
          </button>
          <button onClick={() => setActiveTab("security")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "security" ? "bg-[#673AB7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
            <Shield size={18} /> Security
          </button>
          
          <div className="h-px bg-gray-200 my-2"></div>
          
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition mt-auto">
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
            
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl text-sm font-bold border ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                {message.text}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Profile Details</h2>
                <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5 max-w-lg">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address (Cannot change)</label>
                    <input type="email" value={user.email || ""} disabled className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                    <div className="flex gap-2">
                      <select 
                        value={countryCode} 
                        onChange={(e) => setCountryCode(e.target.value)} 
                        className="w-32 bg-gray-50 border border-gray-200 rounded-xl py-3 px-3 text-sm font-medium focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
                      >
                        {countryCodesList.map((country) => (
                          <option key={`${country.code}-${country.name}`} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input 
                        type="tel" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition" 
                        placeholder="71 234 5678" 
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={isUpdating} className="w-max bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 rounded-xl font-bold transition shadow-md mt-4 disabled:opacity-50">
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Security & Password</h2>
                <form onSubmit={handleChangePassword} className="flex flex-col gap-5 max-w-lg">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition" placeholder="••••••••" required minLength={6} />
                  </div>
                  <button type="submit" disabled={isUpdating} className="w-max bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 rounded-xl font-bold transition shadow-md mt-4 disabled:opacity-50">
                    {isUpdating ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>
            )}



            {activeTab === "bookings" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-6">My Bookings</h2>
                <div className="flex gap-4 mb-6 border-b border-gray-100 pb-2">
                  <button className="font-bold text-[#673AB7] border-b-2 border-[#673AB7] pb-2">Upcoming (0)</button>
                  <button className="font-bold text-gray-400 hover:text-gray-600 pb-2">Past Trips (0)</button>
                  <button className="font-bold text-gray-400 hover:text-gray-600 pb-2">Cancelled (0)</button>
                </div>
                
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <Briefcase size={48} className="text-gray-300 mb-4" />
                  <h4 className="font-bold text-gray-700 mb-1">No upcoming trips</h4>
                  <p className="text-sm text-gray-500 mb-4 max-w-sm">Looks like you haven't booked any trips yet. Start planning your next adventure today!</p>
                  <Link href="/" className="bg-[#673AB7] hover:bg-[#522b94] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition">
                    Explore Destinations
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-6">{t("Saved & Wishlist")}</h2>
                
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <Heart size={48} className="text-gray-300 mb-4" />
                  <h4 className="font-bold text-gray-700 mb-1">Your wishlist is empty</h4>
                  <p className="text-sm text-gray-500 mb-4 max-w-sm">Save your favorite hotels and flights by clicking the heart icon while browsing.</p>
                  <Link href="/" className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition">
                    Start Browsing
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "rewards" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Rewards & Points</h2>
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl p-8 text-white flex justify-between items-center shadow-lg">
                  <div>
                    <h3 className="text-3xl font-black mb-1">0 <span className="text-lg font-medium">pts</span></h3>
                    <p className="text-white/80 font-medium">HotelChap Member</p>
                  </div>
                  <Gift size={48} className="text-white/20" />
                </div>
                <div className="mt-8 border border-gray-100 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">How to earn points?</h4>
                  <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                    <li>Earn 10 points for every $1 spent on Hotels.</li>
                    <li>Earn 5 points for every $1 spent on Flights.</li>
                    <li>Points can be used to get up to 100% off your next booking.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "travelers" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900">Co-Travelers</h2>
                  {!isAddingTraveler && (
                    <button onClick={() => setIsAddingTraveler(true)} className="bg-[#673AB7] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#522b94]">+ Add Traveler</button>
                  )}
                </div>
                
                {isAddingTraveler ? (
                  <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 mb-6">
                    <h3 className="font-bold text-gray-900 mb-4">Add New Traveler</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">First Name</label>
                        <input type="text" value={newTraveler.firstName} onChange={(e) => setNewTraveler({...newTraveler, firstName: e.target.value})} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#673AB7]" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Last Name</label>
                        <input type="text" value={newTraveler.lastName} onChange={(e) => setNewTraveler({...newTraveler, lastName: e.target.value})} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#673AB7]" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Type</label>
                        <select value={newTraveler.type} onChange={(e) => setNewTraveler({...newTraveler, type: e.target.value})} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#673AB7]">
                          <option>Adult</option>
                          <option>Child</option>
                          <option>Infant</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Passport Number (Optional)</label>
                        <input type="text" value={newTraveler.passport} onChange={(e) => setNewTraveler({...newTraveler, passport: e.target.value})} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#673AB7]" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={handleSaveTraveler} disabled={isUpdating} className="bg-[#673AB7] hover:bg-[#522b94] text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition disabled:opacity-50">Save</button>
                      <button onClick={() => setIsAddingTraveler(false)} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-bold text-sm transition">Cancel</button>
                    </div>
                  </div>
                ) : null}

                {travelers.length === 0 && !isAddingTraveler ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                    <Users size={48} className="text-gray-300 mb-4" />
                    <h4 className="font-bold text-gray-700 mb-1">No travelers added yet</h4>
                    <p className="text-sm text-gray-500 max-w-sm">Save time booking by adding the details of people you frequently travel with.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {travelers.map(t => (
                      <div key={t.id} className="border border-gray-100 rounded-2xl p-6 flex justify-between items-center hover:border-[#673AB7] transition cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 text-[#673AB7] rounded-full flex items-center justify-center font-bold text-xl">
                            {t.firstName.charAt(0)}{t.lastName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{t.firstName} {t.lastName}</h4>
                            <p className="text-xs text-gray-500">{t.type} {t.passport ? `• Passport: ${t.passport}` : ""}</p>
                          </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteTraveler(t.id); }} className="text-red-500 font-bold text-sm hover:underline">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Travel Preferences</h2>
                <form onSubmit={handleSavePreferences} className="space-y-6 max-w-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Currency</label>
                      <select value={preferences.currency} onChange={(e) => setPreferences({...preferences, currency: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#673AB7]">
                        <option value="USD">USD ($)</option>
                        <option value="LKR">LKR (Rs)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Language</label>
                      <select value={preferences.language} onChange={(e) => setPreferences({...preferences, language: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#673AB7]">
                        <option value="English">English</option>
                        <option value="Sinhala">සිංහල</option>
                        <option value="Tamil">தமிழ்</option>
                      </select>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Flight Seat Preference</label>
                    <select value={preferences.flightSeat} onChange={(e) => setPreferences({...preferences, flightSeat: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#673AB7]">
                      <option value="Any">No Preference</option>
                      <option value="Window">Window Seat</option>
                      <option value="Aisle">Aisle Seat</option>
                      <option value="Middle">Middle Seat</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Hotel Bed Type</label>
                      <select value={preferences.hotelBed} onChange={(e) => setPreferences({...preferences, hotelBed: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#673AB7]">
                        <option value="Any">No Preference</option>
                        <option value="1 Large Bed">1 Large Double/King Bed</option>
                        <option value="2 Twin Beds">2 Single/Twin Beds</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Smoking Preference</label>
                      <select value={preferences.smoking} onChange={(e) => setPreferences({...preferences, smoking: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#673AB7]">
                        <option value="Non-Smoking">Non-Smoking Room</option>
                        <option value="Smoking">Smoking Room</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Dietary / Meal Preference</label>
                    <select value={preferences.meal} onChange={(e) => setPreferences({...preferences, meal: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#673AB7]">
                      <option value="No Preference">No Preference</option>
                      <option value="Vegetarian">Vegetarian (VG)</option>
                      <option value="Vegan">Vegan (VN)</option>
                      <option value="Halal">Halal (MOML)</option>
                      <option value="Gluten-Free">Gluten-Free (GFML)</option>
                      <option value="Hindu">Hindu Meal (HNML)</option>
                    </select>
                  </div>

                  <button type="submit" disabled={isUpdating} className="bg-[#673AB7] hover:bg-[#522b94] disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold shadow-md transition">
                    {isUpdating ? "Saving..." : "Save Preferences"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "alerts" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Price Alerts</h2>
                
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <Bell size={48} className="text-gray-300 mb-4" />
                  <h4 className="font-bold text-gray-700 mb-1">No price alerts</h4>
                  <p className="text-sm text-gray-500 max-w-sm">When you search for flights or hotels, you can create alerts to be notified when prices drop.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
