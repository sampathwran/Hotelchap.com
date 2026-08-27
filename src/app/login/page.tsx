"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@/firebase";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const { getAdditionalUserInfo } = await import("firebase/auth");
      const additionalInfo = getAdditionalUserInfo(result);
      
      const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
      const { db } = await import("@/firebase");

      const userRef = doc(db, 'users', result.user.uid);
      await setDoc(userRef, {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        lastLoginAt: serverTimestamp(),
        ...(additionalInfo?.isNewUser && { createdAt: serverTimestamp() })
      }, { merge: true });

      if (additionalInfo?.isNewUser) {
        import("@/lib/analytics").then((m) => m.trackEvent("registered"));
      }
      router.push("/"); // Redirect to home on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
      const { db } = await import("@/firebase");

      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, 'users', result.user.uid);
        await setDoc(userRef, {
          lastLoginAt: serverTimestamp(),
        }, { merge: true });
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, 'users', result.user.uid);
        await setDoc(userRef, {
          name: name,
          email: result.user.email,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        }, { merge: true });
        
        import("@/lib/analytics").then((m) => m.trackEvent("registered"));
      }
      router.push("/"); // Redirect to home on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      
      {/* Left Side: Image Banner */}
      <div className="hidden lg:flex flex-1 relative bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[10s] hover:scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-end p-16 h-full text-white">
          <Link href="/" className="absolute top-8 left-8 flex items-center gap-3">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[#673AB7] text-2xl shadow-lg">H</div>
             <span className="font-bold text-2xl tracking-wide">HotelChap.</span>
          </Link>
          <span className="bg-[#673AB7] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-4">Member Perks</span>
          <h1 className="text-5xl font-black mb-4 leading-tight">Your gateway to <br/>the perfect trip</h1>
          <p className="text-gray-300 text-lg max-w-md">Join thousands of smart travelers comparing and finding the best prices on hotels, flights, and cars worldwide.</p>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 bg-white relative">
        <Link href="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#673AB7] rounded-lg flex items-center justify-center font-black text-white text-xl">H</div>
            <span className="font-bold text-xl text-gray-900">HotelChap.</span>
        </Link>

        <div className="w-full max-w-md mx-auto">
          
          <div className="mb-10 text-center lg:text-left mt-12 lg:mt-0">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? "Enter your details to access your account." : "Start your journey with us today."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-bold transition shadow-sm disabled:opacity-50"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white py-3 rounded-xl font-bold transition shadow-sm opacity-50 cursor-not-allowed">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5 brightness-0 invert" />
              Continue with Facebook (Coming Soon)
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Or continue with email</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
            {!isLogin && (
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
                  required
                />
              </div>
            )}
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
                required
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
                required
              />
            </div>
            
            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-xs font-bold text-[#673AB7] hover:underline">Forgot password?</a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#673AB7] hover:bg-[#522b94] text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")} <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-10">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-[#673AB7] hover:underline"
            >
              {isLogin ? "Sign up for free" : "Log in here"}
            </button>
          </p>

        </div>
      </div>

    </div>
  );
}
