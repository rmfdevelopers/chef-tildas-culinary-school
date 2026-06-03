'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChefHat, 
  Award, 
  Users, 
  UtensilsCrossed, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCheck, 
  Loader2, 
  Menu, 
  X, 
  Instagram,
  GraduationCap,
  Heart,
  UserCheck,
  ImageOff
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- CUSTOM HOOKS ---

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

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/10 ${className}`}>
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

const DividerRule = ({ tagline }: { tagline: string }) => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      {tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

// --- SECTIONS ---

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brief = {
    brand: {
      name: "Chef Tilda’s Culinary School",
      tagline: "Where culinary masters are made.",
      description: "A premier Lagos academy dedicated to the art of culinary excellence, from professional chef diplomas to artisanal pastry craftsmanship.",
      industry: "food",
      region: "nigeria"
    },
    colors: {
      primary: "#800020",
      secondary: "#556B2F",
      accent: "#D4AF37"
    },
    contact: {
      whatsapp: "2349043375328",
      instagram: "@cheftildaculinaryschool",
      address: "Lagos, Nigeria",
      email: ""
    },
    products: [
      { name: "Professional Chef Diploma", description: "A comprehensive 6-month intensive covering international cuisines and kitchen management.", price: "₦300,000", image: "https://images.unsplash.com/photo-1738676861654-18103876e8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      { name: "Artisanal Pastry & Baking", description: "Master the science of dough, French patisserie, and complex cake engineering.", price: "₦150,000", image: "https://images.unsplash.com/photo-1594873587945-769e344ad0c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      { name: "Mixology & Craft Drinks", description: "The art of flavor profiling, garnishing, and professional bar service.", price: "₦45,000", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      { name: "Beginner Culinary Intensive", description: "Fundamental knife skills and essential cooking techniques for home enthusiasts.", price: "₦5,000", image: "https://images.unsplash.com/photo-1759209402969-be3ea5027356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
    ],
    features: [
      { title: "Hands-on Mastery", description: "90% practical-based learning ensuring every student masters the craft physically.", icon: ChefHat },
      { title: "Global Certification", description: "Graduate with credentials recognized across the hospitality and food industry.", icon: Award },
      { title: "Professional Mentorship", description: "Direct access to industry veterans and personalized career placement guidance.", icon: Users },
      { title: "Luxury Studio", description: "Train in a world-class facility equipped with state-of-the-art culinary tech.", icon: UtensilsCrossed }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566430971345-15d9b0231a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1738676861654-18103876e8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1719297491247-b187cf7b20a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1542320260-f8f651de8c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1645616134904-997455b706d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1561361900-048737717a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ],
    stats: [
      { number: "57k+", label: "Community", icon: Heart },
      { number: "1200+", label: "Graduates", icon: GraduationCap },
      { number: "15+", label: "Expert Tutors", icon: UserCheck }
    ],
    testimonials: [
      { name: "Chidi Okoro", text: "The Professional Diploma changed my life. I now run my own catering firm in Lekki with full confidence.", role: "Head Chef, Aura Dining" },
      { name: "Fatima Yusuf", text: "Chef T is a force of nature. Her attention to detail in pastry making is unlike anything I've seen in Nigeria.", role: "Pastry Entrepreneur" },
      { name: "Tunde Adeyemi", text: "A world-class facility. The cocktail course was worth every kobo for my bar business.", role: "Mixology Student" }
    ],
    heroImage: "https://images.unsplash.com/photo-1538609589535-bb35f0c034db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  };

  const heroRev = useScrollReveal();
  const featRev = useScrollReveal();
  const aboutRev = useScrollReveal();
  const gallRev = useScrollReveal();
  const prodRev = useScrollReveal();
  const testRev = useScrollReveal();
  const contRev = useScrollReveal();

  return (
    <main className="relative">
      {/* --- HEADER --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
        scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-primary font-black text-xl">CT</span>
            </div>
            <span className="font-heading font-black text-white text-xl tracking-tighter uppercase hidden sm:block">
              Chef Tilda
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Programs', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} 
                className="text-white/70 hover:text-accent font-medium transition-colors text-sm uppercase tracking-widest">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-black text-sm 
              hover:brightness-110 transition-all transform hover:scale-105 shadow-lg">
              Enroll Now
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white p-2">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 md:hidden ${
        mobileMenu ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg">
              <span className="text-primary font-black text-xl">CT</span>
            </div>
            <button onClick={() => setMobileMenu(false)} className="text-white">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {['Programs', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)}
                className="text-4xl font-heading font-black text-white border-b border-white/10 pb-4">
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)}
              className="mt-8 bg-accent text-primary p-5 text-center font-black text-xl rounded-2xl">
              Enroll Now
            </a>
          </div>
        </div>
      </div>

      {/* --- HERO: HR-A (Editorial Gradient) --- */}
      <section id="home" ref={heroRev.ref} className="min-h-screen relative flex items-center justify-center
        bg-gradient-to-br from-primary via-primary/95 to-accent/15 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-accent/10 rounded-full blur-[140px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="absolute inset-0 opacity-15 grayscale mix-blend-overlay pointer-events-none">
          <SafeImage src={brief.heroImage} alt="Luxury Academy" fill className="object-cover" priority />
        </div>

        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${
          heroRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="font-heading text-6xl md:text-[6.5rem] font-black text-white leading-[0.9] tracking-tighter">
            The Vanguard of <br/><span className="text-accent italic">Culinary Artistry</span>
          </h1>
          <p className="text-white/60 mt-10 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
            Transforming passion into precision. Join Nigeria's most prestigious academy for aspiring chefs and pastry masters.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a href="#contact" className="bg-accent text-primary px-12 py-5 font-black text-lg
              hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl">
              Enroll Now
            </a>
            <a href="#programs" className="border border-white/20 text-white px-12 py-5 font-bold text-lg
              hover:bg-white/10 transition-all duration-300 rounded-full backdrop-blur-md">
              View Programs
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES: F-ICON-GRID (Staggered Children) --- */}
      <section id="features" ref={featRev.ref} className="py-32 px-6 bg-secondary/10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-white mb-4">The Academy Standard</h2>
            <p className="text-white/40 text-lg uppercase tracking-widest font-medium">Lagos excellence redefined</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brief.features.map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm
                hover:bg-accent/10 hover:border-accent/30 transition-all duration-500 group
                ${featRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-8 p-4 w-fit rounded-2xl bg-white/5 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all">
                  <f.icon size={32} />
                </div>
                <h3 className="font-heading font-black text-white text-2xl leading-tight mb-4">{f.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DividerRule tagline={brief.brand.tagline} />

      {/* --- ABOUT: ASYMMETRIC SPLIT --- */}
      <section id="about" ref={aboutRev.ref} className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className={`relative transition-all duration-1000 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl z-10">
                <SafeImage src={brief.gallery[0]} alt="Chef T Instruction" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
              <div className="absolute top-1/2 -left-4 w-24 h-48 bg-secondary/30 rounded-full blur-2xl -z-10" />
            </div>
            <div className={`transition-all duration-1000 delay-300 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-6 block">The Visionary</span>
              <h2 className="font-heading text-6xl font-black text-white mb-8">Led by Chef T</h2>
              <p className="text-white/60 text-xl leading-relaxed font-light mb-10">
                At the heart of the academy is Chef T, our co-founder and Chief Instructor. With a vision for culinary sovereignty, Chef T blends rigorous technique with creative luxury, mentoring the next generation of African culinary legends. Under her guidance, the school has become a sanctuary for those who view food as high art.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
                {brief.stats.map((s, i) => (
                  <div key={i}>
                    <p className="font-heading text-3xl font-black text-accent">{s.number}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GALLERY: STAGGERED MASONRY --- */}
      <section ref={gallRev.ref} className="py-32 px-6 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white text-center mb-20">Life at the Academy</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {brief.gallery.map((img, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`break-inside-avoid relative rounded-[2rem] overflow-hidden group shadow-xl
                transition-all duration-700 ${gallRev.isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'}`}>
                <SafeImage src={img} alt={`Gallery item ${i}`} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center text-accent">
                    <UtensilsCrossed size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAMS: P-STAGGER (Editorial Rows) --- */}
      <section id="programs" ref={prodRev.ref} className="py-32 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="font-heading text-6xl font-black text-white mb-6">Our Programs</h2>
            <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
          </div>
          <div className="space-y-40">
            {brief.products.map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ${
                prodRev.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[4/3] relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-10">
                    <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <span className="bg-accent text-primary px-6 py-2 rounded-full font-black text-lg">{p.price}</span>
                    </div>
                  </div>
                  <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-full h-full border-2 border-accent/20 rounded-[2.5rem] -z-10 transition-transform group-hover:translate-x-4 group-hover:translate-y-4`} />
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-4 block">Academy Select</span>
                  <h3 className="font-heading text-5xl font-black text-white mb-6 leading-tight">{p.name}</h3>
                  <p className="text-white/50 text-xl leading-relaxed mb-10 font-light">{p.description}</p>
                  <a href="#contact" className="inline-flex items-center gap-4 text-accent font-black text-lg group">
                    Enroll in Program 
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS: MASONRY --- */}
      <section ref={testRev.ref} className="py-32 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-white mb-4">Voices of Excellence</h2>
            <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase">Taste the Lagos standard</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {brief.testimonials.map((t, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`break-inside-avoid bg-white/5 p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden group
                transition-all duration-700 ${testRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-accent mb-8">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
                  </div>
                </div>
                <p className="text-white/80 text-xl leading-relaxed italic mb-10 relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-5 border-t border-white/10 pt-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-black text-white text-lg">{t.name}</p>
                    <p className="text-white/40 text-sm tracking-wide font-medium">{t.role}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT: C2 GLASS OVERLAP --- */}
      <section id="contact" ref={contRev.ref} className="py-32 px-6 relative overflow-hidden bg-primary">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className={`bg-white/5 backdrop-blur-3xl p-10 sm:p-14 rounded-[3rem] border border-white/10 shadow-2xl transition-all duration-1000 ${
            contRev.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'
          }`}>
            <ContactForm />
          </div>
          <div className={`transition-all duration-1000 delay-300 ${
            contRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <h2 className="font-heading text-7xl font-black text-white mb-8 leading-[0.9]">Begin Your <br/><span className="text-accent italic">Journey</span></h2>
            <p className="text-white/50 text-xl font-light mb-12 max-w-sm">Ready to master the craft? Our admissions team is waiting to guide your culinary evolution.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">WhatsApp Us</p>
                  <p className="text-white text-lg font-bold">+{brief.contact.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Follow the Craft</p>
                  <p className="text-white text-lg font-bold">{brief.contact.instagram}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Academy Location</p>
                  <p className="text-white text-lg font-bold">{brief.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-primary pt-32 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-accent flex items-center justify-center rounded-xl">
                  <span className="text-primary font-black text-2xl">CT</span>
                </div>
                <span className="font-heading font-black text-white text-3xl uppercase tracking-tighter">Chef Tilda</span>
              </div>
              <p className="text-white/40 text-lg max-w-sm font-light">A premier Lagos academy dedicated to the art of culinary excellence and artisanal craftsmanship.</p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-xl mb-8">Explore</h4>
              <ul className="space-y-4">
                {['Home', 'Programs', 'About', 'Admissions'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-accent transition-colors tracking-wide">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-xl mb-8">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-accent transition-colors tracking-wide">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-sm">© {new Date().getFullYear()} Chef Tilda’s Culinary School. All rights reserved.</p>
            <div className="flex items-center gap-6 text-white/30">
              <Instagram size={20} className="hover:text-accent transition-colors cursor-pointer" />
              <span className="text-xs font-mono uppercase tracking-[0.2em]">Lagos, Nigeria</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
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

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-primary rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 relative z-10 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <CheckCheck size={40} className="text-accent" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Application Received</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10">Our admissions officer will contact you within 24 hours to finalize your enrollment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      <div className="mb-10">
        <h3 className="font-heading text-3xl font-black text-white mb-2">Request Enrollment</h3>
        <p className="text-white/40">Enter your details and our team will be in touch.</p>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none transition-all focus:bg-white/10 focus:border-accent/50"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none transition-all focus:bg-white/10 focus:border-accent/50"
          />
          <input
            type="tel"
            placeholder="WhatsApp Phone"
            required
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none transition-all focus:bg-white/10 focus:border-accent/50"
          />
        </div>
        <textarea
          rows={4}
          placeholder="Which program are you interested in?"
          required
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none resize-none transition-all focus:bg-white/10 focus:border-accent/50"
        />
      </div>
      <button type="submit" disabled={loading}
        className="w-full mt-6 bg-accent text-primary py-6 rounded-2xl font-black text-xl hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex justify-center items-center gap-4 group disabled:opacity-60">
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={24} /> Processing...
          </span>
        ) : (
          <>
            Enroll Today <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}