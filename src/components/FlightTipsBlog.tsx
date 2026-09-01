"use client";

import { useEffect, useState, useRef } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FlightTipsBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => { if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); };
  const scrollRight = () => { if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' }); };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("type", "==", "flight")
        );
        const snapshot = await getDocs(q);
        const fetchedBlogs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        })
        .slice(0, 3);
        
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching flight blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-8 md:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">Travel Tips & Inspiration</h2>
              <p className="text-gray-500 font-medium text-xs md:text-base">Read our latest guides before you fly</p>
            </div>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-[#673AB7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // If no blogs yet, render a fallback or nothing. We will render empty state to match UI
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-8 md:py-16 border-t border-gray-100">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Travel Tips & Inspiration</h2>
            <p className="text-gray-500 font-medium">Read our latest guides before you fly</p>
          </div>
          <Link href="/blog" className="text-[#673AB7] font-bold hover:underline flex items-center gap-1">
            Read all posts <ArrowRight size={18} />
          </Link>
        </div>

                
        <div className="relative group">
          <button onClick={scrollLeft} className="absolute left-0 top-[40%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-800 flex md:hidden items-center justify-center shadow-md ml-1 opacity-90">&lt;</button>
          <button onClick={scrollRight} className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-800 flex md:hidden items-center justify-center shadow-md mr-1 opacity-90">&gt;</button>
        <div ref={scrollRef} className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 md:gap-8 pb-6 md:pb-0 snap-x snap-mandatory hide-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-start">
              <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.image || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <p className="text-sm font-bold text-[#673AB7] mb-2">{blog.category}</p>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">{blog.title}</h3>
                  <p className="text-gray-500 font-medium text-sm line-clamp-3">
                    {blog.metaDescription || "Discover everything you need to know before you embark on your journey with our comprehensive travel guide."}
                  </p>
                  <p className="text-gray-400 text-xs mt-auto pt-4">{blog.readTime}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
