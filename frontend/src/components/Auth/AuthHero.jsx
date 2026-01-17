// src/components/AuthHero.jsx
import { Shirt } from 'lucide-react';

export const AuthHero = ({ image }) => (
  <div className="hidden lg:flex w-1/2 relative h-screen sticky top-0">
    <img src={image} alt="Stylist Model" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/30" /> {/* Overlay for text readability */}
    
    <div className="absolute bottom-16 left-16 max-w-md z-10">
      <div className="flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 w-fit">
        <Shirt size={18} className="text-white" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">AI Virtual Try-On</span>
      </div>
      <h1 className="text-5xl font-bold leading-tight mb-4 text-white">
        Redefine your style <br /> with generative AI.
      </h1>
      <p className="text-gray-200 text-lg leading-relaxed opacity-90">
        Experience the future of fashion. Upload your phone and try on hundreds of outfits instantly.
      </p>
    </div>
  </div>
);