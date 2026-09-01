"use client";

import { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
}

export default function TravelBlog() {
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };


  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(6));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Article[];
        
        setArticles(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="w-full px-4 md:px-10 mt-16 mb-16 text-center text-gray-500">Loading articles...</div>;
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-4 md:px-10 mt-10 md:mt-16 mb-10 md:mb-16">
      
      <div className="flex justify-between items-end mb-6 md:mb-8">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Get Inspired</h2>
          <p className="text-xs md:text-sm text-gray-500">Travel guides, tips, and stories to inspire your next adventure.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-2 mr-4">
            <button onClick={scrollLeft} className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-50 transition font-bold">&lt;</button>
            <button onClick={scrollRight} className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-50 transition font-bold">&gt;</button>
          </div>
          <Link href="/blog" className="text-[#673AB7] font-bold hover:underline hidden md:block">
            Read all articles &rarr;
          </Link>
        </div>
      </div>

      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory hide-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {articles.map((article) => (
          <Link href={`/blog/${article.id}`} key={article.id} className="min-w-[85%] sm:min-w-[calc(50%-12px)] md:min-w-[calc(33.333%-16px)] flex-shrink-0 snap-start group cursor-pointer block">

            <div className="relative h-44 md:h-60 w-full rounded-2xl overflow-hidden mb-3 md:mb-4 shadow-sm">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${article.image}')` }}
              ></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                {article.category}
              </div>
            </div>
            <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-[#673AB7] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">{article.readTime}</p>
          </Link>
        ))}
      </div>
      
      <Link href="/blog" className="w-full mt-4 md:mt-6 py-2 md:py-3 border border-gray-200 rounded-xl font-bold text-sm md:text-base text-gray-700 md:hidden flex justify-center items-center">
        Read all articles
      </Link>
    </div>
  );
}
