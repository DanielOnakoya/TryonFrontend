import React from 'react';
import { Shirt, Heart, ChevronRight } from 'lucide-react';  
import { Link } from 'react-router-dom';
// import styles from "./Home.module.css";

export default function Home  ()  {
  return (
    <div className="min-h-screen bg-[#130d1e] text-white font-sans p-6 md:p-12 selection:bg-purple-500 selection:text-white">
      
      {/* Maximum width container to center content like the screenshot */}
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* --- Header --- */}
        <header className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#9f3bf6] rounded-full flex items-center justify-center">
            {/* Simple logo representation */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#7c2ae8] to-[#bd6bf9]"></div>
          </div>
          <h1 className="text-lg font-bold tracking-wide">
            AI VIRTUAL <span className="font-normal text-gray-300">Try-On</span>
          </h1>
        </header>

        {/* --- Hero Section --- */}
        <section className="relative bg-[#1e1629] rounded-[2.5rem] p-8 md:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-purple-900/10">
          {/* Subtle background gradient effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#2a2139] to-[#1a1225] opacity-50 z-0 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 max-w-lg">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1]">
                Experience Fashion Without the Fitting Room.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Upload your photo and try on an outfit instantly. Using advanced AI maps we incorporate fabric textures and lighting for a realistic look.
              </p>
              
             <Link to="/TryOn" className="w-full block">
              <button onClick={() => navigate("/tryon")} className="mt-4 bg-[#8b2cf5] hover:bg-[#7a25d9] transition-colors text-white font-semibold py-4 px-8 rounded-full flex items-center gap-3 shadow-lg shadow-purple-600/30">
                <Shirt className="w-5 h-5" />
                <span>Start Virtual Try-On</span>
              </button>
              </Link>
            </div>

            {/* Right Image */}
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                alt="Woman wearing yellow shirt" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* --- Quick Access Section --- */}
        <section>
          <h3 className="text-xl font-bold mb-6">Quick Access</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Saved Styles Card */}
            <div className="bg-[#1e1629] rounded-[2rem] p-0 flex overflow-hidden h-64 hover:bg-[#251b33] transition-colors cursor-pointer group">
              
              {/* Text Content */}
              <div className="w-1/2 p-8 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-[#bd6bf9] fill-[#bd6bf9]" />
                    <span className="font-bold text-lg">Saved Styles</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Access your generated looks. Your creations have been saved.
                  </p>
                </div>
                
                <Link to="/wardrobe" className="flex items-center gap-1 text-sm font-semibold text-white group-hover:text-[#bd6bf9] transition-colors">
                  Open Wardrobe <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Image Content */}
              <div className="w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e1629] to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop" 
                  alt="Clothes on a rack" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Placeholder for a second card if needed, currently empty to match layout width logic */}
            {/* You could add a "History" or "Settings" card here */}
          </div>
        </section>

      </div>
    </div>
  );
};

