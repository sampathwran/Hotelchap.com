
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/firebase";
import { Lock, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validCode, setValidCode] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!oobCode || mode !== "resetPassword") {
      setError("Invalid or missing password reset code.");
      setVerifying(false);
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setEmail(email);
        setValidCode(true);
      })
      .catch((err) => {
        setError("This password reset link has expired or is invalid. Please request a new one.");
      })
      .finally(() => {
        setVerifying(false);
      });
  }, [oobCode, mode]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await confirmPasswordReset(auth, oobCode!, newPassword);
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-[#673AB7] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Verifying reset link...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Password Reset Successful!</h2>
        <p className="text-gray-500 mb-6">Your password has been changed successfully. You can now log in with your new password.</p>
        <Link href="/" className="bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 rounded-xl font-bold transition shadow-md">
          Go to Homepage
        </Link>
      </div>
    );
  }

  if (!validCode) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
        <XCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Invalid Link</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Link href="/" className="bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 rounded-xl font-bold transition shadow-md">
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Create New Password</h2>
        <p className="text-gray-500 text-sm">
          Enter a new password for <span className="font-bold text-gray-700">{email}</span>
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
            required
          />
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#673AB7] focus:ring-1 focus:ring-[#673AB7] transition"
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#673AB7] hover:bg-[#522b94] text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 mt-4 shadow-md disabled:opacity-50 text-sm"
        >
          {loading ? "Updating..." : "Reset Password"} <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
