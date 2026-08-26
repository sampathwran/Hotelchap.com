"use client";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "John D.",
      type: "Verified Traveler",
      avatar: "https://i.pravatar.cc/150?u=1",
      review: "Saved over $200 on my flight to London! The price comparison feature is incredibly fast and found a deal I couldn't see anywhere else.",
      rating: 5,
      date: "2 days ago"
    },
    {
      name: "Sarah M.",
      type: "Verified Traveler",
      avatar: "https://i.pravatar.cc/150?u=2",
      review: "Booked my honeymoon in the Maldives through HotelChap. The AI Trip Planner gave us the perfect itinerary, and the hotel was exactly as described.",
      rating: 5,
      date: "1 week ago"
    },
    {
      name: "David K.",
      type: "Verified Traveler",
      avatar: "https://i.pravatar.cc/150?u=3",
      review: "I travel for business constantly. The interface is clean, no annoying popups, and I always get the cheapest rates. Highly recommended.",
      rating: 5,
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="w-full px-4 md:px-10 py-20 bg-gray-50 border-t border-gray-100 mt-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-gray-900 mb-4">What our travelers say</h2>
        <p className="text-gray-500 max-w-xl mx-auto">Real experiences from people who booked their dream trips using HotelChap.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {reviews.map((rev, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(rev.rating)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="text-gray-700 leading-relaxed mb-8 italic">"{rev.review}"</p>
            </div>
            
            <div className="flex items-center gap-4">
              <img src={rev.avatar} alt={rev.name} className="w-12 h-12 rounded-full border-2 border-gray-100" />
              <div>
                <h4 className="font-bold text-gray-900">{rev.name}</h4>
                <p className="text-xs text-gray-500">{rev.type} • {rev.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
