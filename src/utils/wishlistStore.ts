export type WishlistItem = {
  id: string;
  type: "hotel" | "flight" | "attraction" | "package" | "car" | "transfer" | "cruise";
  title: string;
  location: string;
  image: string;
  price: string;
  rating?: number;
};

export const getWishlist = (): WishlistItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("hotelchap_wishlist");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const addToWishlist = (item: WishlistItem) => {
  if (typeof window === "undefined") return;
  const current = getWishlist();
  
  // Prevent duplicates based on ID
  if (!current.some((w) => w.id === item.id)) {
    const updated = [...current, item];
    localStorage.setItem("hotelchap_wishlist", JSON.stringify(updated));
    
    // Dispatch a custom event so UI can update immediately if needed
    window.dispatchEvent(new Event("wishlistUpdated"));
    alert(`${item.title} added to your wishlist! ❤️`);
  } else {
    alert(`${item.title} is already in your wishlist.`);
  }
};

export const removeFromWishlist = (id: string) => {
  if (typeof window === "undefined") return;
  const current = getWishlist();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem("hotelchap_wishlist", JSON.stringify(updated));
  window.dispatchEvent(new Event("wishlistUpdated"));
};

export const isInWishlist = (id: string): boolean => {
  const current = getWishlist();
  return current.some((item) => item.id === id);
};
