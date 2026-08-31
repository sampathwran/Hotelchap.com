const fs = require('fs');
const path = require('path');
const file = path.join('src', 'app', 'hotel', '[id]', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

const regex = /(const hotel = \{\s*id: hotelId,\s*name: urlName,[\s\S]*?location: "City Center",\s*\};)/;

const replacement = \

  // Add to recently viewed
  useEffect(() => {
    if (hotel.id !== "unknown" && hotel.name !== "Hotel") {
      try {
        const viewedItem = {
          id: hotel.id,
          type: "hotel",
          title: hotel.name,
          location: hotel.location,
          price: "$" + hotel.price,
          image: hotel.image,
          url: window.location.search ? \/hotel/\\\ : \/hotel/\\,
          timestamp: Date.now()
        };
        
        const existingStr = localStorage.getItem('recentlyViewed');
        let existing = [];
        if (existingStr) {
          existing = JSON.parse(existingStr);
        }
        
        // Remove if already exists
        existing = existing.filter((item: any) => item.id !== hotel.id);
        
        // Add to beginning
        existing.unshift(viewedItem);
        
        // Keep only last 10
        if (existing.length > 10) {
          existing = existing.slice(0, 10);
        }
        
        localStorage.setItem('recentlyViewed', JSON.stringify(existing));
      } catch (e) {
        console.error("Failed to save recently viewed", e);
      }
    }
  }, [hotel.id, hotel.name, hotel.price, hotel.image, hotel.location]);;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content, 'utf8');
