import { doc, setDoc, increment } from "firebase/firestore";
import { db } from "@/firebase";

export type AnalyticsEvent = 'visits' | 'registered' | 'clicks' | 'searches' | 'wishlist';

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    const today = new Date();
    // Get date string in Sri Lanka / Local timezone or UTC depending on preference. Using local YYYY-MM-DD.
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`; 

    const docRef = doc(db, "daily_analytics", dateString);
    const allTimeRef = doc(db, "all_time_analytics", "totals");

    // Update daily stats
    await setDoc(docRef, {
      [event]: increment(1),
      date: dateString,
      updatedAt: today.getTime(),
    }, { merge: true });

    // Update all-time stats
    await setDoc(allTimeRef, {
      [event]: increment(1),
      updatedAt: today.getTime(),
    }, { merge: true });

  } catch (error) {
    console.error("Error tracking event:", error);
  }
};
