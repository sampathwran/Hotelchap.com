import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  try {
    const docRef = doc(db, "blogs", params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: data.seoTitle || data.title,
        description: data.metaDescription || "Read our latest travel blog about Sri Lanka.",
        keywords: data.keywords || "travel, sri lanka, tourism",
        openGraph: {
          images: [data.image],
        },
      }
    }
  } catch (e) {
    console.error(e);
  }
  
  return {
    title: "Article Not Found",
  }
}

export default async function BlogPost({ params }: Props) {
  const docRef = doc(db, "blogs", params.id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 md:px-10 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-8">This article might have been removed or doesn't exist.</p>
          <Link href="/blog" className="text-[#673AB7] hover:underline">
            ← Back to all articles
          </Link>
        </div>
        <MegaFooter />
      </div>
    );
  }
  
  const article = docSnap.data();
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 md:px-10 py-12 mt-16">
        <Link href="/blog" className="text-gray-500 hover:text-[#673AB7] text-sm font-medium mb-6 inline-block">
          ← Back to all articles
        </Link>
        
        <div className="mb-8">
          <span className="text-[#673AB7] font-bold text-sm tracking-wider uppercase mb-2 block">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-500 text-sm">
            {article.readTime} • Published recently
          </p>
        </div>

        <div 
          className="w-full h-64 md:h-96 rounded-3xl mb-12 bg-cover bg-center shadow-lg"
          style={{ backgroundImage: `url('${article.image}')` }}
        ></div>

        <article 
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
      </main>

      <MegaFooter />
    </div>
  );
}
