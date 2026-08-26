"use client";

import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useEffect } from 'react';

export default function GoogleOneTap() {
  const { user } = useAuth();
  
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const idToken = credentialResponse.credential;
        if (idToken) {
          const credential = GoogleAuthProvider.credential(idToken);
          await signInWithCredential(auth, credential);
        }
      } catch (error) {
        console.error("Google One Tap login failed:", error);
      }
    },
    onError: () => {
      console.log('Google One Tap Login Failed');
    },
    // Don't show if user is logged in
    disabled: !!user, 
  });

  return null;
}
