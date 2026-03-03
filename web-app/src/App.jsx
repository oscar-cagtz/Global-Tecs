import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, MonitorPlay, Zap, Globe } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [region, setRegion] = useState('USA'); // 'USA', 'CAN', 'MEX'

  // Listen to scroll events to change the navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* 1. APPLE-STYLE NAVBAR */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo area */}
            <div className="flex-shrink-0 cursor-pointer">
              <span className="text-xl font-semibold tracking-tighter">Global-Tecs</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block overflow-x-auto">
              <div className="ml-8 flex items-baseline space-x-6 text-xs font-semibold text-gray-300 uppercase tracking-widest">
                <a href="#live-events" className="hover:text-white transition-colors">Live Events</a>
                <a href="#corporate" className="hover:text-white transition-colors">Corporate</a>
                <a href="#nightlife" className="hover:text-white transition-colors">Nightlife</a>
                <a href="#sports" className="hover:text-white transition-colors">Sports</a>
                <a href="#broadcast" className="hover:text-white transition-colors">Broadcast</a>
                <a href="#advertising" className="hover:text-white transition-colors">Advertising</a>
                <a href="#it-av" className="hover:text-white transition-colors">IT/AV</a>
              </div>
            </div>

            {/* Region Switcher & Mobile Menu button */}
            <div className="flex items-center gap-4">
              {/* Desktop Region Switcher */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                <Globe size={14} className="text-blue-400" />
                <select 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)}
                  className="bg-transparent border-none text-gray-300 text-xs font-medium cursor-pointer focus:ring-0 outline-none appearance-none pr-4"
                  style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right .1rem top 50%', backgroundSize: '.65rem auto' }}
                >
                  <option value="USA" className="bg-zinc-900">USA</option>
                  <option value="CAN" className="bg-zinc-900">CAN</option>
                  <option value="MEX" className="bg-zinc-900">MEX</option>
                </select>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-300 hover:text-white p-2"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              <a href="#live-events" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Live Events</a>
              <a href="#corporate" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Corporate</a>
              <a href="#nightlife" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Nightlife</a>
              <a href="#sports" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Sports</a>
              <a href="#broadcast" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Broadcast</a>
              <a href="#advertising" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Advertising</a>
              <a href="#it-av" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">IT/AV</a>
              
              <div className="flex justify-center items-center gap-2 pt-4 border-t border-white/10 mt-2 text-gray-300">
                <Globe size={18} />
                <select 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)}
                  className="bg-transparent border-none text-lg text-gray-300 cursor-pointer focus:ring-0 outline-none"
                >
                  <option value="USA" className="bg-zinc-900">USA Market</option>
                  <option value="CAN" className="bg-zinc-900">Canada Market</option>
                  <option value="MEX" className="bg-zinc-900">Mexico Market</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image using your generated concert image */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Make sure concert_generated_1.jpg is in the web-app/public folder! */}
          <img 
            src={`${import.meta.env.BASE_URL}concert_generated_1.png`}
            alt="Massive LED Concert Stage" 
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {
              // Fallback to Unsplash if your local image isn't found yet
              e.target.src = "https://images.unsplash.com/photo-1540039155733-d7696d4eb5d4?q=80&w=2074&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 hover:bg-white/20 transition-colors cursor-pointer">
            <Globe size={14} className="text-blue-400"/>
            <span className="text-xs font-medium tracking-wide text-gray-200">
              Viewing projects for: <strong className="text-white">{region}</strong>
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 pb-4 leading-tight">
            Mastering the <br/> Global Stage.
          </h1>
          
          <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light mb-10">
            Pushing the boundaries of live entertainment with zero-compromise LED architecture and immersive production.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300">
              View Our Work
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-white hover:bg-white/10 transition-colors duration-300">
              Explore Tech Specs <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 2.5 TECH SPECS SECTION (The Hardware) */}
      <section className="py-32 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">The Hardware</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Pixel perfect.<br/>Any environment.</h3>
            </div>
            <p className="text-gray-400 text-lg max-w-md pb-2">
              Our fleet of modular LED panels is engineered for maximum brightness and flawless refresh rates, indoors or out.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Spec Card 1 */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-all">
              <h4 className="text-2xl font-bold mb-1">P3.9 Outdoor</h4>
              <p className="text-gray-500 text-sm mb-8">SMD 3IN1 LED Display</p>
              
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-light text-white mb-1">5,000<span className="text-lg text-gray-500 ml-1">nits</span></div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                <div>
                  <div className="text-4xl font-light text-white mb-1">3840<span className="text-lg text-gray-500 ml-1">Hz</span></div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Refresh Rate</div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                <div>
                  <div className="text-4xl font-light text-white mb-1">IP65</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Weather Rating</div>
                </div>
              </div>
            </div>

            {/* Spec Card 2 */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-all">
              <h4 className="text-2xl font-bold mb-1">P4.8 Indoor</h4>
              <p className="text-gray-500 text-sm mb-8">SMD 3IN1 LED Display</p>
              
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-light text-white mb-1">1,200<span className="text-lg text-gray-500 ml-1">nits</span></div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                <div>
                  <div className="text-4xl font-light text-white mb-1">3840<span className="text-lg text-gray-500 ml-1">Hz</span></div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Refresh Rate</div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                <div>
                  <div className="text-4xl font-light text-white mb-1">140°</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Viewing Angle</div>
                </div>
              </div>
            </div>

             {/* Spec Card 3 */}
             <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-900/50 transition-all cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ChevronRight size={24} className="text-gray-400" />
              </div>
              <h4 className="text-xl font-medium mb-2">View All Inventory</h4>
              <p className="text-gray-500 text-sm">Explore P3, P5, Processors, and Rigging equipment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm bg-black">
        <p>© {new Date().getFullYear()} Global-Tecs Production Services. All rights reserved.</p>
      </footer>

    </div>
  );
}