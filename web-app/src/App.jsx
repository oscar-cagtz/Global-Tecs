////////////////////////////////////////////////// IMPORTS //////////////////////////////////////////////////

// React hook imports:
import {
   useState,
   useEffect,
   useRef
} from 'react';

// Lucide svg icon imports:
import {
   Calculator,
   ChevronLeft,
   ChevronRight,
   Download,
   Facebook,
   Globe,
   Instagram,
   Mail,
   Map as MapIcon,
   MapPin,
   Menu,
   MonitorPlay,
   Phone,
   Send,
   Twitter,
   Wrench,
   X
} from 'lucide-react';

// Global-Tecs logo:
const BASE_URL = import.meta.env.BASE_URL;
import gtDarkLogo  from './assets/logos/logo_dark.webp';
//import gtLightLogo from './assets/logos/logo_light.ebp'; // Enable if there's any need for a light theme.

///////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////
function WIPPage({ title }) {
   return (
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
         <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900/20 to-black"></div>
         <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20">
               <Wrench size={40} className="text-blue-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
               {title}
            </h1>
            <h2 className="text-2xl text-blue-400 font-medium tracking-widest uppercase mb-8">
               Under Construction
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
               We are currently compiling the gallery and case studies for our {title} division. Please check back soon to see our latest global installations.
            </p>
         </div>
      </section>
   );
}

function ProjectCard({ title, description, images }) {
   const scrollRef = useRef(null);
   const [selectedImage, setSelectedImage] = useState(null);

   if (!images || images.length === 0) return null;

   const scroll = (direction) => {
      if (scrollRef.current && typeof scrollRef.current.offsetWidth === 'number') {
         const { current } = scrollRef;
         // Scroll by exactly one thumbnail width roughly
         const scrollAmount = direction === 'left' ? -(current.offsetWidth / 1.5) : (current.offsetWidth / 1.5);
         current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
   };

   return (
      <div className="bg-zinc-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-10 mb-12 flex flex-col gap-6 lg:gap-8">
         {/* Top: Project Info */}
         <div className="w-full max-w-4xl space-y-4">
            <h3 className="text-3xl lg:text-4xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{description}</p>
         </div>
         
         {/* Bottom: Horizontal Image Carousel with locked Square Thumbnails */}
         <div className="relative w-full group mt-2">
            {/* Left Arrow */}
            <button
               onClick={() => scroll('left')}
               className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center shadow-xl"
            >
               <ChevronLeft size={24} />
            </button>

            {/* Thumbnails Track: Added items-center to stop vertical stretching bug */}
            <div 
               ref={scrollRef}
               className="flex items-center overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
               {images.map((img, idx) => (
                  <div 
                     key={idx} 
                     onClick={() => setSelectedImage(img)}
                     // Locked widths (w-56, w-64, w-72) to prevent the "ginormous" sizing bug
                     className="w-56 sm:w-64 md:w-72 shrink-0 snap-start aspect-square rounded-2xl overflow-hidden border border-white/10 relative cursor-pointer hover:border-white/30 transition-all shadow-lg"
                  >
                     <img 
                        src={img} 
                        alt={`${title} - Gallery Thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                     />
                  </div>
               ))}
            </div>

            {/* Right Arrow */}
            <button
               onClick={() => scroll('right')}
               className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center shadow-xl"
            >
               <ChevronRight size={24} />
            </button>
         </div>

         {/* Lightbox Modal for Full Screen Image */}
         {selectedImage && (
            <div 
               className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
               onClick={() => setSelectedImage(null)}
            >
               <button 
                  className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition-colors z-50"
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
               >
                  <X size={24} />
               </button>
               <img 
                  src={selectedImage} 
                  alt="Full screen preview" 
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  onClick={(e) => e.stopPropagation()} 
               />
            </div>
         )}
      </div>
   );
}

function StageConfigurator({ isOpen, onClose }) {
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300">
         <div className="bg-zinc-900 border border-white/10 w-full max-w-5xl h-[85vh] rounded-3xl p-6 md:p-10 relative flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <button 
               onClick={onClose} 
               className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full transition-colors z-10"
            >
               <X size={24}/>
            </button>
            <div className="relative z-10 flex-1 flex flex-col">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Stage Configurator</h2>
               <p className="text-gray-400 mb-8 max-w-xl">
                  Select your environment, map your dimensions, and get instant technical telemetry for your next production build.
               </p>
               
               {/* Mockup UI Canvas */}
               <div className="flex-1 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center bg-zinc-950/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-center text-gray-500 relative z-10">
                     <Calculator size={48} className="mx-auto mb-4 opacity-50 text-blue-500" />
                     <h3 className="text-xl font-medium text-white mb-2">WORK IN PROGRESS</h3>
                     <p className="max-w-md mx-auto text-sm leading-relaxed">
                        This area will house the dynamic visualizer. Sliders will update the screen geometry in real-time, calculating resolution, weight, and power draw instantly.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

function GlobalMap() {
   // Track which map node the user is hovering over to show the tooltip
   const [activeLocation, setActiveLocation] = useState(null);

   // Define the deployment locations with approximate X and Y coordinates (percentages)
   // Top Left (0,0) to Bottom Right (100, 100)
   const locations = [
      { id: 'vancouver',   city: "Vancouver, BC",   region: "Canada", x: 28, y: 16, project: "Ferrari F80 Presentation", img: `${BASE_URL}/gallery/home/featured_ferrari.webp` },
      { id: 'ptovallarta', city: "Puerto Vallarta", region: "Mexico", x: 43, y: 87, project: "Mexico Open at Vidanta",   img: `${BASE_URL}/gallery/home/featured_vidanta.webp` },
      { id: 'cdmx',        city: "Mexico City",     region: "Mexico", x: 47, y: 91, project: "Las Revanchas al Zocalo",  img: `${BASE_URL}/gallery/home/featured_revanchas.webp` },
   ];

   return (
      // Removed overflow-hidden from the section
      <section className="py-24 bg-black relative border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">Global Reach</h2>
               <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Deployed across North America.</h3>
            </div>
            
            {/* Outer Map Container - NO clipping allowed here so tooltips break out perfectly */}
            <div className="relative w-full max-w-5xl mx-auto aspect-[4/3] md:aspect-[21/9]">
               
               {/* Background Layer - Clipped with rounded corners */}
               <div className="absolute inset-0 bg-zinc-900/30 rounded-3xl border border-white/10 overflow-hidden shadow-2xl pointer-events-none">
                  <div className="absolute inset-0 z-0">
                     <img 
                        src={`${BASE_URL}/gallery/home/map_north_america.webp`}
                        alt="North America Map Background"
                        className="w-full h-full object-cover opacity-80 mix-blend-lighten"
                        onError={(e) => { 
                           e.target.src = "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"; 
                           e.target.className = "w-full h-full object-cover opacity-20 grayscale mix-blend-lighten";
                        }}
                     />
                  </div>
                  <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 pointer-events-none"></div>
               </div>

               {/* Interactive Dots Layer - Laid ON TOP of the clipped background */}
               <div className="absolute inset-0 z-10">
                  {locations.map((loc) => (
                     <div 
                        key={loc.id}
                        className="absolute z-10"
                        style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                        onMouseEnter={() => setActiveLocation(loc.id)}
                        onMouseLeave={() => setActiveLocation(null)}
                     >
                        <div className="relative flex items-center justify-center cursor-pointer">
                           <div className={`absolute w-4 h-4 rounded-full bg-blue-500/40 animate-ping ${activeLocation === loc.id ? 'opacity-100' : 'opacity-50'}`}></div>
                           <div className={`relative w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)] transition-all duration-300 ${activeLocation === loc.id ? 'scale-150 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]' : ''}`}></div>
                           
                           {/* The Tooltip - Now free to overlap titles and borders */}
                           <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 md:w-64 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl transition-all duration-300 pointer-events-none ${activeLocation === loc.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
                              <div className="w-full h-24 md:h-28 rounded-xl overflow-hidden mb-3 border border-white/5">
                                 <img src={loc.img} alt={loc.city} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-blue-400 text-xs font-semibold tracking-wider uppercase mb-1">{loc.region}</p>
                              <h4 className="text-white font-bold text-lg leading-tight mb-1">{loc.city}</h4>
                              <p className="text-gray-400 text-xs truncate">{loc.project}</p>
                              
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/10 drop-shadow-lg"></div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-zinc-950/90 drop-shadow-lg -mt-[1px]"></div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
               Hover over the glowing hubs to view major deployment regions.
            </p>
         </div>
      </section>
   );
}

function PixelVisualizer() {
   const [distance, setDistance] = useState(3); // Default 3 meters
   const [pitch, setPitch] = useState(4.8); // Default P4.8

   // The Real-World Math: 1mm pitch = ~1m optimal viewing distance.
   const optimalDistance = pitch;
   const isClose = distance < optimalDistance;
   
   // Calculate how visible the black gaps between LEDs should be based on distance
   const effectStrength = isClose ? (optimalDistance - distance) / optimalDistance : 0; 
   
   // Grid size simulates the physical diodes getting bigger in your field of view as you step closer
   const gridSize = pitch * (6 / distance); 
   const gridOpacity = effectStrength * 0.85; // Max 85% opacity for the black grid lines

   return (
      <div className="mb-24 bg-zinc-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-12 overflow-hidden relative">
         <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
            {/* Controls */}
            <div className="flex-1 space-y-8 w-full">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <MonitorPlay className="text-blue-500" size={28} />
                     <h4 className="text-2xl md:text-3xl font-bold text-white">Pixel Pitch Simulator</h4>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                     Pixel Pitch determines optimal viewing distance. Select a panel type and slide to simulate standing closer to the screen. Notice the "screen door effect" when you get too close.
                  </p>
               </div>
               
               <div className="bg-black/50 border border-white/10 rounded-2xl p-6 space-y-6">
                  {/* Pitch Selector */}
                  <div>
                     <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3 block">Select Panel Pitch</label>
                     <div className="flex gap-4">
                        <button 
                           onClick={() => setPitch(2.6)}
                           className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${pitch === 2.6 ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-zinc-900 border-white/10 text-gray-400 hover:border-white/30'}`}
                        >
                           P2.6 (Indoor)
                        </button>
                        <button 
                           onClick={() => setPitch(4.8)}
                           className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${pitch === 4.8 ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-zinc-900 border-white/10 text-gray-400 hover:border-white/30'}`}
                        >
                           P4.8 (Outdoor)
                        </button>
                     </div>
                  </div>

                  {/* Distance Slider */}
                  <div>
                     <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-blue-400 uppercase mb-4">
                        <span>1m (Close)</span>
                        <span className="text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">Viewing Distance: {distance}m</span>
                        <span>10m (Far)</span>
                     </div>
                     <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        step="0.5"
                        value={distance} 
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                     />
                  </div>
               </div>
            </div>
            
            {/* Visualizer Display */}
            <div className="flex-1 w-full aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
               {/* Base Stage Image */}
               <img 
                  src={`${BASE_URL}/gallery/home/toucan_example.webp`}
                  alt="Visualizer Demo" 
                  className="w-full h-full object-cover transition-transform duration-100 origin-center"
                  style={{ transform: `scale(${1 + (effectStrength * 0.15)})` }}
               />
               
               {/* Dynamic CSS Grid simulating the physical LED mask gaps */}
               <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-100 mix-blend-multiply"
                  style={{ 
                     backgroundImage: `linear-gradient(to right, rgba(0,0,0,1) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(0,0,0,1) 1.5px, transparent 1.5px)`,
                     backgroundSize: `${gridSize}px ${gridSize}px`,
                     opacity: gridOpacity
                  }}
               ></div>
               
               {/* Status Badge */}
               <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 text-xs text-white font-medium flex items-center gap-2 shadow-xl">
                  <div className={`w-2 h-2 rounded-full ${isClose ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'}`}></div>
                  {isClose ? 'Grid Visible (Sub-Optimal)' : 'Image Clear (Optimal)'}
               </div>
            </div>
         </div>
      </div>
   );
}

/////////////////////////////////////////////////// PAGES ///////////////////////////////////////////////////

function LiveEventsPage({ region }) {
   // OACG: Dummy line to prevent unused variable warning for 'region'.
   console.log("Live Events section active for region:", region);

   // This array makes it incredibly easy to add new projects later
   const eventsProjects = [
      {
         title: "Circles Music Festival",
         description: "The most important Native Festival in Vancouver, showing all their followers the meaning of their culture and giving music with the best artist of the country.",
         images: [
            `${BASE_URL}/gallery/liveevents/project_circles.webp`,
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #2",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #3",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      }
   ];

   return (
      <div className="bg-black min-h-screen pt-16"> {/* pt-16 offsets the fixed navbar */}
         {/* Mini Hero Section */}
         <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${BASE_URL}/gallery/liveevents/hero_liveevents.webp`}
                  alt="Live Events Hero"
                  className="w-full h-full object-cover opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                  LIVE EVENTS
               </h1>
               <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                  Global-tecs has been working on Live Events for many years, music festivals, big forums, sports events, with audio, lighting and video. Give us a chance and we will make your shoe stand out from the rest.
               </p>
            </div>
         </section>

         {/* Projects Section */}
         <section className="pt-12 pb-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-16">
                  <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">LIVE EVENTS</h2>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Recent Projects</h3>
               </div>
               
               {/* Maps through the array and renders a ProjectCard for each one */}
               {eventsProjects.map((proj, idx) => (
                  <ProjectCard
                     key={idx}
                     title={proj.title}
                     description={proj.description}
                     images={proj.images}
                  />
               ))}
            </div>
         </section>
      </div>
   );
}

function CorporatePage({ region }) {
   // OACG: Dummy line to prevent unused variable warning for 'region'.
   console.log("Corporate section active for region:", region);

   // This array makes it incredibly easy to add new projects later
   const eventsProjects = [
      {
         title: "Nutcracker Gala by Red Racer Beer",
         description: "The Nutcracker Gala is a fundraiser that help to fight against autism. We are part of this social event featuring RED RACER BEER, brand that is always worried and continuing helping to have a better world.",
         images: [
            `${BASE_URL}/gallery/corporate/project_nutcracker.webp`,
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #2",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #3",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      }
   ];

   return (
      <div className="bg-black min-h-screen pt-16"> {/* pt-16 offsets the fixed navbar */}
         {/* Mini Hero Section */}
         <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${BASE_URL}/gallery/corporate/hero_corporate.webp`}
                  alt="Corporate Hero"
                  className="w-full h-full object-cover opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                  CORPORATE
               </h1>
               <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                  We have a a full-service production management, as we know how corporate shows work, clean and perfect, basing on that we continuing innovating to give the best experience to our clients.
               </p>
            </div>
         </section>

         {/* Projects Section */}
         <section className="pt-12 pb-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-16">
                  <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">CORPORATE</h2>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Recent Projects</h3>
               </div>
               
               {/* Maps through the array and renders a ProjectCard for each one */}
               {eventsProjects.map((proj, idx) => (
                  <ProjectCard
                     key={idx}
                     title={proj.title}
                     description={proj.description}
                     images={proj.images}
                  />
               ))}
            </div>
         </section>
      </div>
   );
}

function NightlifePage({ region }) {
   // OACG: Dummy line to prevent unused variable warning for 'region'.
   console.log("Nightlife section active for region:", region);

   // This array makes it incredibly easy to add new projects later
   const eventsProjects = [
      {
         title: "Studio Night Club",
         description: "Studio Night Club is one of best night clubs at Vancouver Downtown. We build, install and program Led Displays and Lighting for the club, this one perform and always keep innovating.",
         images: [
            `${BASE_URL}/gallery/nightlife/project_studion.webp`,
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #2",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #3",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      }
   ];

   return (
      <div className="bg-black min-h-screen pt-16"> {/* pt-16 offsets the fixed navbar */}
         {/* Mini Hero Section */}
         <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${BASE_URL}/gallery/nightlife/hero_nightlife.webp`}
                  alt="Nightlife Hero"
                  className="w-full h-full object-cover opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                  NIGHTLIFE
               </h1>
               <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                  Global-tecs know that lighting has the ability to enhance your creation to become the star of the show. That's why we are constantly working to bring you the best talent and equipment our industry has to offer.
               </p>
            </div>
         </section>

         {/* Projects Section */}
         <section className="pt-12 pb-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-16">
                  <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">NIGHTLIFE</h2>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Recent Projects</h3>
               </div>
               
               {/* Maps through the array and renders a ProjectCard for each one */}
               {eventsProjects.map((proj, idx) => (
                  <ProjectCard
                     key={idx}
                     title={proj.title}
                     description={proj.description}
                     images={proj.images}
                  />
               ))}
            </div>
         </section>
      </div>
   );
}

function SportsPage({ region }) {
   // OACG: Dummy line to prevent unused variable warning for 'region'.
   console.log("Section active for region:", region);

   // This array makes it incredibly easy to add new projects later
   const sportsProjects = [
      {
         title: "Mexico Open at Vidanta (PGA TOUR)",
         description: "The PGA TOUR is the world's leading golf league all over the world. The Mexico Open At Vidanta edition is the one that host the best level of golfers and took place at Vidanta Riviera Nayarit.",
         images: [
            `${BASE_URL}/gallery/sports/vidantaopen/vidantaopen1.webp`,
            `${BASE_URL}/gallery/sports/vidantaopen/vidantaopen2.webp`,
            `${BASE_URL}/gallery/sports/vidantaopen/vidantaopen3.webp`,
            `${BASE_URL}/gallery/sports/vidantaopen/vidantaopen4.webp`
         ]
      },
      {
         title: "Las Revanchas at Zocalo, Mexico City",
         description: "Las Revanchas at Zocalo in Mexico City is one of the best shows we have been involved, celebrating the dual year with GERMANY-MEXICO. We convert the center of this city on a big stadium with a big production.",
         images: [
            `${BASE_URL}/gallery/sports/project_revanchas.webp`,
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "Softball World Cup",
         description: "As you know we love sports world, and we were happy of being part of this incredible world cup altogether with Hob Cast Media, being ultra wide requiered of special softwares, and specific control.",
         images: [
            `${BASE_URL}/gallery/sports/project_softball.webp`,
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      }
   ];

   return (
      <div className="bg-black min-h-screen pt-16"> {/* pt-16 offsets the fixed navbar */}
         {/* Mini Hero Section */}
         <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${BASE_URL}/gallery/sports/hero_sports.webp`}
                  alt="Sports Arena"
                  className="w-full h-full object-cover opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>
            
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                  SPORTS
               </h1>
               <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                  Elevating the fan experience with high-refresh, broadcast-ready LED displays engineered for stadiums, arenas, and global tournaments.
               </p>
            </div>
         </section>

         {/* Projects Section */}
         <section className="pt-12 pb-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-16">
                  <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">SPORTS</h2>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Recent Projects</h3>
               </div>
               
               {/* Maps through the array and renders a ProjectCard for each one */}
               {sportsProjects.map((proj, idx) => (
                  <ProjectCard
                     key={idx}
                     title={proj.title}
                     description={proj.description}
                     images={proj.images}
                  />
               ))}
            </div>
         </section>
      </div>
   );
}

function BroadcastPage({ region }) {
   // OACG: Dummy line to prevent unused variable warning for 'region'.
   console.log("Broadcast section active for region:", region);

   // This array makes it incredibly easy to add new projects later
   const eventsProjects = [
      {
         title: "EXAMPLE #1",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #2",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #3",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      }
   ];

   return (
      <div className="bg-black min-h-screen pt-16"> {/* pt-16 offsets the fixed navbar */}
         {/* Mini Hero Section */}
         <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${BASE_URL}/gallery/broadcast/hero_broadcast.webp`}
                  alt="Broadcast Hero"
                  className="w-full h-full object-cover opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                  BROADCAST
               </h1>
               <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                  It's not just have the cameras, audio and lighting. We also have the experienced team that will make it work together. Let Global-tecs make the magic on your hybrid show.
               </p>
            </div>
         </section>

         {/* Projects Section */}
         <section className="pt-12 pb-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-16">
                  <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">BROADCAST</h2>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Recent Projects</h3>
               </div>
               
               {/* Maps through the array and renders a ProjectCard for each one */}
               {eventsProjects.map((proj, idx) => (
                  <ProjectCard
                     key={idx}
                     title={proj.title}
                     description={proj.description}
                     images={proj.images}
                  />
               ))}
            </div>
         </section>
      </div>
   );
}

function AdvertisingPage({ region }) {
   // OACG: Dummy line to prevent unused variable warning for 'region'.
   console.log("Advertising section active for region:", region);

   // This array makes it incredibly easy to add new projects later
   const eventsProjects = [
      {
         title: "Central City Brewery Liquor Store",
         description: "Central City Brewery Liquor Store, use the video wall as an advertising mode seasonally. By this way the image and presence of the shop keep growing as the best liquor store on their zone.",
         images: [
            `${BASE_URL}/gallery/advertising/project_centralc.webp`,
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "UCA University",
         description: "This University ask us to make a permanent installation for them, advertising and giving a new image for their school, making it being one of the best of the city.",
         images: [
            `${BASE_URL}/gallery/advertising/project_uca.webp`,
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #3",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      }
   ];

   return (
      <div className="bg-black min-h-screen pt-16"> {/* pt-16 offsets the fixed navbar */}
         {/* Mini Hero Section */}
         <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${BASE_URL}/gallery/advertising/hero_advertising.webp`}
                  alt="Advertising Hero"
                  className="w-full h-full object-cover opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                  ADVERTISING
               </h1>
               <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                  Global-tecs has the knowledge and knowhow for the sales and rental of quality screens, and provide highly efficient after sales service. Many firms, tradesmen, craftsmen, concessionaires also appeal to our experience.
               </p>
            </div>
         </section>

         {/* Projects Section */}
         <section className="pt-12 pb-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-16">
                  <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">ADVERTISING</h2>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Recent Projects</h3>
               </div>
               
               {/* Maps through the array and renders a ProjectCard for each one */}
               {eventsProjects.map((proj, idx) => (
                  <ProjectCard
                     key={idx}
                     title={proj.title}
                     description={proj.description}
                     images={proj.images}
                  />
               ))}
            </div>
         </section>
      </div>
   );
}

function ITAVPage({ region }) {
   // OACG: Dummy line to prevent unused variable warning for 'region'.
   console.log("IT/AV section active for region:", region);

   // This array makes it incredibly easy to add new projects later
   const eventsProjects = [
      {
         title: "Hootsuite MX",
         description: "Dream Field Solutions is the company that let us being part of the installation of IT/AV on the new Hootsuite Mexico Office. By this we continuing growing on different branches of the market.",
         images: [
            `${BASE_URL}/gallery/itav/project_hootsuite.webp`,
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #2",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      },
      {
         title: "EXAMPLE #3",
         description: "Lorem Ipsum Dolor Sit Amet",
         images: [
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
         ]
      }
   ];

   return (
      <div className="bg-black min-h-screen pt-16"> {/* pt-16 offsets the fixed navbar */}
         {/* Mini Hero Section */}
         <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${BASE_URL}/gallery/itav/hero_itav.webp`}
                  alt="ITAV Hero"
                  className="w-full h-full object-cover opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                  IT/AV
               </h1>
               <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                  You need a hand with you IT/AV operations? Let Global-tecs help you with that. Our team have the knowledge and the tools to make it work easier.
               </p>
            </div>
         </section>

         {/* Projects Section */}
         <section className="pt-12 pb-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-16">
                  <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">IT/AV</h2>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Recent Projects</h3>
               </div>
               
               {/* Maps through the array and renders a ProjectCard for each one */}
               {eventsProjects.map((proj, idx) => (
                  <ProjectCard
                     key={idx}
                     title={proj.title}
                     description={proj.description}
                     images={proj.images}
                  />
               ))}
            </div>
         </section>
      </div>
   );
}

function HomePage({ region }) {
   const [showConfigurator, setShowConfigurator] = useState(false);

   return (
      <>
         {/********************************** HERO SECTION **********************************/}
         <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/****************************** BACKGROUND IMAGE *******************************/}
            <div className="absolute inset-0 z-0 bg-black">
               <img
                  src={`${BASE_URL}/gallery/home/hero_bg.webp`}
                  alt="Massive LED Concert Stage"
                  className="w-full h-full object-cover opacity-70"
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
                  <button 
                     onClick={() => setShowConfigurator(true)} 
                     className="bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300"
                  >
                     Stage Configuration
                  </button>
                  <a href="#hardware" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-white hover:bg-white/10 transition-colors duration-300">
                     Explore LED Displays <ChevronRight size={20} />
                  </a>
               </div>
            </div>
         </section>
         
         {/******************************* TRUSTED BY / PARTNERS *****************************/}
         <section className="py-16 md:py-24 bg-black relative border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
               <h2 className="text-center text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">Trusted By</h2>
               <h3 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-white">Powering the world's biggest stages.</h3>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full flex overflow-hidden">
               {/* Left/Right Fade Gradients (Apple style) */}
               <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
               <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

               {/* Animated Track */}
               <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                  {/* First Set of Logos */}
                  <div className="flex shrink-0 gap-16 md:gap-32 items-center px-8 md:px-16">
                     <img src={`${BASE_URL}/partner_logos/logo_alazraki.webp`} alt="Alazraki S"  className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_azteca.webp`}   alt="TV Azteca"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_centralc.webp`} alt="Central C"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_gorgo.webp`}    alt="Gorgomish"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_gracies.webp`}  alt="Gracies"     className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_lba.webp`}      alt="LBA"         className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_ocesa.webp`}    alt="OCESA"       className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_open.webp`}     alt="Mexico Open" className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_pga.webp`}      alt="PGA"         className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_redracer.webp`} alt="Redracer"    className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_salinas.webp`}  alt="G Salinas"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_smt.webp`}      alt="SMT"         className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_studionc.webp`} alt="Studio NC"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_tec.webp`}      alt="Tec de MTY"  className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_vidanta.webp`}  alt="Vidanta"     className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                  {/* Second Set (Exact Duplicate for seamless loop illusion) */}
                  <div className="flex shrink-0 gap-16 md:gap-32 items-center px-8 md:px-16">
                     <img src={`${BASE_URL}/partner_logos/logo_alazraki.webp`} alt="Alazraki S"  className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_azteca.webp`}   alt="TV Azteca"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_centralc.webp`} alt="Central C"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_gorgo.webp`}    alt="Gorgomish"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_gracies.webp`}  alt="Gracies"     className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_lba.webp`}      alt="LBA"         className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_ocesa.webp`}    alt="OCESA"       className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_open.webp`}     alt="Mexico Open" className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_pga.webp`}      alt="PGA"         className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_redracer.webp`} alt="Redracer"    className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_salinas.webp`}  alt="G Salinas"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_smt.webp`}      alt="SMT"         className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_studionc.webp`} alt="Studio NC"   className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_tec.webp`}      alt="Tec de MTY"  className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                     <img src={`${BASE_URL}/partner_logos/logo_vidanta.webp`}  alt="Vidanta"     className="h-12 md:h-20 w-auto object-contain shrink-0 opacity-50 brightness-0 invert hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
               </div>
            </div>
         </section>

         {/******************************* GLOBAL MAP INSTALLS *******************************/}
         <GlobalMap />

         {/************************************ PRODUCTS *************************************/}
         <section id="hardware" className="py-16 md:py-32 bg-black relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                  <div>
                     <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">The Hardware</h2>
                     <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Pixel perfect.<br/>Any environment.</h3>
                  </div>
                  <p className="text-gray-400 text-lg max-w-md pb-2">
                     Our fleet of modular LED panels is engineered for maximum brightness and flawless refresh rates, indoors or out.
                  </p>
               </div>

               <PixelVisualizer />

               <div className="space-y-20">
                  {/********************* OUTDOOR LED SCREENS *********************/}
                  <div>
                     <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                        <h4 className="text-2xl font-bold text-white">Outdoor LED Screens</h4>
                        <span className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 rounded">IP65 Rated</span>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Outdoor Spec Card 1 */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-5 lg:p-6 hover:border-zinc-700 transition-all flex flex-row lg:flex-col gap-5 lg:gap-0">
                           <div className="w-1/3 lg:w-full shrink-0 aspect-square bg-zinc-800/30 rounded-2xl mb-0 lg:mb-6 flex items-center justify-center p-3 lg:p-6 border border-white/5 h-fit">
                              <img src={`${BASE_URL}/gallery/home/led_screen_1.webp`} alt="P3.9 Outdoor LED" className="w-full h-full object-contain drop-shadow-2xl opacity-80" />
                           </div>
                           <div className="flex flex-col flex-1">
                              <h5 className="text-xl lg:text-2xl font-bold mb-1">P3.9 Outdoor</h5>
                              <p className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-8">SMD 1921 High-Bright</p>
                              <div className="space-y-3 lg:space-y-6 flex-1">
                                 <div>
                                    <div className="text-2xl lg:text-4xl font-light text-white mb-0.5 lg:mb-1">5,000<span className="text-sm lg:text-lg text-gray-500 ml-1">nits</span></div>
                                    <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                                 </div>
                                 <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                                 <div>
                                    <div className="text-2xl lg:text-4xl font-light text-white mb-0.5 lg:mb-1">3840<span className="text-sm lg:text-lg text-gray-500 ml-1">Hz</span></div>
                                    <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">Refresh Rate</div>
                                 </div>
                              </div>
                              <a href="/specs/P3.9_Outdoor_Specs.pdf" download className="mt-5 lg:mt-8 w-full bg-white text-black font-semibold py-2.5 lg:py-3.5 text-sm lg:text-base rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                                 <Download className="w-4 h-4 lg:w-[18px] lg:h-[18px]" /> Download Specs
                              </a>
                           </div>
                        </div>

                        {/* Outdoor Spec Card 2 */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-5 lg:p-6 hover:border-zinc-700 transition-all flex flex-row lg:flex-col gap-5 lg:gap-0">
                           <div className="w-1/3 lg:w-full shrink-0 aspect-square bg-zinc-800/30 rounded-2xl mb-0 lg:mb-6 flex items-center justify-center p-3 lg:p-6 border border-white/5 h-fit">
                              <img src={`${BASE_URL}/gallery/home/led_screen_1.webp`} alt="P4.8 Outdoor LED" className="w-full h-full object-contain drop-shadow-2xl opacity-80" />
                           </div>
                           <div className="flex flex-col flex-1">
                              <h5 className="text-xl lg:text-2xl font-bold mb-1">P4.8 Outdoor</h5>
                              <p className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-8">SMD 2727 Heavy Duty</p>
                              <div className="space-y-3 lg:space-y-6 flex-1">
                                 <div>
                                    <div className="text-2xl lg:text-4xl font-light text-white mb-0.5 lg:mb-1">6,000<span className="text-sm lg:text-lg text-gray-500 ml-1">nits</span></div>
                                    <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                                 </div>
                                 <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                                 <div>
                                    <div className="text-2xl lg:text-4xl font-light text-white mb-0.5 lg:mb-1">3840<span className="text-sm lg:text-lg text-gray-500 ml-1">Hz</span></div>
                                    <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">Refresh Rate</div>
                                 </div>
                              </div>
                              <a href="/specs/P4.8_Outdoor_Specs.pdf" download className="mt-5 lg:mt-8 w-full bg-white text-black font-semibold py-2.5 lg:py-3.5 text-sm lg:text-base rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                                 <Download className="w-4 h-4 lg:w-[18px] lg:h-[18px]" /> Download Specs
                              </a>
                           </div>
                        </div>

                        <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-3xl p-5 lg:p-8 flex flex-row lg:flex-col items-center justify-start lg:justify-center text-left lg:text-center hover:bg-zinc-900/50 transition-all cursor-pointer group gap-5 lg:gap-0">
                           <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-full bg-zinc-800 flex items-center justify-center lg:mb-4 group-hover:scale-110 transition-transform">
                              <ChevronRight className="text-gray-400 w-5 h-5 lg:w-[24px] lg:h-[24px]" />
                           </div>
                           <div>
                              <h5 className="text-lg lg:text-xl font-medium mb-1 lg:mb-2">View All Outdoor</h5>
                              <p className="text-gray-500 text-xs lg:text-sm">Explore touring, festival, and structural LED.</p>
                           </div>
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
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-5 lg:p-6 hover:border-zinc-700 transition-all flex flex-row lg:flex-col gap-5 lg:gap-0">
                           <div className="w-1/3 lg:w-full shrink-0 aspect-square bg-zinc-800/30 rounded-2xl mb-0 lg:mb-6 flex items-center justify-center p-3 lg:p-6 border border-white/5 h-fit">
                              <img src={`${BASE_URL}/gallery/home/led_screen_2.webp`} alt="P2.6 Indoor LED" className="w-full h-full object-contain drop-shadow-2xl opacity-80" />
                           </div>
                           <div className="flex flex-col flex-1">
                              <h5 className="text-xl lg:text-2xl font-bold mb-1">P2.6 Indoor</h5>
                              <p className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-8">SMD 1515 Ultra Fine</p>
                              <div className="space-y-3 lg:space-y-6 flex-1">
                                 <div>
                                    <div className="text-2xl lg:text-4xl font-light text-white mb-0.5 lg:mb-1">1,200<span className="text-sm lg:text-lg text-gray-500 ml-1">nits</span></div>
                                    <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                                 </div>
                                 <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                                 <div>
                                    <div className="text-2xl lg:text-4xl font-light text-white mb-0.5 lg:mb-1">3840<span className="text-sm lg:text-lg text-gray-500 ml-1">Hz</span></div>
                                    <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">Refresh Rate</div>
                                 </div>
                              </div>
                              <a href="/specs/P2.6_Indoor_Specs.pdf" download className="mt-5 lg:mt-8 w-full bg-white text-black font-semibold py-2.5 lg:py-3.5 text-sm lg:text-base rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                                 <Download className="w-4 h-4 lg:w-[18px] lg:h-[18px]" /> Download Specs
                              </a>
                           </div>
                        </div>
                        {/* Indoor Spec Card 2 */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-5 lg:p-6 hover:border-zinc-700 transition-all flex flex-row lg:flex-col gap-5 lg:gap-0">
                           <div className="w-1/3 lg:w-full shrink-0 aspect-square bg-zinc-800/30 rounded-2xl mb-0 lg:mb-6 flex items-center justify-center p-3 lg:p-6 border border-white/5 h-fit">
                              <img src={`${BASE_URL}/gallery/home/led_screen_2.webp`} alt="P3.9 Indoor LED" className="w-full h-full object-contain drop-shadow-2xl opacity-80" />
                           </div>
                           <div className="flex flex-col flex-1">
                              <h5 className="text-xl lg:text-2xl font-bold mb-1">P3.9 Indoor</h5>
                              <p className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-8">SMD 2020 Black Face</p>
                              <div className="space-y-3 lg:space-y-6 flex-1">
                                 <div>
                                    <div className="text-2xl lg:text-4xl font-light text-white mb-0.5 lg:mb-1">1,000<span className="text-sm lg:text-lg text-gray-500 ml-1">nits</span></div>
                                    <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">Peak Brightness</div>
                                 </div>
                                 <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                                 <div>
                                    <div className="text-2xl lg:text-4xl font-light text-white mb-0.5 lg:mb-1">140°</div>
                                    <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">Viewing Angle</div>
                                 </div>
                              </div>
                              <a href="/specs/P3.9_Indoor_Specs.pdf" download className="mt-5 lg:mt-8 w-full bg-white text-black font-semibold py-2.5 lg:py-3.5 text-sm lg:text-base rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                                 <Download className="w-4 h-4 lg:w-[18px] lg:h-[18px]" /> Download Specs
                              </a>
                           </div>
                        </div>
                        <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-3xl p-5 lg:p-8 flex flex-row lg:flex-col items-center justify-start lg:justify-center text-left lg:text-center hover:bg-zinc-900/50 transition-all cursor-pointer group gap-5 lg:gap-0">
                           <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-full bg-zinc-800 flex items-center justify-center lg:mb-4 group-hover:scale-110 transition-transform">
                              <ChevronRight className="text-gray-400 w-5 h-5 lg:w-[24px] lg:h-[24px]" />
                           </div>
                           <div>
                              <h5 className="text-lg lg:text-xl font-medium mb-1 lg:mb-2">View All Indoor</h5>
                              <p className="text-gray-500 text-xs lg:text-sm">Explore corporate, broadcast, and curved LED.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/************************************ ABOUT US *************************************/}
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
                           <h4 className="text-3xl font-bold text-white">VidantaWorld Concert Series</h4>
                        </div>
                     </div>
                  </div>

                  {/* Right Column: Stacked Highlights */}
                  <div className="flex flex-col gap-6">
                     <div className="flex-1 rounded-3xl overflow-hidden relative group border border-white/10 aspect-video md:aspect-auto">
                        <img 
                           src={`${BASE_URL}/gallery/home/featured_ferrari.webp`}
                           alt="Corporate Event" 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                           onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6">
                           <h4 className="text-xl font-bold text-white">Ferrari F80 Release</h4>
                        </div>
                     </div>
                     <div className="flex-1 rounded-3xl overflow-hidden relative group bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-800 transition-colors cursor-pointer aspect-video md:aspect-auto">
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
                        As a company with more than 35 years in show-business, we have extensive experience in the entertainment industry. Our trajectory is the
                        result of the work carried out in productions for renowned artists in some of the most important venues in Mexico, Canada and the USA.
                        In addition we have been suppliers to some of the most important production companies of shows in those countries. We produce and deliver
                        High Audio, Lighting and Video Technologies for events. From the planning to execution we create an unforgettable sensory experiences.
                     </p>
                     
                     {/* Data Stats */}
                     <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                        <div>
                           <div className="text-5xl font-light text-white mb-2">35<span className="text-blue-500">+</span></div>
                           <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Years Experience</div>
                        </div>
                        <div>
                           <div className="text-5xl font-light text-white mb-2">200<span className="text-blue-500">+</span></div>
                           <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Stages Built</div>
                        </div>
                     </div>
                  </div>

                  {/* Glassmorphism Mission & Vision Card */}
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-8 lg:p-12 backdrop-blur-xl shadow-2xl flex flex-col gap-8">
                     <Globe size={120} className="text-white/5 absolute -top-10 -right-10 pointer-events-none" />
                     
                     {/* Mission Section */}
                     <div className="relative z-10">
                        <h4 className="text-2xl font-bold mb-4 text-white">Our Mission</h4>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                           To deliver zero-compromise visual experiences that elevate the world's most demanding artists, brands, and broadcasts across the globe.
                        </p>
                        <ul className="space-y-4">
                           <li className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div> 
                              <span className="font-medium">Engineering Excellence</span>
                           </li>
                           <li className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div> 
                              <span className="font-medium">Turnkey International Logistics</span>
                           </li>
                           <li className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div> 
                              <span className="font-medium">Flawless Live Execution</span>
                           </li>
                        </ul>
                     </div>

                     {/* Divider */}
                     <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

                     {/* Vision Section */}
                     <div className="relative z-10">
                        <h4 className="text-2xl font-bold mb-4 text-white">Our Vision</h4>
                        <p className="text-gray-300 leading-relaxed">
                           To be an international standard in immersive stage architecture, relentlessly pushing the boundaries of what is visually possible in live entertainment.
                        </p>
                     </div>
                  </div>
               </div>

            </div>
         </section>
         
         {/************************************ CONTACTS *************************************/}
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

         <StageConfigurator isOpen={showConfigurator} onClose={() => setShowConfigurator(false)} />
      </>
   );
}

///////////////////////////////////////////// APPLICATION SHELL /////////////////////////////////////////////

export default function App() {
   // Define the state constants for application activity.
   const [currentPage, setCurrentPage] = useState('home');
   
   const [isScrolled, setIsScrolled] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [region, setRegion] = useState('CAN'); // 'CAN', 'MEX', 'USA'

   // Listen to scroll events to change the navbar styling.
   useEffect(() => {
      const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // Helper function to handle navigation cleanly
   const navigateTo = (page) => {
      setCurrentPage(page);
      setMobileMenuOpen(false); // Close mobile menu if open
      window.scrollTo(0, 0); // Scroll to top of new page
   };

   // Switch statement to point to the new pages.
   const renderPage = () => {
      switch(currentPage) {
         case 'home':        return <HomePage        region={region} />;
         case 'live-events': return <LiveEventsPage  region={region} />;
         case 'corporate':   return <CorporatePage   region={region} />;
         case 'nightlife':   return <NightlifePage   region={region} />;
         case 'sports':      return <SportsPage      region={region} />;
         case 'broadcast':   return <BroadcastPage   region={region} />;
         case 'advertising': return <AdvertisingPage region={region} />;
         case 'it-av':       return <ITAVPage        region={region} />;
         case 'products':    return <WIPPage         title="Products" />;
         default:            return <HomePage        region={region} />;
      }
   };

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
                  <div 
                     onClick={() => navigateTo('home')}
                     className="flex-shrink-0 cursor-pointer flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                     <img
                        src={gtDarkLogo}
                        alt="Global-Tecs Globe"
                        className="h-8 w-8 object-contain rounded-full"
                        onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=GT&background=000000&color=ffffff&rounded=true" }}
                     />
                     <span className="text-xl font-semibold tracking-tighter text-white">Global-Tecs</span>
                  </div>
                  {/*************************** DESKTOP NAVIGATION **************************/}
                  <div className="hidden lg:block overflow-x-auto">
                     <div className="ml-8 flex items-center space-x-6 text-xs font-semibold text-gray-300 uppercase tracking-widest">
                        <button onClick={() => navigateTo('live-events')} className={`hover:text-white transition-colors ${currentPage === 'live-events' ? 'text-white' : ''}`}>LIVE EVENTS</button>
                        <button onClick={() => navigateTo('corporate')}   className={`hover:text-white transition-colors ${currentPage === 'corporate'   ? 'text-white' : ''}`}>CORPORATE</button>
                        <button onClick={() => navigateTo('nightlife')}   className={`hover:text-white transition-colors ${currentPage === 'nightlife'   ? 'text-white' : ''}`}>NIGHTLIFE</button>
                        <button onClick={() => navigateTo('sports')}      className={`hover:text-white transition-colors ${currentPage === 'sports'      ? 'text-white' : ''}`}>SPORTS</button>
                        <button onClick={() => navigateTo('broadcast')}   className={`hover:text-white transition-colors ${currentPage === 'broadcast'   ? 'text-white' : ''}`}>BROADCAST</button>
                        <button onClick={() => navigateTo('advertising')} className={`hover:text-white transition-colors ${currentPage === 'advertising' ? 'text-white' : ''}`}>ADVERTISING</button>
                        <button onClick={() => navigateTo('it-av')}       className={`hover:text-white transition-colors ${currentPage === 'it-av'       ? 'text-white' : ''}`}>IT/AV</button>
                        
                        <span className="text-white/20 select-none">|</span>
                        <button onClick={() => navigateTo('products')}    className={`hover:text-white transition-colors ${currentPage === 'products'    ? 'text-white' : ''}`}>PRODUCTS</button>
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
               <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 absolute w-full shadow-2xl">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                     <button onClick={() => navigateTo('live-events')} className="block w-full px-3 py-3 text-gray-300 hover:text-white text-lg">LIVE EVENTS</button>
                     <button onClick={() => navigateTo('corporate')}   className="block w-full px-3 py-3 text-gray-300 hover:text-white text-lg">CORPORATE</button>
                     <button onClick={() => navigateTo('nightlife')}   className="block w-full px-3 py-3 text-gray-300 hover:text-white text-lg">NIGHTLIFE</button>
                     <button onClick={() => navigateTo('sports')}      className="block w-full px-3 py-3 text-gray-300 hover:text-white text-lg">SPORTS</button>
                     <button onClick={() => navigateTo('broadcast')}   className="block w-full px-3 py-3 text-gray-300 hover:text-white text-lg">BROADCAST</button>
                     <button onClick={() => navigateTo('advertising')} className="block w-full px-3 py-3 text-gray-300 hover:text-white text-lg">ADVERTISING</button>
                     <button onClick={() => navigateTo('it-av')}       className="block w-full px-3 py-3 text-gray-300 hover:text-white text-lg border-b border-white/10">IT/AV</button>
                     <button onClick={() => navigateTo('products')}    className="block w-full px-3 py-3 text-blue-400 font-medium hover:text-blue-300 text-lg">PRODUCTS</button>

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

         {/******************************** MAIN APP SWITCHER *******************************/}
         <main>
            {renderPage()}
         </main>

         {/************************************* FOOTER *************************************/}
         <footer className="border-t border-white/10 py-12 text-center text-gray-500 text-sm bg-black relative z-10">
            <div className="flex flex-col items-center justify-center gap-4">
               <img 
                  src={gtDarkLogo}
                  alt="Logo"
                  className="h-20 w-20 opacity-50 grayscale cursor-pointer hover:opacity-100 transition-opacity"
                  onClick={() => navigateTo('home')}
                  onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=GT&background=000000&color=ffffff&rounded=true" }}
               />
               <p>
                  © {new Date().getFullYear()} Global-Tecs Production Services. <span className="block md:inline">All rights reserved.</span>
               </p>
            </div>
         </footer>
      </div>
  );
}