'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChefHat, 
  GraduationCap, 
  Award, 
  Users, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  CheckCheck, 
  ArrowRight, 
  Loader2, 
  ImageOff,
  Menu,
  X,
  BookOpen,
  Mic,
  UtensilsCrossed,
  GlassWater,
  Flame,
  Cake
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: mono-accent

const brief = {
  name: "Chef Tilda’s Culinary School",
  tagline: "Where culinary masters are made",
  description: "A premier institution in Lagos dedicated to the art of food, cakes, pastry making, and mixology, blending traditional techniques with luxury craftsmanship.",
  industry: "food",
  region: "nigeria",
  currency: "₦",
  heroImage: {
    url: "https://images.unsplash.com/photo-1702014861373-527115231f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwc3R1ZGVudCUyMHBsYXRpbmclMjBnb3VybWV0JTIwZGlzaCUyMExhZ29zfGVufDF8MHx8fDE3ODA0ODgzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "luxury kitchen studio"
  }
};

const PRODUCTS = [
  {
    name: "Professional Chef Diploma",
    description: "A comprehensive multi-month program covering international cuisines and advanced kitchen management.",
    price: "₦300,000",
    image: "https://images.unsplash.com/photo-1742134517660-bf2cc93905a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
  },
  {
    name: "Advanced Pastry & Cake Artistry",
    description: "Master the science of baking, sugar craft, and luxury wedding cake design.",
    price: "₦150,000",
    image: "https://images.unsplash.com/photo-1780337092369-eefebe4facfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
  },
  {
    name: "Mixology & Beverage Program",
    description: "The art of craft cocktails and professional drink styling for high-end hospitality.",
    price: "₦85,000",
    image: "https://images.unsplash.com/photo-1527619348750-7f8a677fcd5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
  },
  {
    name: "Weekend Culinary Foundation",
    description: "Perfect for beginners looking to master home-style excellence in Lagos.",
    price: "₦45,000",
    image: "https://images.unsplash.com/photo-1592383797409-0d334c1ed059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
  }
];

const FEATURES = [
  { title: "Hands-on Excellence", description: "Practical sessions in a state-of-the-art luxury studio environment.", icon: <ChefHat size={24} /> },
  { title: "Chef T Mentorship", description: "Learn directly under the expertise of our Chief Instructor, Chef T.", icon: <GraduationCap size={24} /> },
  { title: "Global Certification", description: "Earn credentials recognized across the international hospitality industry.", icon: <Award size={24} /> },
  { title: "Industry Network", description: "Connect with top-tier restaurants and luxury catering brands.", icon: <Users size={24} /> }
];

const TESTIMONIALS = [
  { name: "Oluwatobiloba Adeyemi", text: "The attention to detail in the pastry course changed my entire career. Chef T is a visionary.", role: "Head Pastry Chef, Lagos" },
  { name: "Chioma Nnaji", text: "A world-class experience right here in Nigeria. The facilities are unmatched.", role: "Culinary Entrepreneur" },
  { name: "Fatima Abubakar", text: "I started as a total beginner and now I run my own luxury catering brand. Best decision ever.", role: "Executive Chef" }
];

const STATS = [
  { number: "57k+", label: "Community Followers", icon: <Instagram size={20} /> },
  { number: "1200+", label: "Graduates Trained", icon: <BookOpen size={20} /> },
  { number: "15+", label: "Expert Instructors", icon: <Mic size={20} /> }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1589109807644-924edf14ee09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
  "https://images.unsplash.com/photo-1760001553414-5634201efc36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
  "https://images.unsplash.com/photo-1565587039782-61ed66a6bcd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
  "https://images.unsplash.com/photo-1708915965975-2a950db0e215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
  "https://images.unsplash.com/photo-1592383797409-0d334c1ed059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
  "https://images.unsplash.com/photo-1719297491247-b187cf7b20a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
];

// --- HOOKS ---
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- COMPONENTS ---
function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-secondary/40 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return sent ? (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-[#0d0d0d] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
      <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <CheckCheck size={32} className="text-accent" />
      </div>
      <h3 className="font-heading text-3xl font-black text-white mb-3 relative z-10">Application Received</h3>
      <p className="text-white/60 max-w-sm text-lg relative z-10">Welcome to the family. Our admissions team will contact you within 24 hours.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#0d0d0d] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-bold text-white mb-8">Apply for Admission</h3>
        <div className="grid grid-cols-1 gap-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
            />
          ))}
          <textarea rows={4} placeholder="Tell us about your culinary goals"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-8 bg-accent text-black py-4 rounded-xl font-bold text-base hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>
      </div>
    </form>
  );
}

// --- SECTIONS ---

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent text-primary font-heading font-black flex items-center justify-center rounded-lg group-hover:rotate-6 transition-transform">CT</div>
            <span className="font-heading font-black text-xl tracking-tighter text-white">CHEF TILDA</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Programs', 'Academy', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white font-medium text-sm tracking-widest uppercase transition-colors">{link}</a>
            ))}
            <a href="#contact" className="bg-accent text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">Enroll Now</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileNav(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[110] transition-transform duration-500 md:hidden ${mobileNav ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileNav(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col">
          <button className="self-end text-white mb-12" onClick={() => setMobileNav(false)}><X size={32} /></button>
          <div className="space-y-8">
            {['Home', 'Programs', 'Academy', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="block text-3xl font-heading font-bold text-white" onClick={() => setMobileNav(false)}>{link}</a>
            ))}
          </div>
          <div className="mt-auto">
            <a href="#contact" className="block text-center bg-accent text-black py-4 rounded-xl font-bold text-lg" onClick={() => setMobileNav(false)}>Enroll Now</a>
          </div>
        </div>
      </div>
    </>
  );
}

function Hero() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="hero" ref={ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-secondary/20 px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 max-w-5xl max-h-[70vh] rounded-[4rem] overflow-hidden rotate-3">
        <SafeImage src={brief.heroImage.url} alt={brief.name} fill className="object-cover" priority />
      </div>

      <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter">
          WHERE CULINARY<br /><span className="text-accent italic">MASTERS</span> ARE MADE.
        </h1>
        <p className="text-white/60 mt-10 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
          {brief.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <a href="#contact" className="bg-accent text-black px-12 py-5 font-black text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl">Enroll Now</a>
          <a href="#academy" className="border border-white/20 text-white px-12 py-5 font-medium text-lg hover:bg-white/10 transition-all duration-300 rounded-full backdrop-blur-md">Explore Academy</a>
        </div>
      </div>
    </section>
  );
}

function FeatureReveal() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="features" ref={ref} className="py-28 bg-[#0a0a0a] px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center">
          <p className="font-mono text-accent/50 text-xs tracking-[0.5em] uppercase mb-4">The Standard</p>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white">THE ACADEMY EXPERIENCE</h2>
        </div>
        <div className="space-y-6">
          {FEATURES.map((f, idx) => (
            <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
              <div className="bg-secondary/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/8 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 flex flex-col md:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(250,249,246,0.3)]">
                  {f.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight">{f.title}</h3>
                    <span className="text-accent/20 font-mono text-xl">0{idx + 1}</span>
                  </div>
                  <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatDivider() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="bg-accent py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
        {STATS.map((s, i) => (
          <div key={i} className={`px-12 py-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 200}ms` }}>
            <div className="flex justify-center mb-4 text-black/40">{s.icon}</div>
            <p className="text-6xl font-heading font-black text-primary tracking-tighter">{s.number}</p>
            <p className="text-black/60 text-sm mt-2 font-bold uppercase tracking-[0.2em]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="academy" ref={ref} className="py-28 px-6 bg-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.1fr] gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/5">
            <SafeImage src="https://images.unsplash.com/photo-1592383797409-0d334c1ed059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" alt="Chef T" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-accent font-mono text-xs tracking-widest uppercase mb-2">Chief Instructor</p>
              <h3 className="font-heading text-4xl font-bold text-white">Chef Tilda</h3>
            </div>
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <p className="text-secondary font-mono text-sm tracking-[0.4em] uppercase mb-6 font-bold">The Mentorship</p>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-tight mb-8">GUIDED BY <span className="text-accent italic">CHEF T.</span></h2>
          <p className="text-white/60 text-xl leading-relaxed mb-10">
            Led by Co-founder and Chief Instructor Chef T, our school is built on the philosophy that culinary excellence is a form of luxury craftsmanship. With years of experience in high-end gastronomy, Chef T mentors every student to reach the peak of their potential.
          </p>
          <p className="text-accent/40 font-heading text-2xl italic mb-12">"Experience the peak of Naija culinary craft."</p>
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
            <div>
              <h4 className="text-white font-bold mb-2 flex items-center gap-2"><UtensilsCrossed size={16} className="text-accent" /> Professionalism</h4>
              <p className="text-white/40 text-sm">Rigorous training standards matching global benchmarks.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Flame size={16} className="text-accent" /> Innovation</h4>
              <p className="text-white/40 text-sm">Modern techniques blended with heritage Nigerian flavors.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductGrid() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="programs" ref={ref} className="py-28 px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-accent/50 text-xs tracking-widest uppercase mb-4">Our Programs</p>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white">CURATED <span className="text-accent italic">PATHWAYS.</span></h2>
        </div>
        <p className="text-white/40 max-w-sm text-lg mb-2 transition-all duration-700 delay-200">From foundation courses to professional diplomas, we shape the next generation of culinary leaders.</p>
      </div>

      <div className="max-w-7xl mx-auto space-y-32">
        {PRODUCTS.map((p, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${i * 150}ms` }}>
            <div className="w-full md:w-1/2 relative group">
              <div className="aspect-[16/10] relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10 group-hover:bg-primary/40 transition-colors duration-500`} />
            </div>
            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
              <span className="font-mono text-accent text-sm font-bold tracking-widest uppercase mb-4 block">0{i + 1} — Course Offering</span>
              <h3 className="font-heading text-4xl md:text-6xl font-black text-white leading-tight mb-6">{p.name}</h3>
              <p className="text-white/50 mt-5 text-xl leading-relaxed mb-8">{p.description}</p>
              <div className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'} gap-6`}>
                <span className="text-5xl font-black text-white tracking-tighter">{p.price}</span>
                <a href="#contact" className="bg-accent text-black px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-all">Enroll Now</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 italic underline decoration-accent/20 underline-offset-8">INSIDE THE STUDIO</h2>
          <p className="text-white/40 text-xl">Witness the artistry in motion at our Lagos academy.</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((src, i) => (
            <div key={i} className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <SafeImage src={src} alt={`Studio ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white"><UtensilsCrossed size={20} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl md:text-7xl font-black text-white text-center mb-20">VOICES OF THE <span className="text-accent italic">ALUMNI.</span></h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`break-inside-avoid bg-gradient-to-br from-white/5 to-transparent p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden group hover:border-accent/30 transition-all duration-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
              </div>
              <p className="text-white/80 text-xl leading-relaxed italic mb-10 relative z-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-5 border-t border-white/10 pt-8 mt-6">
                <div className="w-12 h-12 rounded-full bg-primary/40 flex items-center justify-center text-accent font-heading font-black text-xl border border-accent/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-lg">{t.name}</p>
                  <p className="text-accent/50 font-mono text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-black/10 -skew-x-12 translate-x-24 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0 skew-y-0' : 'opacity-0 -translate-x-12 skew-y-1'}`}>
          <p className="font-mono text-accent/60 text-sm tracking-[0.5em] uppercase mb-6">Join the Cohort</p>
          <h2 className="font-heading text-6xl md:text-[6rem] font-black text-white mb-8 leading-[0.9]">BEGIN YOUR <br /><span className="text-accent/40">JOURNEY.</span></h2>
          <div className="space-y-8 mt-12">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-accent group-hover:text-primary transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">Campus</p>
                <p className="text-white text-xl font-medium">{brief.contact.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-accent group-hover:text-primary transition-all">
                <Instagram size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">Follow Us</p>
                <a href={brief.contact.instagram} className="text-white text-xl font-medium hover:text-accent transition-colors">@cheftildaculinaryschool</a>
              </div>
            </div>
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent text-primary font-heading font-black flex items-center justify-center rounded-xl">CT</div>
              <span className="font-heading font-black text-2xl tracking-tighter text-white">CHEF TILDA</span>
            </div>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
              Transforming passion into profession through uncompromising standards and luxury craftsmanship.
            </p>
            <p className="text-accent/60 font-mono text-sm uppercase tracking-widest">Sharp delivery of excellence, Lagos-wide.</p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-8">Academy</h4>
            <ul className="space-y-4">
              <li><a href="#hero" className="text-white/40 hover:text-accent transition-colors">Home</a></li>
              <li><a href="#programs" className="text-white/40 hover:text-accent transition-colors">Programs</a></li>
              <li><a href="#academy" className="text-white/40 hover:text-accent transition-colors">The Studio</a></li>
              <li><a href="#contact" className="text-white/40 hover:text-accent transition-colors">Enrollment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-8">Connect</h4>
            <div className="flex gap-4">
              <a href={brief.contact.whatsapp} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent transition-all"><Phone size={20} /></a>
              <a href={brief.contact.instagram} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent transition-all"><Mail size={20} /></a>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-mono uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Chef Tilda’s Culinary School. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 text-xs font-mono uppercase tracking-[0.2em] hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-white/20 text-xs font-mono uppercase tracking-[0.2em] hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <FeatureReveal />
      <StatDivider />
      <AboutSection />
      <ProductGrid />
      <Gallery />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}