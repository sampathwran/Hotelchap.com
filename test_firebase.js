const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDiuLmkscXaDJ2gBtOvKMnqhvcnOmWqRsM",
  authDomain: "auth.hotelchap.com",
  projectId: "hotelchap-8926a",
  storageBucket: "hotelchap-8926a.firebasestorage.app",
  messagingSenderId: "649987888032",
  appId: "1:649987888032:web:bfb040f6ef19844bf6cac5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    const cSnap = await getDocs(collection(db, "countries"));
    console.log("Countries count:", cSnap.size);
    cSnap.forEach(doc => console.log(doc.id, doc.data().name));

    const citySnap = await getDocs(collection(db, "cities"));
    console.log("Cities count:", citySnap.size);
    citySnap.forEach(doc => console.log(doc.id, doc.data().name));
  } catch (e) {
    console.error("FIREBASE ERROR:", e.message);
  }
}
test();

