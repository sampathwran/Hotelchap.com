"use client";

import { useState } from "react";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  if (!isOpen) return null;

  const formatAuthError = (message: string) => {
    if (message.includes("auth/email-already-in-use")) return "This email is already registered. Please log in.";
    if (message.includes("auth/invalid-credential") || message.includes("auth/user-not-found") || message.includes("auth/wrong-password")) return "Invalid email or password.";
    if (message.includes("auth/weak-password")) return "Password should be at least 6 characters.";
    if (message.includes("auth/invalid-email")) return "Please enter a valid email address.";
    return "Authentication failed. Please try again.";
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address first to reset your password.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(formatAuthError(err.message));
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
      const { db } = await import("@/firebase");
      
      const userRef = doc(db, 'users', result.user.uid);
      await setDoc(userRef, {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        lastLoginAt: serverTimestamp(),
      }, { merge: true });
      
      onClose(); // Close modal on success
    } catch (err: any) { setError(formatAuthError(err.message)); } finally {
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
      }
      onClose(); // Close modal on success
    } catch (err: any) { setError(formatAuthError(err.message)); } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left Side: QR Code (Hidden on Mobile) */}
        <div className="hidden md:flex w-2/5 bg-gray-50 flex-col items-center justify-center p-8 border-r border-gray-100 relative overflow-hidden">
          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#673AB7]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <h3 className="text-2xl font-black text-gray-900 mb-2 text-center z-10">Get the App!</h3>
          <p className="text-sm text-gray-500 mb-8 text-center z-10">Scan to download and unlock exclusive mobile-only deals.</p>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 z-10">
            {/* Dummy QR Code */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
              alt="QR Code" 
              className="w-40 h-40 opacity-80 mix-blend-multiply" 
            />
          </div>
          
          <div className="flex gap-3 z-10">
             <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
               <img src="https://www.svgrepo.com/show/475631/apple-color.svg" alt="Apple" className="w-5 h-5 invert" />
             </div>
             <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
               <img src="https://www.svgrepo.com/show/452075/google-play.svg" alt="Google Play" className="w-5 h-5" />
             </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full md:w-3/5 p-8 md:p-12 relative">
          
          <div className="w-full max-w-sm mx-auto">
            
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                {isLogin ? "Welcome back" : "Create account"}
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
            <div className="flex flex-col gap-3 mb-6">
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl font-bold transition shadow-sm disabled:opacity-50 text-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                Continue with Google
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Or email</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
              {!isLogin && (
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
                  required
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
                  required
                />
              </div>
              
              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" onClick={handleForgotPassword} className="text-xs font-bold text-[#673AB7] hover:underline">Forgot password?</a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#673AB7] hover:bg-[#522b94] text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 mt-2 shadow-md hover:shadow-lg disabled:opacity-50 text-sm"
              >
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")} <ArrowRight size={16} />
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-[#673AB7] hover:underline"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>

          </div>
        </div>
        
      </div>
    </div>
  );
}
