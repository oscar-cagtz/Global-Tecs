///////////////////////////////////////// IMPORTS /////////////////////////////////////////

// React hook imports:
import {
   useState,
   useEffect
} from 'react';

// Lucide svg icon imports:
import {
   ChevronRight,
   Download,
   Globe,
   Mail,
   MapPin,
   Menu,
   Phone,
   Send,
   X,
   Facebook,
   Instagram,
   Twitter
} from 'lucide-react';

// Global-Tecs logo:
import gtDarkLogo  from './assets/logos/logo_dark.png';
//import gtLightLogo from './assets/logos/logo_light.png'; // Enable if there's any need for a light theme.

/////////////////////////////////////// APPLICATION ///////////////////////////////////////

export default function App() {
   const [isScrolled, setIsScrolled] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [region, setRegion] = useState('CAN'); // 'CAN', 'MEX', 'USA'

   // Listen to scroll events to change the navbar styling
   useEffect(() => {
      const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // Website code divided per section
   return (
      <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
         {/********************************* HEADER / NAVBAR ********************************/}
         <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
               isScrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
            }`}
         >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                  {/****************************** LOGO / TITLE *****************************/}
                  <div className="flex-shrink-0 cursor-pointer flex items-center gap-3 hover:opacity-80 transition-opacity">
                     <img
                        src={gtDarkLogo}
                        alt="Global-Tecs Globe"
                        className="h-8 w-8 object-contain rounded-full" 
                     />
                     <span className="text-xl font-semibold tracking-tighter text-white">Global-Tecs</span>
                  </div>
                  {/*************************** DESKTOP NAVIGATION **************************/}
                  <div className="hidden lg:block overflow-x-auto">
                     <div className="ml-8 flex items-baseline space-x-6 text-xs font-semibold text-gray-300 uppercase tracking-widest">
                        <a href="#live-events" className="hover:text-white transition-colors">Live Events</a>
                        <a href="#corporate"   className="hover:text-white transition-colors">Corporate</a>
                        <a href="#nightlife"   className="hover:text-white transition-colors">Nightlife</a>
                        <a href="#sports"      className="hover:text-white transition-colors">Sports</a>
                        <a href="#broadcast"   className="hover:text-white transition-colors">Broadcast</a>
                        <a href="#advertising" className="hover:text-white transition-colors">Advertising</a>
                        <a href="#it-av"       className="hover:text-white transition-colors">IT/AV </a>
                     </div>
                  </div>
                  {/****************** REGION SWITCHER / MOBILE MENU BUTTON *****************/}
                  <div className="flex items-center gap-4">
                     {/*********************** DESKTOP REGION SWITCHER **********************/}
                     <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                        <Globe size={14} className="text-blue-400" />
                        <select
                           value={region}
                           onChange={(e) => setRegion(e.target.value)}
                           className="bg-transparent border-none text-gray-300 text-xs font-medium cursor-pointer focus:ring-0 outline-none appearance-none pr-4"
                           style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right .1rem top 50%', backgroundSize: '.65rem auto' }}
                        >
                           <option value="CAN" className="bg-zinc-900">CAN</option>
                           <option value="MEX" className="bg-zinc-900">MEX</option>
                           <option value="USA" className="bg-zinc-900">USA</option>
                        </select>
                     </div>
                     {/*********************** MOBILE MENU BUTTON ***********************/}
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
            {/************************** MOBILE NAVIGATION DROPDOWN *************************/}
            {mobileMenuOpen && (
               <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 absolute w-full">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                     <a href="#live-events" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Live Events</a>
                     <a href="#corporate"   className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Corporate</a>
                     <a href="#nightlife"   className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Nightlife</a>
                     <a href="#sports"      className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Sports</a>
                     <a href="#broadcast"   className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Broadcast</a>
                     <a href="#advertising" className="block px-3 py-3 text-gray-300 hover:text-white text-lg">Advertising</a>
                     <a href="#it-av"       className="block px-3 py-3 text-gray-300 hover:text-white text-lg">IT/AV</a>
              
                     <div className="flex justify-center items-center gap-2 pt-4 border-t border-white/10 mt-2 text-gray-300">
                        <Globe size={18} />
                        <select
                           value={region}
                           onChange={(e) => setRegion(e.target.value)}
                           className="bg-transparent border-none text-lg text-gray-300 cursor-pointer focus:ring-0 outline-none"
                        >
                           <option value="CAN" className="bg-zinc-900">Canada</option>
                           <option value="MEX" className="bg-zinc-900">Mexico</option>
                           <option value="USA" className="bg-zinc-900">USA</option>
                        </select>
                     </div>
                  </div>
               </div>
            )}
         </nav>
         {/********************************** HERO SECTION **********************************/}
         <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/****************************** BACKGROUND IMAGE *******************************/}
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${import.meta.env.BASE_URL}hero_bg.png`}
                  alt="Massive LED Concert Stage"
                  className="w-full h-full object-cover opacity-50"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1540039155733-d7696d4eb5d4?q=80&w=2074&auto=format&fit=crop" }}
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
                  <a href="#contact" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300">
                     Start a Project
                  </a>
                  <a href="#hardware" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-white hover:bg-white/10 transition-colors duration-300">
                     Explore Tech Specs <ChevronRight size={20} />
                  </a>
               </div>
            </div>
         </section>
         {/************************************ PRODUCTS ************************************/}
         <section id="hardware" className="py-16 md:py-32 bg-black relative border-t border-white/5">
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

               <div className="space-y-12 md:space-y-20">
                  {/********************* OUTDOOR LED SCREENS *********************/}
                  <div>
                     <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                        <h4 className="text-2xl font-bold text-white">Outdoor LED Screens</h4>
                        <span className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 rounded">IP65 Rated</span>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Outdoor Spec Card 1 */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all flex flex-col">
                           <div className="w-full aspect-square bg-zinc-800/30 rounded-2xl mb-6 flex items-center justify-center p-6 border border-white/5">
                              <img src={`${import.meta.env.BASE_URL}led_screen_1.png`} alt="P3.9 Outdoor LED" className="w-full h-full object-contain drop-shadow-2xl opacity-80" />
                           </div>
                           <h5 className="text-2xl font-bold mb-1">P3.9 Outdoor</h5>
                           <p className="text-gray-500 text-sm mb-8">SMD 1921 High-Bright</p>
                           <div className="space-y-6 flex-1">
                              <div>
                                 <div className="text-4xl font-light text-white mb-1">5,000<span className="text-lg text-gray-500 ml-1">nits</span></div>
                                 <div className="text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                              </div>
                              <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                              <div>
                                 <div className="text-4xl font-light text-white mb-1">3840<span className="text-lg text-gray-500 ml-1">Hz</span></div>
                                 <div className="text-xs text-gray-400 uppercase tracking-wider">Refresh Rate</div>
                              </div>
                           </div>
                           <a href="/specs/P3.9_Outdoor_Specs.pdf" download className="mt-8 w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                              <Download size={18} /> Download Specs
                           </a>
                        </div>

                        {/* Outdoor Spec Card 2 */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all flex flex-col">
                           <div className="w-full aspect-square bg-zinc-800/30 rounded-2xl mb-6 flex items-center justify-center p-6 border border-white/5">
                              <img src={`${import.meta.env.BASE_URL}led_screen_1.png`} alt="P4.8 Outdoor LED" className="w-full h-full object-contain drop-shadow-2xl opacity-80" />
                           </div>
                           <h5 className="text-2xl font-bold mb-1">P4.8 Outdoor</h5>
                           <p className="text-gray-500 text-sm mb-8">SMD 2727 Heavy Duty</p>
                           <div className="space-y-6 flex-1">
                              <div>
                                 <div className="text-4xl font-light text-white mb-1">6,000<span className="text-lg text-gray-500 ml-1">nits</span></div>
                                 <div className="text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                              </div>
                              <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                              <div>
                                 <div className="text-4xl font-light text-white mb-1">3840<span className="text-lg text-gray-500 ml-1">Hz</span></div>
                                 <div className="text-xs text-gray-400 uppercase tracking-wider">Refresh Rate</div>
                              </div>
                           </div>
                           <a href="/specs/P4.8_Outdoor_Specs.pdf" download className="mt-8 w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                              <Download size={18} /> Download Specs
                           </a>
                        </div>

                        {/* View All Outdoor */}
                        <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-900/50 transition-all cursor-pointer group">
                           <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <ChevronRight size={24} className="text-gray-400" />
                           </div>
                           <h5 className="text-xl font-medium mb-2">View All Outdoor</h5>
                           <p className="text-gray-500 text-sm">Explore touring, festival, and structural LED.</p>
                        </div>
                     </div>
                  </div>

                  {/********************* INDOOR LED SCREENS *********************/}
                  <div>
                     <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                        <h4 className="text-2xl font-bold text-white">Indoor LED Screens</h4>
                        <span className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 rounded">High-Res & Broadcast</span>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Indoor Spec Card 1 */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all flex flex-col">
                           <div className="w-full aspect-square bg-zinc-800/30 rounded-2xl mb-6 flex items-center justify-center p-6 border border-white/5">
                              <img src={`${import.meta.env.BASE_URL}led_screen_2.png`} alt="P2.6 Indoor LED" className="w-full h-full object-contain drop-shadow-2xl opacity-80" />
                           </div>
                           <h5 className="text-2xl font-bold mb-1">P2.6 Indoor</h5>
                           <p className="text-gray-500 text-sm mb-8">SMD 1515 Ultra Fine</p>
                           <div className="space-y-6 flex-1">
                              <div>
                                 <div className="text-4xl font-light text-white mb-1">1,200<span className="text-lg text-gray-500 ml-1">nits</span></div>
                                 <div className="text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                              </div>
                              <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                              <div>
                                 <div className="text-4xl font-light text-white mb-1">3840<span className="text-lg text-gray-500 ml-1">Hz</span></div>
                                 <div className="text-xs text-gray-400 uppercase tracking-wider">Refresh Rate</div>
                              </div>
                           </div>
                           <a href="/specs/P2.6_Indoor_Specs.pdf" download className="mt-8 w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                              <Download size={18} /> Download Specs
                           </a>
                        </div>

                        {/* Indoor Spec Card 2 */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all flex flex-col">
                           <div className="w-full aspect-square bg-zinc-800/30 rounded-2xl mb-6 flex items-center justify-center p-6 border border-white/5">
                              <img src={`${import.meta.env.BASE_URL}led_screen_2.png`} alt="P3.9 Indoor LED" className="w-full h-full object-contain drop-shadow-2xl opacity-80" />
                           </div>
                           <h5 className="text-2xl font-bold mb-1">P3.9 Indoor</h5>
                           <p className="text-gray-500 text-sm mb-8">SMD 2020 Black Face</p>
                           <div className="space-y-6 flex-1">
                              <div>
                                 <div className="text-4xl font-light text-white mb-1">1,000<span className="text-lg text-gray-500 ml-1">nits</span></div>
                                 <div className="text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                              </div>
                              <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                              <div>
                                 <div className="text-4xl font-light text-white mb-1">140°</div>
                                 <div className="text-xs text-gray-400 uppercase tracking-wider">Viewing Angle</div>
                              </div>
                           </div>
                           <a href="/specs/P3.9_Indoor_Specs.pdf" download className="mt-8 w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                              <Download size={18} /> Download Specs
                           </a>
                        </div>

                        {/* View All Indoor */}
                        <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-900/50 transition-all cursor-pointer group">
                           <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <ChevronRight size={24} className="text-gray-400" />
                           </div>
                           <h5 className="text-xl font-medium mb-2">View All Indoor</h5>
                           <p className="text-gray-500 text-sm">Explore corporate, broadcast, and curved LED.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/************************************ ABOUT US ************************************/}
         <section id="about" className="py-16 md:py-32 bg-black relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Gallery: Apple-Style Bento Box */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-32">
                  {/* Large Featured Highlight */}
                  <div className="md:col-span-2 aspect-[4/3] md:aspect-auto rounded-3xl overflow-hidden relative group border border-white/10">
                     {/* Replace src with your local gallery image */}
                     <img 
                        src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop" 
                        alt="Massive Festival Stage" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                        <div>
                           <p className="text-blue-400 font-semibold tracking-wider text-xs uppercase mb-2">Featured Installation</p>
                           <h4 className="text-3xl font-bold text-white">Stadium Tours & Festivals</h4>
                        </div>
                     </div>
                  </div>

                  {/* Right Column: Stacked Highlights */}
                  <div className="flex flex-col gap-6">
                     <div className="flex-1 rounded-3xl overflow-hidden relative group border border-white/10 aspect-square md:aspect-auto">
                        {/* Replace src with your local gallery image */}
                        <img 
                           src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" 
                           alt="Corporate Event" 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6">
                           <h4 className="text-xl font-bold text-white">Corporate Summits</h4>
                        </div>
                     </div>
                     
                     <div className="flex-1 rounded-3xl overflow-hidden relative group bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-800 transition-colors cursor-pointer aspect-square md:aspect-auto">
                        <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                           <ChevronRight size={28} className="text-blue-500" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">View Full Portfolio</h4>
                        <p className="text-gray-400 text-sm">See all global installations.</p>
                     </div>
                  </div>
               </div>

               {/* About Us Company Info */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                     <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">About Global-Tecs</h2>
                     <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Redefining live production architecture.</h3>
                     <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Founded with a singular vision to bridge the gap between creative ambition and technical execution, we have grown into North America's premier LED and production house. We don't just supply gear; we engineer experiences.
                     </p>
                     
                     {/* Data Stats */}
                     <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                        <div>
                           <div className="text-5xl font-light text-white mb-2">15<span className="text-blue-500">+</span></div>
                           <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Years Experience</div>
                        </div>
                        <div>
                           <div className="text-5xl font-light text-white mb-2">500<span className="text-blue-500">+</span></div>
                           <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Stages Built</div>
                        </div>
                     </div>
                  </div>

                  {/* Glassmorphism Mission Card */}
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-8 lg:p-12 backdrop-blur-xl shadow-2xl">
                     <Globe size={120} className="text-white/5 absolute -top-10 -right-10 pointer-events-none" />
                     <h4 className="text-2xl font-bold mb-4 text-white">Our Mission</h4>
                     <p className="text-gray-300 mb-8 leading-relaxed">
                        To deliver zero-compromise visual experiences that elevate the world's most demanding artists, brands, and broadcasts across the globe.
                     </p>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                           <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div> 
                           <span className="font-medium">Engineering Excellence</span>
                        </li>
                        <li className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                           <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div> 
                           <span className="font-medium">Turnkey Global Logistics</span>
                        </li>
                        <li className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                           <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div> 
                           <span className="font-medium">Flawless Live Execution</span>
                        </li>
                     </ul>
                  </div>
               </div>

            </div>
         </section>
         {/************************************ CONTACTS ************************************/}
         <section id="contact" className="py-16 md:py-32 bg-black relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Section Header */}
               <div className="text-center mb-16">
                  <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">Get In Touch</h2>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Let's build your next stage.</h3>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                     Whether you need a large-scale stadium-sized LED package or a custom corporate setup, our team is ready to deploy through North America.
                  </p>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
                  {/* Left Column: Contact Information Cards */}
                  <div className="space-y-6">
                     {/* Contact Card 1 */}
                     <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex items-start gap-6 hover:bg-zinc-900/80 transition-colors">
                        <div className="p-4 bg-blue-500/10 rounded-2xl flex-shrink-0">
                           <Mail className="text-blue-500" size={24} />
                        </div>
                        <div>
                           <h4 className="text-white font-medium text-lg mb-1">Sales & Inquiries</h4>
                           <p className="text-gray-400 text-sm mb-2">Drop us an email, and we'll reply within 24 hours.</p>
                           <a href="mailto:info@global-tecs.com" className="text-white hover:text-blue-400 transition-colors">info@global-tecs.com</a>
                        </div>
                     </div>

                     {/* Contact Card 2 */}
                     <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex items-start gap-6 hover:bg-zinc-900/80 transition-colors">
                        <div className="p-4 bg-blue-500/10 rounded-2xl flex-shrink-0">
                           <Phone className="text-blue-500" size={24} />
                        </div>
                        <div className="w-full">
                           <h4 className="text-white font-medium text-lg mb-4">Give us a call</h4>
                           <div className="space-y-3">
                              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                 <span className="flex items-center gap-2 text-gray-400 text-sm font-medium">🇨🇦 CANADA</span>
                                 <div className="text-right">
                                    <a href="tel:+17785516808" className="text-white hover:text-blue-400 transition-colors block text-sm mb-1">+1 (778) 551 6808</a>
                                    <a href="tel:+16045059359" className="text-white hover:text-blue-400 transition-colors block text-sm">+1 (604) 505 9359</a>
                                 </div>
                              </div>
                              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                 <span className="flex items-center gap-2 text-gray-400 text-sm font-medium">🇺🇸 USA</span>
                                 <a href="tel:+17736283154" className="text-white hover:text-blue-400 transition-colors text-sm">+1 (773) 628 3154</a>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="flex items-center gap-2 text-gray-400 text-sm font-medium">🇲🇽 MEXICO</span>
                                 <a href="tel:+524612906582" className="text-white hover:text-blue-400 transition-colors text-sm">+52 (461) 290 6582</a>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Contact Card 3 */}
                     <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex items-start gap-6 hover:bg-zinc-900/80 transition-colors">
                        <div className="p-4 bg-blue-500/10 rounded-2xl flex-shrink-0">
                           <MapPin className="text-blue-500" size={24} />
                        </div>
                        <div>
                           <h4 className="text-white font-medium text-lg mb-1">Our Location</h4>
                           <p className="text-gray-400 text-sm mb-2">Headquarters</p>
                           <p className="text-white text-sm leading-relaxed">Delta BC Vancouver,<br/>British Columbia, Canada.</p>
                        </div>
                     </div>

                     {/* Contact Card 4 */}
                     <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex items-start gap-6 hover:bg-zinc-900/80 transition-colors">
                        <div className="p-4 bg-blue-500/10 rounded-2xl flex-shrink-0">
                           <Instagram className="text-blue-500" size={24} />
                        </div>
                        <div>
                           <h4 className="text-white font-medium text-lg mb-1">Follow Us</h4>
                           <p className="text-gray-400 text-sm mb-3">@globaltecscanada</p>
                           <div className="flex gap-4">
                              <a
                                 href="https://www.instagram.com/globaltecscanada"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="bg-white/5 p-2 rounded-lg text-white hover:bg-[#E1306C] hover:text-white transition-all"
                              >
                                 <Instagram size={20} />
                              </a>
                              <a
                                 href="https://www.facebook.com/globaltecscanada"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="bg-white/5 p-2 rounded-lg text-white hover:bg-[#1877F2] hover:text-white transition-all"
                              >
                                 <Facebook size={20} />
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* Right Column: Glassmorphism Contact Form */}
                  <div className="bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col h-full">
                     <form className="space-y-6 flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           {/* First Name */}
                           <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-400">First Name</label>
                              <input
                                 type="text"
                                 placeholder="Write your name"
                                 className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                              />
                           </div>
                           {/* Last Name */}
                           <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-400">Last Name</label>
                                 <input
                                    type="text"
                                    placeholder="Write your last name"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                 />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           {/* Email */}
                           <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-400">Email Address</label>
                              <input
                                 type="email"
                                 placeholder="Write your e-mail"
                                 className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                              />
                           </div>
                           {/* Phone Number */}
                           <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-400">Phone Number</label>
                              <input
                                 type="tel"
                                 placeholder="Write your phone number"
                                 className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                              />
                           </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-2 flex-1 flex flex-col">
                           <label className="text-sm font-medium text-gray-400">Message</label>
                           <textarea
                              placeholder="Write your message..."
                              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none flex-1"
                           ></textarea>
                        </div>
                        {/* Submit Button */}
                        <button
                           type="submit"
                           className="w-full bg-white text-black font-medium rounded-xl px-4 py-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                           SEND MESSAGE <Send size={18} />
                        </button>
                        <p className="text-xs text-gray-500 text-center mt-4">
                           By submitting this form, you agree to our privacy policy.
                        </p>
                     </form>
                  </div>
               </div>
            </div>
         </section>
         {/************************************* FOOTER *************************************/}
         <footer className="border-t border-white/10 py-12 text-center text-gray-500 text-sm bg-black">
            <div className="flex flex-col items-center justify-center gap-4">
               <img
                  src={gtDarkLogo}
                  alt="Logo"
                  className="h-20 w-20 opacity-50 grayscale"
                  onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=GT&background=000000&color=ffffff&rounded=true" }}
               />
               <p>© {new Date().getFullYear()} Global-Tecs Production Services. All rights reserved.</p>
            </div>
         </footer>
      </div>
  );
}