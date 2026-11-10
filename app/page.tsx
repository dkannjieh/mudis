'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  HelpCircle, 
  Menu, 
  X, 
  ArrowUpRight, 
  Filter, 
  Heart, 
  Award, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus,
  Maximize2,
  Mail,
  Info,
  Layers,
  PackageCheck
} from 'lucide-react';

// EXACT MUDI'S LOGO SVG COMPONENT
const MudiLogo = ({ className = "h-12" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg viewBox="0 0 340 160" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chef Hat Outline & Swirl Lines in Dark Forest Green - Matched to Original Silhouette */}
      <g stroke="#044C29" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Outer tilted toque outline */}
        <path d="M 62 76 C 30 82 12 60 18 42 C 22 26 40 14 62 16 C 72 8 108 5 125 24 C 142 16 168 28 162 48 C 172 56 162 74 140 76 Z" strokeWidth="6" />
        {/* Bottom hat band curve resting over 'm' */}
        <path d="M 52 74 C 70 68 118 68 142 74" strokeWidth="5" />
        {/* Main interior crease curve */}
        <path d="M 32 50 C 60 38 120 40 145 52" strokeWidth="4.5" />
        {/* Secondary subtle fold line */}
        <path d="M 68 26 C 90 20 125 25 140 34" strokeWidth="3.5" />
      </g>

      {/* "mudi's" Lettering with EXACT Two-Tone Colors */}
      <g fontFamily="'Arial Rounded MT Bold', 'Fredoka', system-ui, sans-serif" fontWeight="900" fontSize="56" letterSpacing="-1">
        {/* 'm' in Bright Grass Green */}
        <text x="62" y="112" fill="#3DAE37">m</text>
        {/* 'u' in Dark Forest Green */}
        <text x="114" y="112" fill="#044C29">u</text>
        {/* 'd' in Dark Forest Green */}
        <text x="150" y="112" fill="#044C29">d</text>
        {/* 'i' in Bright Grass Green */}
        <text x="188" y="112" fill="#3DAE37">i</text>
        {/* apostrophe ' in Dark Forest Green */}
        <text x="206" y="105" fill="#044C29" fontSize="48">’</text>
        {/* 's' in Dark Forest Green */}
        <text x="224" y="112" fill="#044C29">s</text>
      </g>

      {/* "Cakes & Pastries" Script Text in Warm Orange */}
      <text 
        x="62" 
        y="142" 
        fontFamily="'Playfair Display', 'Brush Script MT', 'Georgia', serif" 
        fontStyle="italic"
        fontSize="28" 
        fill="#F38120"
        letterSpacing="0.8"
      >
        Cakes &amp; Pastries
      </text>
    </svg>
  </div>
);

// OFFICIAL WEDDING PRICING DATA EXTRACTED FROM SCREENSHOTS
const OFFICIAL_WEDDING_PRICING = [
  { pax: 50, tiers: 4, prepacks: 25, price: 31000, weight: "6 kgs" },
  { pax: 100, tiers: 5, prepacks: 50, price: 45000, weight: "10 kgs" },
  { pax: 200, tiers: 5, prepacks: 100, price: 65000, weight: "16 kgs" },
  { pax: 300, tiers: 6, prepacks: 150, price: 82000, weight: "20 kgs" },
  { pax: 400, tiers: 6, prepacks: 200, price: 102000, weight: "25.5 kgs" },
  { pax: 500, tiers: 7, prepacks: 250, price: 122000, weight: "31.5 kgs" },
  { pax: 600, tiers: 7, prepacks: 300, price: 142000, weight: "37 kgs" },
  { pax: 700, tiers: 7, prepacks: 350, price: 162000, weight: "42.5 kgs" },
  { pax: 800, tiers: 7, prepacks: 400, price: 182000, weight: "48.5 kgs" },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('all');
  const [activeFaq, setActiveFaq] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [selectedWeddingPax, setSelectedWeddingPax] = useState(200);
  const [weddingModalOpen, setWeddingModalOpen] = useState(false);

  // Customizer state
  const [customTier, setCustomTier] = useState('2-Tier');
  const [customPax, setCustomPax] = useState('100');
  const [customFlavor, setCustomFlavor] = useState('Black Forest Velvet');
  const [customAddons, setCustomAddons] = useState(['Sugar Flowers']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppUrl = (message) => {
    const defaultMsg = "Hello Mudi Cakes! I would like to inquire about ordering a custom cake.";
    return `https://wa.me/254721949214?text=${encodeURIComponent(message || defaultMsg)}`;
  };

  const categories = [
    {
      id: 'birthday',
      title: 'Birthday Cakes',
      count: '40+ Custom Styles',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      tagline: 'Vibrant, personalized creations for all ages'
    },
    {
      id: 'wedding',
      title: 'Wedding Cakes',
      count: '4 to 7 Tiers',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80',
      tagline: 'Majestic centerpieces crafted for your grand celebration'
    },
    {
      id: 'corporate',
      title: 'Corporate Cakes',
      count: 'Logo & Custom Banners',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
      tagline: 'Brand celebrations, product launches & milestones'
    },
    {
      id: 'babyshower',
      title: 'Baby Shower Cakes',
      count: 'Cute Pastels & Sculpted',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
      tagline: 'Warm, delightful designs to welcome new joy'
    },
    {
      id: 'graduation',
      title: 'Graduation Cakes',
      count: 'Sculpted Books & Caps',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      tagline: 'Commemorate academic success in sweet style'
    },
    {
      id: 'pastries',
      title: 'Artisanal Pastries',
      count: 'Fresh Daily',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      tagline: 'Tarts, gateaux, croissants & delicate sweet bites'
    }
  ];

  const bestSellers = [
    {
      id: 1,
      name: 'Royal Passion Forest Gateau',
      price: 'KSh 4,500',
      kg: '2.0 KGS',
      rating: 4.9,
      reviews: 48,
      tag: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
      description: 'Moist vanilla sponge infused with fresh passionfruit coulis, whipped white cream, and chocolate curls.'
    },
    {
      id: 2,
      name: 'Signature Dark Forest Velvet',
      price: 'KSh 4,800',
      kg: '2.0 KGS',
      rating: 5.0,
      reviews: 62,
      tag: 'Classic',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      description: 'Rich Belgian chocolate layers soaked in cherry syrup, topped with maraschino cherries & dark flakes.'
    },
    {
      id: 3,
      name: 'Sculpted Academic Stack (Graduation)',
      price: 'KSh 7,500',
      kg: '3.0 KGS',
      rating: 4.8,
      reviews: 31,
      tag: 'Custom 3D',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      description: 'Sculpted textbook & graduation cap tier cake with custom course title plaques.'
    },
    {
      id: 4,
      name: 'Elegance Ivory Rose 4-Tier',
      price: 'KSh 31,000',
      kg: '6.0 KGS',
      rating: 5.0,
      reviews: 24,
      tag: 'Wedding Favorite',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80',
      description: '4-tier tiered centerpiece with handcrafted edible sugar roses and 25 complimentary prepacks.'
    }
  ];

  const galleryItems = [
    { id: 1, cat: 'weddings', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80', title: '5-Tier Floral Cascade' },
    { id: 2, cat: 'sculpted', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80', title: 'Corporate Milestone Logo Cake' },
    { id: 3, cat: 'pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', title: 'Fruit Tartlets & Macarons' },
    { id: 4, cat: 'birthdays', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80', title: 'Gold Foil Drip Cake' },
    { id: 5, cat: 'weddings', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80', title: 'Ivory Lace Wedding Tier' },
    { id: 6, cat: 'sculpted', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', title: 'Sculpted French Math Book Cake' }
  ];

  const faqs = [
    {
      q: "How far in advance should I order my cake?",
      a: "We recommend placing custom order requests at least 3 days in advance (or calling us directly at 0721 949 214 for urgent requests). For elaborate wedding cakes, we recommend booking at least 3 months prior to your date."
    },
    {
      q: "What is included with wedding cake packages?",
      a: "All wedding cake orders include a complimentary cake knife, cake server, and serving plate, along with professional delivery, venue setup, and display table stands."
    },
    {
      q: "What are your deposit and payment policies?",
      a: "We require a 10% deposit to reserve your booking date, a 60% down payment at least 4 weeks before the event date, and the remaining balance prior to delivery (or 1 week prior if paying by cheque)."
    },
    {
      q: "Where is Mudi's Cakes located for pickup or consultation?",
      a: "Our bakery is situated at Adams Arcade, Ngong Road, Nairobi, Kenya. You can visit us Monday to Saturday from 8:00 AM to 6:00 PM."
    }
  ];

  // Calculated custom estimate
  const estimatedPrice = useMemo(() => {
    let base = 3500;
    if (customTier === '2-Tier') base = 8500;
    if (customTier === '3-Tier') base = 18000;
    if (customTier === '4-Tier+') base = 31000;
    
    if (customPax === '150+') base += 4000;
    if (customPax === '300+') base += 12000;
    
    base += customAddons.length * 1500;
    return base;
  }, [customTier, customPax, customAddons]);

  const toggleAddon = (item) => {
    if (customAddons.includes(item)) {
      setCustomAddons(customAddons.filter(i => i !== item));
    } else {
      setCustomAddons([...customAddons, item]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F0] text-[#3A2E2A] font-sans antialiased selection:bg-gold/30 selection:text-chocolate">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-chocolate text-cream text-[11px] font-medium py-2 px-4 text-center tracking-wide border-b border-gold/20 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
        <span>Bespoke Artisanal Cakes in Nairobi • Call <strong>0721 949 214</strong> / <strong>0735 949 214</strong></span>
      </div>

      {/* STICKY HEADER & NAVBAR */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-[#FFF7F0]/90 backdrop-blur-sm py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center">
            <MudiLogo className="h-10 sm:h-12" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase font-bold tracking-wider">
            <a href="#categories" className="hover:text-gold transition-colors">Categories</a>
            <button onClick={() => setWeddingModalOpen(true)} className="text-gold font-extrabold hover:underline cursor-pointer flex items-center gap-1">
              <span>Wedding Rates</span>
              <Sparkles className="w-3 h-3 text-gold" />
            </button>
            <a href="#bestsellers" className="hover:text-gold transition-colors">Best Sellers</a>
            <a href="#customizer" className="hover:text-gold transition-colors">Calculator</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#about" className="hover:text-gold transition-colors">About Us</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </nav>

          {/* Direct CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href={getWhatsAppUrl("Hello Mudi Cakes! I would like to order a custom cake.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-chocolate rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Wedding Cake Mudi" 
            className="w-full h-full object-cover object-center scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-chocolate/90 via-chocolate/75 to-chocolate/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-6">
          <span className="inline-block bg-gold/20 text-gold backdrop-blur-md text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-gold/30">
            Adams Arcade, Ngong Road • Nairobi
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Artisanal Bespoke Cakes &amp; Fine Pastries
          </h1>
          <p className="text-white/90 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Crafting beautiful, artistic centerpieces for weddings, birthdays, anniversaries, and corporate celebrations across Nairobi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setWeddingModalOpen(true)}
              className="w-full sm:w-auto bg-gold text-chocolate hover:bg-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-xl transition-all text-center cursor-pointer"
            >
              View Wedding Pricing Matrix
            </button>
            <a 
              href={getWhatsAppUrl("Hello Mudi Cakes! I would like to consult about a custom cake order.")}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-xl transition-all text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES SECTION - ENHANCED SPACING & ELEVATED SHADOWS */}
      <section id="categories" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gold">Curated Collections</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-chocolate mt-2">
              Explore Our Cake Categories
            </h2>
          </div>
          <p className="text-chocolate/70 max-w-md mt-4 md:mt-0 text-sm">
            Every celebration requires a unique centerpiece. Discover our tailored recipe collections baked fresh daily in Nairobi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gold/15 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-chocolate/85 backdrop-blur-md text-gold text-[11px] font-bold px-3 py-1 rounded-full border border-gold/20">
                  {cat.count}
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-luxury font-bold text-2xl text-chocolate group-hover:text-gold transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-chocolate/70 mt-1.5 leading-relaxed">{cat.tagline}</p>
                </div>

                <a 
                  href={getWhatsAppUrl(`Hello Mudi Cakes, I would like to view options and pricing for ${cat.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between text-xs uppercase tracking-wider font-bold text-chocolate group-hover:text-gold pt-3 border-t border-gold/15"
                >
                  <span>Inquire Category</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLEAN WEDDING TEASER BANNER (REPLACES INTIMIDATING DIRECT TABLE) */}
      <section id="wedding-pricing" className="py-20 bg-gradient-to-br from-chocolate via-[#2A1E1A] to-chocolate text-cream px-4 my-8 rounded-3xl max-w-7xl mx-auto shadow-2xl relative overflow-hidden border border-gold/30">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-gold/30">
            <Sparkles className="w-3.5 h-3.5 text-gold" /> Official Package Matrix
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Grand Wedding Cake Packages
          </h2>
          <p className="text-cream/80 text-sm max-w-2xl mx-auto leading-relaxed">
            From intimate 50-pax gatherings (4 tiers) up to grand 800-pax celebrations (7 tiers). All wedding orders include complimentary cake servers, stands, and venue setup.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setWeddingModalOpen(true)}
              className="w-full sm:w-auto bg-gold text-chocolate hover:bg-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open Wedding Rates Matrix</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a 
              href={getWhatsAppUrl("Hello Mudi Cakes! I would like to request a bespoke wedding cake consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-cream font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full border border-white/20 transition-all text-center"
            >
              Consult Wedding Planner
            </a>
          </div>
        </div>
      </section>

      {/* DEDICATED WEDDING RATES MODAL (OFF-PAGE TABLE PREVENTS HOMEPAGE SCARING) */}
      {weddingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-[#FFF7F0] rounded-3xl max-w-5xl w-full p-6 sm:p-10 border border-gold/40 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-gold">Official Price Matrix</span>
                <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-chocolate">
                  Mudi’s Wedding Cakes Price List
                </h3>
              </div>
              <button 
                onClick={() => setWeddingModalOpen(false)}
                className="p-2 text-chocolate hover:bg-gold/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Interactive Pricing Table inside Modal */}
            <div className="bg-white rounded-2xl border border-gold/25 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-chocolate">
                  <thead className="bg-chocolate text-gold uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Guest Capacity</th>
                      <th className="p-4">No. of Tiers</th>
                      <th className="p-4">Prepacks Included</th>
                      <th className="p-4">Total Weight</th>
                      <th className="p-4">Cost (KSh)</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/15">
                    {OFFICIAL_WEDDING_PRICING.map((row) => (
                      <tr 
                        key={row.pax} 
                        className={`hover:bg-gold/10 transition-colors ${selectedWeddingPax === row.pax ? 'bg-gold/15 font-semibold' : ''}`}
                        onClick={() => setSelectedWeddingPax(row.pax)}
                      >
                        <td className="p-4 font-bold flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gold" />
                          Cake for {row.pax} pax
                        </td>
                        <td className="p-4">{row.tiers} tiers</td>
                        <td className="p-4">{row.prepacks} prepacks</td>
                        <td className="p-4 text-chocolate/80">{row.weight}</td>
                        <td className="p-4 font-serif-luxury font-bold text-base text-chocolate">
                          KSh {row.price.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                          <a 
                            href={getWhatsAppUrl(`Hello Mudi Cakes! I would like to book the Wedding Package for ${row.pax} pax (${row.tiers} tiers, KSh ${row.price.toLocaleString()}).`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-[#25D366] text-white hover:bg-[#20ba5a] text-[11px] px-3.5 py-1.5 rounded-full font-bold transition-all shadow-sm"
                          >
                            <span>Book</span>
                            <ChevronRight className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Services & Terms Grid inside Modal */}
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="bg-white rounded-2xl p-6 border border-gold/20 space-y-3">
                <div className="flex items-center gap-2 text-chocolate font-bold border-b border-gold/15 pb-2">
                  <PackageCheck className="w-5 h-5 text-gold" />
                  <span>Complimentary Included</span>
                </div>
                <ul className="space-y-2 text-xs text-chocolate/80">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> Knife, cake server, and serving plate provided.</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> Delivery and venue setup included.</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> Stands & display table materials included.</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gold/20 space-y-3">
                <div className="flex items-center gap-2 text-chocolate font-bold border-b border-gold/15 pb-2">
                  <Info className="w-5 h-5 text-gold" />
                  <span>Deposit & Lead Terms</span>
                </div>
                <ul className="space-y-1.5 text-xs text-chocolate/80">
                  <li>• Order 3 days in advance (3 months for large wedding setups).</li>
                  <li>• 10% deposit to reserve booking; 60% deposit 4 weeks before event.</li>
                  <li>• Balance cleared prior to delivery.</li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-2">
              <button 
                onClick={() => setWeddingModalOpen(false)}
                className="bg-chocolate text-gold hover:bg-gold hover:text-chocolate text-xs px-6 py-3 rounded-full font-bold transition-all"
              >
                Close Rates Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BEST SELLERS SECTION */}
      <section id="bestsellers" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-gold">Most Popular Choice</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-chocolate mt-2">
            Signature Best Sellers
          </h2>
          <p className="text-chocolate/70 text-sm mt-2">
            Handcrafted using premium cocoa, fresh local berries, and rich cream.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gold/20 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="h-56 relative overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-chocolate/90 backdrop-blur-md text-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold/30">
                    {item.tag}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-chocolate/60">
                    <span className="font-semibold text-chocolate/80">{item.kg}</span>
                    <span className="flex items-center gap-1 font-bold text-gold">
                      <Star className="w-3.5 h-3.5 fill-gold" /> {item.rating}
                    </span>
                  </div>
                  <h3 className="font-serif-luxury font-bold text-lg text-chocolate line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-chocolate/70 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gold/10 flex items-center justify-between mt-4">
                <span className="font-serif-luxury font-bold text-lg text-chocolate">{item.price}</span>
                <a 
                  href={getWhatsAppUrl(`Hello Mudi Cakes! I would like to order the ${item.name} (${item.price}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold text-chocolate hover:bg-chocolate hover:text-gold text-xs px-4 py-2 rounded-full font-bold transition-all shadow-sm"
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTANT PRICE ESTIMATOR / CALCULATOR - ENHANCED VISIBILITY */}
      <section id="customizer" className="py-24 bg-chocolate text-cream px-4 sm:px-6 relative overflow-hidden rounded-3xl max-w-7xl mx-auto my-12 border border-gold/30 shadow-2xl">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-gold">Interactive Tool</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-chocolate">
              Instant Cake Price Estimator
            </h2>
            <p className="text-chocolate/70 text-sm">
              Configure your desired cake specifications to receive an instant estimate in KSh.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6">
              
              {/* Select Tier */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold font-bold mb-3">1. Select Tiers</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1-Tier', '2-Tier', '3-Tier', '4-Tier+'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setCustomTier(tier)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${customTier === tier ? 'bg-gold text-chocolate border-gold shadow-lg' : 'border-white/20 text-cream hover:border-gold'}`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Pax */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold font-bold mb-3">2. Guest Capacity (Pax)</label>
                <div className="grid grid-cols-3 gap-2">
                  {['50 Pax', '150+ Pax', '300+ Pax'].map((pax) => (
                    <button
                      key={pax}
                      onClick={() => setCustomPax(pax)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${customPax === pax ? 'bg-gold text-chocolate border-gold shadow-lg' : 'border-white/20 text-cream hover:border-gold'}`}
                    >
                      {pax}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Flavor */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold font-bold mb-3">3. Primary Flavor</label>
                <select 
                  value={customFlavor}
                  onChange={(e) => setCustomFlavor(e.target.value)}
                  className="w-full bg-chocolate/90 border border-white/25 rounded-xl p-3.5 text-xs text-cream outline-none focus:border-gold font-medium"
                >
                  <option value="Black Forest Velvet">Black Forest Velvet</option>
                  <option value="Passionfruit Gateau">Passionfruit Gateau</option>
                  <option value="Vanilla Berry Blush">Vanilla Berry Blush</option>
                  <option value="Rich Chocolate Fudge">Rich Chocolate Fudge</option>
                  <option value="Light Fruit Cake">Light Fruit Cake</option>
                </select>
              </div>

              {/* Select Add-ons */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold font-bold mb-3">4. Custom Add-ons</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {['Sugar Flowers', 'Edible Gold Leaf', 'Sculpted Topper', 'Prepack Box Set'].map((addon) => (
                    <button
                      key={addon}
                      onClick={() => toggleAddon(addon)}
                      className={`p-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${customAddons.includes(addon) ? 'border-gold bg-gold/25 text-white shadow-md' : 'border-white/15 text-cream/70 hover:border-white/40'}`}
                    >
                      <span>{addon}</span>
                      {customAddons.includes(addon) && <Check className="w-4 h-4 text-gold" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Calculation Output Card */}
            <div className="md:col-span-5 bg-gold text-chocolate rounded-3xl p-8 shadow-2xl space-y-6 border border-white/40">
              <span className="text-xs font-bold uppercase tracking-widest text-chocolate/70">Estimated Cost</span>
              <div>
                <h3 className="font-serif-luxury text-4xl sm:text-5xl font-bold">
                  KSh {estimatedPrice.toLocaleString()}
                </h3>
                <p className="text-xs text-chocolate/80 mt-1">Includes estimated preparation &amp; standard venue delivery</p>
              </div>

              <div className="space-y-2.5 text-xs border-t border-chocolate/20 pt-4">
                <div className="flex justify-between">
                  <span className="text-chocolate/70">Configuration:</span>
                  <span className="font-bold">{customTier} • {customPax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-chocolate/70">Flavor Profile:</span>
                  <span className="font-bold">{customFlavor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-chocolate/70">Add-ons:</span>
                  <span className="font-bold">{customAddons.length ? customAddons.join(', ') : 'None'}</span>
                </div>
              </div>

              <a 
                href={getWhatsAppUrl(`Hello Mudi Cakes! I built a custom cake quote on your website: ${customTier}, ${customPax}, Flavor: ${customFlavor}, Addons: ${customAddons.join(', ')}. Estimated price KSh ${estimatedPrice.toLocaleString()}. Can we confirm?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-chocolate text-gold hover:bg-white hover:text-chocolate py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xl transition-all uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4 fill-gold" />
                <span>Send Quote to WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold">Portfolio</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-chocolate">
            Instagram-Style Cake Gallery
          </h2>
          <p className="text-chocolate/70 text-sm">
            Browse our artistic creations baked and styled at Adams Arcade.
          </p>

          <div className="flex justify-center flex-wrap gap-2 pt-4">
            {['all', 'weddings', 'sculpted', 'pastries', 'birthdays'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${selectedGalleryCategory === cat ? 'bg-chocolate text-gold border-chocolate shadow-md' : 'bg-white text-chocolate border-gold/30 hover:border-gold'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems
            .filter(item => selectedGalleryCategory === 'all' || item.cat === selectedGalleryCategory)
            .map((item) => (
              <div 
                key={item.id}
                onClick={() => setLightboxImage(item.image)}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all border border-gold/20"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/90 via-chocolate/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <p className="font-serif-luxury font-bold text-lg">{item.title}</p>
                  <span className="text-xs text-gold flex items-center gap-1 mt-1 font-semibold">
                    <Maximize2 className="w-3.5 h-3.5" /> Tap to View Photo
                  </span>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <div className="relative max-w-4xl w-full">
            <button className="absolute -top-12 right-0 text-white hover:text-gold">
              <X className="w-8 h-8" />
            </button>
            <img src={lightboxImage} alt="Enlarged Cake" className="w-full max-h-[85vh] object-contain rounded-3xl" />
          </div>
        </div>
      )}

      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 bg-white px-4 sm:px-6 border-y border-gold/15">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 relative">
            <img 
              src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80" 
              alt="Mudi Bakery Passion" 
              className="rounded-3xl shadow-2xl border border-gold/20 w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-gold text-chocolate p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs border border-white">
              <p className="font-serif-luxury font-bold text-xl">100% Passion</p>
              <p className="text-xs mt-1">Making every customer enjoy exceptional, artistic taste for all occasions.</p>
            </div>
          </div>

          <div className="md:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-gold">About Mudi’s Cakes</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-chocolate">
              Unique Taste, Beautiful Craftsmanship
            </h2>
            <p className="text-chocolate/80 text-sm leading-relaxed">
              Mudi’s Cakes has a passion for making you enjoy that exceptional taste as you have cake. We spend time creating our own recipes to meet each and every one’s taste buds. Our cake flavor portfolio includes classic black forest, white forest, lime forest, passion forest, zucchini, blueberry gateau, cherry gateau, orange coffee, and more!
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-gold/20 pt-6">
              <div>
                <h4 className="font-serif-luxury font-bold text-2xl text-chocolate">5,000+</h4>
                <p className="text-xs text-chocolate/70">Celebrations Crafted</p>
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-2xl text-chocolate">Adams Arcade</h4>
                <p className="text-xs text-chocolate/70">Ngong Road Bakery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-gold">Got Questions?</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-chocolate">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-sm">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-serif-luxury font-bold text-lg text-chocolate hover:text-gold transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-gold transition-transform duration-300 ${activeFaq === idx ? 'rotate-90' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="p-6 pt-0 text-sm text-chocolate/80 border-t border-gold/10 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & LOCATION SECTION */}
      <section id="contact" className="py-24 bg-white px-4 sm:px-6 border-t border-gold/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-gold">Get In Touch</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-chocolate mt-2">
              Visit Our Bakery &amp; Order
            </h2>
            <p className="text-chocolate/70 text-sm mt-2">
              Located conveniently at Adams Arcade along Ngong Road, Nairobi.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-[#FFF7F0] rounded-3xl p-8 border border-gold/30 shadow-lg space-y-6">
              <h3 className="font-serif-luxury font-bold text-2xl text-chocolate border-b border-gold/20 pb-4">
                Mudi’s Cakes &amp; Pastries
              </h3>

              <div className="space-y-4 text-sm text-chocolate/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-chocolate">Physical Address</p>
                    <p className="text-xs">Adams Arcade, Ngong Road, Nairobi, Kenya</p>
                    <p className="text-xs text-chocolate/60">P.O. Box 8643-00200, Nairobi</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-chocolate">Direct Phone &amp; WhatsApp</p>
                    <p className="text-xs">0721 949 214</p>
                    <p className="text-xs">0735 949 214</p>
                    <p className="text-xs">0750 949 214</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-chocolate">Official Email</p>
                    <p className="text-xs">info@mudicakes.co.ke</p>
                    <p className="text-xs">mudienterprises@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-chocolate">Opening Hours</p>
                    <p className="text-xs">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={getWhatsAppUrl("Hello Mudi Cakes! I want to inquire about ordering a cake.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#20ba5a] transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Direct Inquiry on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gold/30 shadow-lg space-y-4">
              <h3 className="font-serif-luxury font-bold text-2xl text-chocolate">
                Send an Online Order Request
              </h3>
              <p className="text-xs text-chocolate/70">
                Fill in your details for custom requests. Fill in at least 3 days in advance (or call directly for urgent orders).
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const msg = `Online Form Submission:
- Name: ${formData.get('name')}
- Phone: ${formData.get('phone')}
- Occasion: ${formData.get('occasion')}
- Event Date: ${formData.get('date')}
- Details: ${formData.get('details')}`;
                  window.open(getWhatsAppUrl(msg), '_blank');
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-chocolate mb-1">Your Full Name</label>
                    <input 
                      name="name" 
                      required 
                      type="text" 
                      placeholder="e.g. Grace Wanjiku" 
                      className="w-full bg-cream/50 border border-gold/30 rounded-xl p-3 outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-chocolate mb-1">Phone / WhatsApp Number</label>
                    <input 
                      name="phone" 
                      required 
                      type="tel" 
                      placeholder="e.g. 0722 000 000" 
                      className="w-full bg-cream/50 border border-gold/30 rounded-xl p-3 outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-chocolate mb-1">Occasion Type</label>
                    <select name="occasion" className="w-full bg-cream/50 border border-gold/30 rounded-xl p-3 outline-none focus:border-gold">
                      <option value="Wedding">Wedding Cake</option>
                      <option value="Birthday">Birthday Cake</option>
                      <option value="Corporate">Corporate Gateau</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Graduation">Graduation Cake</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-chocolate mb-1">Event Date</label>
                    <input 
                      name="date" 
                      required 
                      type="date" 
                      className="w-full bg-cream/50 border border-gold/30 rounded-xl p-3 outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-chocolate mb-1">Cake Details / Flavor Preferences</label>
                  <textarea 
                    name="details" 
                    rows="3" 
                    placeholder="Describe flavor choice, guest numbers, design theme, or custom toppings..." 
                    className="w-full bg-cream/50 border border-gold/30 rounded-xl p-3 outline-none focus:border-gold"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-chocolate text-gold hover:bg-gold hover:text-chocolate font-bold text-xs py-4 rounded-xl shadow-md transition-colors uppercase tracking-wider"
                >
                  Submit Order Request to WhatsApp
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-chocolate text-cream pt-16 pb-12 px-4 sm:px-6 border-t-4 border-gold">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          <div className="md:col-span-4 space-y-4">
            <div className="bg-white/95 p-3 rounded-2xl inline-block shadow-md">
              <MudiLogo className="h-12" />
            </div>
            <p className="text-xs text-cream/70 max-w-sm leading-relaxed">
              We specialize in making beautiful, artistic cakes for your birthday, wedding, anniversary, corporate or any other occasion. Adams Arcade, Ngong Road, Nairobi.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-serif-luxury font-bold text-base text-gold uppercase tracking-wider">Contact &amp; Location</h4>
            <div className="flex items-start gap-2 text-cream/80">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>Adams Arcade, Ngong Road, P.O. Box 8643-00200, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2 text-cream/80">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>0721 949 214 / 0735 949 214 / 0750 949 214</span>
            </div>
            <div className="flex items-center gap-2 text-cream/80">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <span>info@mudicakes.co.ke | mudienterprises@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-cream/80">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif-luxury font-bold text-base text-gold uppercase tracking-wider">Quick Order</h4>
            <p className="text-xs text-cream/70">Ready to discuss your cake design? Connect directly on WhatsApp with our team.</p>
            <a 
              href={getWhatsAppUrl("Hello Mudi Cakes, I would like to order a custom cake.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-xs font-bold w-full shadow-lg hover:bg-[#20ba5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream/50 gap-4">
          <p>© 2026 MUDI’S CAKES &amp; PASTRIES. ALL RIGHTS RESERVED.</p>
          <p>Adams Arcade, Ngong Road, Nairobi • Premium Bakery &amp; Confectionery</p>
        </div>
      </footer>
    </div>
  );
}