"use client";

export default function TravelBlog() {
  const articles = [
    {
      title: "Top 10 Hidden Gems in Bali",
      category: "Guides",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000",
    },
    {
      title: "How to Travel Europe on a Budget",
      category: "Tips & Tricks",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000",
    },
    {
      title: "Best Luxury Resorts in the Maldives",
      category: "Luxury",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000",
    }
  ];

  return (
    <div className="w-full px-4 md:px-10 mt-16 mb-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Inspired</h2>
          <p className="text-gray-500">Travel guides, tips, and stories to inspire your next adventure.</p>
        </div>
        <button className="text-[#673AB7] font-bold hover:underline hidden md:block">Read all articles →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-4 shadow-sm">
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
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 md:hidden">
        Read all articles
      </button>
    </div>
  );
}
