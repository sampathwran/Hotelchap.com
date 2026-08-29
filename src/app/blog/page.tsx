"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
}

export default function BlogList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 md:px-10 py-12 mt-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Blog & Guides</h1>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl">
          Discover the best places to visit, tips for your journey, and everything you need to know about traveling in Sri Lanka.
        </p>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No articles published yet. Check back later!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link href={`/blog/${article.id}`} key={article.id} className="group cursor-pointer block">
                <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-4 shadow-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${article.image}')` }}
                  ></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                    {article.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#673AB7] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500">{article.readTime}</p>
              </Link>
            ))}
          </div>
        )}
      </main>

      <MegaFooter />
    </div>
  );
}
