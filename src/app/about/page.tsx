import React from 'react';
import Header from '@/components/Header';
import MegaFooter from '@/components/MegaFooter';
import { Globe, Users, TrendingUp, Lightbulb, Zap, Target } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - HotelChap',
  description: 'Learn more about HotelChap, your ultimate travel companion.',
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#673AB7]/5 z-10 pointer-events-none"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">HotelChap</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed text-justify max-w-3xl mx-auto">
            When travelers are searching for their dream stay or perfect flight, we want the obvious choice to be HotelChap.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-amber-500 font-bold uppercase tracking-wider mb-4 text-sm">Our Mission</h2>
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              We help you find the best place to stay and the best time to go.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed text-justify mb-6">
              We empower travelers to book with confidence, saving them valuable time and money. By aggregating millions of deals across hundreds of platforms, we ensure you always get the absolute best price without the endless searching.
            </p>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
              alt="Travel Planning"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop"
                alt="HotelChap Journey"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-purple-600 font-bold uppercase tracking-wider mb-4 text-sm">Our Story</h2>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                Scaling a simple idea into a global travel companion.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed text-justify mb-6">
                HotelChap started with a simple idea: use technology to solve real user problems and simplify travel booking. Driven by entrepreneurial passion and the goal to become the ultimate experts in travel deals, we built a platform that cuts through the noise.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Always at the forefront of innovation, we continue to leverage cutting-edge tech like AI in our product - launching the world's smartest AI Trip Planner to simplify hotel search and dramatically enhance the user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we do it */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full text-center">
        <h2 className="text-blue-600 font-bold uppercase tracking-wider mb-4 text-sm">How We Do It</h2>
        <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-16 leading-tight max-w-3xl mx-auto">
          We boldly scale winning ideas and unlock innovation.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb size={28} />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">We are fanatic learners</h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              We maintain our competitive edge by remaining curious, failing fast and learning quickly. Challenges and changes are opportunities to unlock new knowledge and innovation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={28} />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Technology is at our core</h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              By embracing cutting-edge technologies and utilizing AI automation, we are committed to solving real user problems in the smartest way, enhancing experiences through data-backed solutions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Target size={28} />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Entrepreneurial passion</h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              We believe in challenging the status quo and experimenting with new ways to tackle our challenges. We aim to simplify complex problems through our tech and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-purple-400 font-bold uppercase tracking-wider mb-4 text-sm">Our Global Footprint</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              By the numbers
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 mb-4">50+</div>
              <h4 className="text-xl font-bold mb-2">Localised Websites</h4>
              <p className="text-gray-400 text-sm">Available in over 30 languages globally.</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 mb-4">50+ M</div>
              <h4 className="text-xl font-bold mb-2">Monthly Users</h4>
              <p className="text-gray-400 text-sm">Helping millions find great deals with simple clicks.</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 mb-4">190</div>
              <h4 className="text-xl font-bold mb-2">Countries</h4>
              <p className="text-gray-400 text-sm">We have an active presence in 190 countries.</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-200 mb-4">100s</div>
              <h4 className="text-xl font-bold mb-2">Partner Sites</h4>
              <p className="text-gray-400 text-sm">We compare prices from hundreds of platforms instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full text-center">
        <h2 className="text-purple-600 font-bold uppercase tracking-wider mb-4 text-sm">Leadership</h2>
        <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
          A team of passionate innovators
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed text-justify max-w-3xl mx-auto mb-16">
          Our dynamic leadership team has deep roots in HotelChap, instrumental in our global growth. Bold and execution-focused, they possess extensive experience across tech, marketing, and operations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-100 shadow-lg relative">
              <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" alt="CEO" fill className="object-cover" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">Alex Mercer</h4>
            <p className="text-purple-600 font-medium">Chief Executive Officer</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-100 shadow-lg relative">
              <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop" alt="CFO" fill className="object-cover" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">Sarah Jenkins</h4>
            <p className="text-purple-600 font-medium">Chief Financial Officer</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-100 shadow-lg relative">
              <Image src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop" alt="CPO" fill className="object-cover" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">David Chen</h4>
            <p className="text-purple-600 font-medium">Chief Product Officer</p>
          </div>
        </div>
      </section>

      <MegaFooter />
    </div>
  );
}
