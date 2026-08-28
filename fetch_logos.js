const https = require('https');
const fs = require('fs');

const logos = {
  booking: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg",
  agoda: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Agoda_logo.svg",
  expedia: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Expedia_Logo.svg",
  trip: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Trip.com_logo.svg",
  hotels: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Hotels.com_logo.svg"
};

if (!fs.existsSync('public/logos')) {
  fs.mkdirSync('public/logos');
}

for (const [name, url] of Object.entries(logos)) {
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(\public/logos/\.svg\);
      res.pipe(file);
      console.log(\Downloaded \.svg\);
    } else {
      console.log(\Failed \: \\);
      // If 404, we might need a redirect or a different URL
      if (res.statusCode === 301 || res.statusCode === 302) {
          console.log(\Redirect for \ to \\);
      }
    }
  }).on('error', (e) => console.error(e));
}
