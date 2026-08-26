export const mockHotels = [
  {
    id: "1",
    name: "The Grand Horizon Resort & Spa",
    location: "Kollupitiya Road, Colombo",
    address: "No. 282/5, Colpetty, Colombo, Sri Lanka, 00300",
    distance: "1.2 km from center",
    rating: 4.8,
    reviews: 1240,
    starRating: 5,
    price: 150,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
    ],
    highlights: ["Infinity Pool", "Ocean View", "Exceptional Breakfast"],
    aiSummary: "Guests frequently praise the stunning rooftop infinity pool and the panoramic ocean views from the rooms. The staff is highly rated for being accommodating and professional. The location is considered exceptional for exploring the city while maintaining a relaxing atmosphere.",
    description: "Experience luxury and comfort at The Grand Horizon Resort & Spa. Located in the heart of the city, this premium property offers elegance and breathtaking ocean views. Enjoy chic accommodations, a rooftop infinity pool, unique dining experiences, and a serene spa perfect for unwinding after exploring the vibrant surroundings.",
    
    amenities: {
      popular: ["Free WiFi", "Swimming Pool", "Spa & Wellness Center", "Fitness Center", "Restaurant", "Bar"],
      foodAndDrink: ["24-hour Room Service", "Coffee Shop", "Poolside Bar", "Breakfast Buffet"],
      internet: ["Free Wi-Fi in all rooms", "Wi-Fi in public areas"],
      parking: ["Free private parking on-site", "Valet parking"],
      wellness: ["Spa", "Steam room", "Massage", "Fitness center"]
    },

    surroundings: [
      { name: "Kollupitiya Railway Station", distance: "0.2 km", type: "transport" },
      { name: "Galle Face Green", distance: "1.4 km", type: "landmark" },
      { name: "National Museum", distance: "1.6 km", type: "landmark" },
      { name: "Gangaramaya Temple", distance: "2.2 km", type: "landmark" },
      { name: "Dutch Hospital Shopping Precinct", distance: "2.6 km", type: "shopping" }
    ],

    policies: {
      checkIn: "14:00 - 00:00",
      checkOut: "Until 12:00",
      children: "Children of all ages are welcome. Kids under 6 stay free when using existing beds.",
      pets: "Pets are not allowed.",
      payment: "Credit cards and cash accepted at the property."
    },

    roomTypes: [
      {
        id: "rt1",
        name: "Superior Twin City View",
        size: "28 m²",
        beds: "2 single beds",
        guests: 2,
        features: ["City view", "Air conditioning", "Private bathroom", "Free WiFi", "Flat-screen TV", "Mini fridge"],
        image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2000&auto=format&fit=crop",
        basePrice: 150,
        left: 5,
        offers: [
          { type: "Room Only (Non-Refundable)", multiplier: 1.0 },
          { type: "Breakfast Included (Free Cancellation)", multiplier: 1.2 }
        ]
      },
      {
        id: "rt2",
        name: "Deluxe King Sea View",
        size: "33 m²",
        beds: "1 extra-large double bed",
        guests: 2,
        features: ["Ocean view", "Balcony", "Air conditioning", "Private bathroom", "Bathtub", "Free WiFi", "Coffee maker"],
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop",
        basePrice: 210,
        left: 2,
        offers: [
          { type: "Room Only (Non-Refundable)", multiplier: 1.0 },
          { type: "Breakfast Included (Free Cancellation)", multiplier: 1.15 }
        ]
      },
      {
        id: "rt3",
        name: "Premium Family Suite with Terrace",
        size: "55 m²",
        beds: "1 extra-large double bed & 1 sofa bed",
        guests: 4,
        features: ["Ocean view", "Large Terrace", "Separate Living Area", "2 Bathrooms", "Free WiFi", "Premium Toiletries"],
        image: "https://images.unsplash.com/photo-1560185016-bp485a5359a1?q=80&w=2000&auto=format&fit=crop",
        basePrice: 350,
        left: 1,
        offers: [
          { type: "Breakfast Included (Free Cancellation)", multiplier: 1.0 }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Royal Orchid Suites Downtown",
    location: "Downtown, New York",
    address: "123 Broadway, New York, NY 10001, USA",
    distance: "1.2 km from center",
    rating: 4.5,
    reviews: 856,
    starRating: 4,
    price: 180,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
    ],
    highlights: ["Central Location", "Free Breakfast", "Business Center"],
    aiSummary: "Guests love the convenient downtown location, making it easy to walk to major attractions and business centers. The rooms are described as spacious and quiet despite the busy street outside.",
    description: "Perfect for business and leisure. Royal Orchid Suites provides spacious rooms with modern amenities right in the bustling downtown area. Enjoy quick access to public transport, shopping, and world-class dining.",
    amenities: {
      popular: ["Free WiFi", "Fitness Center", "Business Center", "Restaurant"],
      foodAndDrink: ["Restaurant", "Bar"],
      internet: ["Free Wi-Fi in all rooms"],
      parking: ["Paid parking off-site"],
      wellness: ["Fitness center"]
    },
    surroundings: [
      { name: "Times Square", distance: "0.5 km", type: "landmark" },
      { name: "Central Park", distance: "1.5 km", type: "landmark" }
    ],
    policies: {
      checkIn: "15:00 - 00:00",
      checkOut: "Until 11:00",
      children: "Children welcome.",
      pets: "Pets are allowed on request. Charges may apply.",
      payment: "Credit cards only."
    },
    roomTypes: [
      {
        id: "rt1",
        name: "Standard Queen Room",
        size: "22 m²",
        beds: "1 queen bed",
        guests: 2,
        features: ["City view", "Air conditioning", "Private bathroom", "Free WiFi"],
        image: "https://images.unsplash.com/photo-1522771731470-410c5417ab46?q=80&w=2000&auto=format&fit=crop",
        basePrice: 180,
        left: 4,
        offers: [
          { type: "Room Only", multiplier: 1.0 }
        ]
      }
    ]
  }
];
