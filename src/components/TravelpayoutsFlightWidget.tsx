"use client";

import { useEffect, useRef } from "react";

export default function TravelpayoutsFlightWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear the container to prevent multiple widget injections during React strict mode re-renders
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://tpwidg.com/content?currency=usd&trs=566034&shmarker=769308&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=0&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111";
    script.async = true;
    script.charset = "utf-8";

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-[120px] relative tp-widget-wrapper flex items-center justify-center"
    >
      <style>{`
        /* Attempt to hide Travelpayouts popular/trending destinations sections */
        .tp-widget-wrapper .mewtwo-flights-directions,
        .tp-widget-wrapper .mewtwo-directions,
        .tp-widget-wrapper .mewtwo-popular,
        .tp-widget-wrapper .tp-widget-destinations,
        .tp-widget-wrapper .popular-destinations,
        .tp-widget-wrapper .wayaway-destinations {
          display: none !important;
        }
        
        /* Make the widget look bigger and more premium */
        .tp-widget-wrapper .mewtwo-widget {
          width: 100% !important;
          max-width: 100% !important;
        }
        
                .tp-widget-wrapper input, 
        .tp-widget-wrapper .mewtwo-widget--default .mewtwo-flights-trip-class, 
        .tp-widget-wrapper .mewtwo-widget--default .mewtwo-flights-dates {
          height: 60px !important;
          font-size: 16px !important;
          border-radius: 12px !important;
          border: 1px solid #e5e7eb !important;
        }
        
        .tp-widget-wrapper .mewtwo-widget--default .mewtwo-flights-submit_button {
          height: 60px !important;
          font-size: 18px !important;
          font-weight: 900 !important;
          border-radius: 12px !important;
          background: #673AB7 !important;
          color: white !important;
        }
        
        .tp-widget-wrapper .mewtwo-widget--default .mewtwo-flights-submit_button:hover {
          background: #522b94 !important;
        }
        
        @media (max-width: 768px) {
          .tp-widget-wrapper input, 
          .tp-widget-wrapper .mewtwo-widget--default .mewtwo-flights-trip-class, 
          .tp-widget-wrapper .mewtwo-widget--default .mewtwo-flights-dates {
            height: 48px !important;
            font-size: 14px !important;
          }
          .tp-widget-wrapper .mewtwo-widget--default .mewtwo-flights-submit_button {
            height: 48px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
      {/* The widget will be injected here by the script */}
      <span className="text-gray-400 font-bold animate-pulse absolute -z-10">Loading Flight Deals...</span>
    </div>
  );
}
