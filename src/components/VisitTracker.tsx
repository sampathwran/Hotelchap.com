'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function VisitTracker() {
  useEffect(() => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    // Only track once per browser session per day
    const lastVisit = sessionStorage.getItem('hotelchap_lastVisit');

    if (lastVisit !== dateString) {
      trackEvent('visits');
      sessionStorage.setItem('hotelchap_lastVisit', dateString);
    }
  }, []);

  return null;
}
