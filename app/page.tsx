"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Animated counter ── */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const iv  = useInView(ref, { once: true });
  useEffect(() => {
    if (!iv) return;
    let s: number | null = null;
    const raf = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1600, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(raf); else setN(to);
    };
    requestAnimationFrame(raf);
  }, [iv, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── Scroll fade-up ── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={iv ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ── */
const TRUST = [
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Certified Professionals", desc: "Licensed and experienced technicians" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "24/7 Availability", desc: "We're here when you need us" },
  { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "Safe & Reliable Solutions", desc: "Safety is our highest priority" },
  { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Sustainable & Smart", desc: "Energy-efficient solutions for a better future" },
];

const SERVICES = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", title: "Residential Electrical", desc: "Smart solutions for modern homes." },
  { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", title: "Commercial Electrical", desc: "Reliable systems for your business." },
  { icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", title: "Industrial Electrical", desc: "Powering industries with efficiency." },
  { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z", title: "Maintenance & Repair", desc: "Fast support for uninterrupted power." },
];

const STATS = [
  { n: 20,   s: "+",  l: "Years Experience" },
  { n: 200, s: "+",  l: "Projects Completed" },
  { n: 99,   s: "%",  l: "Client Satisfaction" },
  { n: 100,   s: "+", l: "Skilled Employees" },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const SLIDES = [
    "/slide-1.jpg", 
    "/slide-2.jpg", 
    "/slide-3.jpg", 
    "/slide-4.jpg",
    "/slide-5.jpg",
    "/slide-6.jpg",
    "/slide-7.jpg",
    "/slide-8.jpg"
  ];

  const FEATURES = [
    {
      title: "ELECTRICAL SOLUTIONS",
      highlight: "THAT EMPOWER",
      desc: "Innovative, safe & sustainable electrical services for modern spaces."
    },
    {
      title: "SUSTAINABLE SOLAR EPC",
      highlight: "GREEN ENERGY",
      desc: "High efficiency solar installations powering residential and commercial grids."
    },
    {
      title: "CERTIFIED SAFETY",
      highlight: "ZERO ACCIDENTS",
      desc: "Rigorous standards and panel upgrades designed for absolute safety."
    },
    {
      title: "24/7 DEDICATED SUPPORT",
      highlight: "ALWAYS ON",
      desc: "Prompt emergency response and intelligent building automation."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white">
      <Navbar />

      {/* ═══ AUTO-PLAYING HERO SEQUENCE ════════════════ */}
      <section className="relative w-full h-[88vh] lg:h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {/* Video background */}
        <video
          src="/video/I_want_a_animation_just_like_t.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
        />
        
        {/* Dark Overlay for premium text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/90 pointer-events-none" />

        {/* Text Overlays based on activeIndex */}
        <div className="site-container w-full relative z-25 flex items-center justify-center h-full mt-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto"
            >
              {/* Tag capsule */}
              

              {/* Headline */}
              <h2 
                className="font-extrabold uppercase tracking-tight text-white mb-6"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                  lineHeight: 1.05,
                  fontFamily: "var(--font-outfit), var(--font-inter), sans-serif",
                }}
              >
                {FEATURES[activeIndex].title}
                <br />
                <span style={{ color: "#C8F400" }}>{FEATURES[activeIndex].highlight}</span>
              </h2>

              {/* Description */}
              <p className="text-white/80 text-sm md:text-base max-w-lg leading-relaxed mb-8">
                {FEATURES[activeIndex].desc}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/services" className="btn-lime rounded-full px-7 py-3 text-xs md:text-sm shadow-lg shadow-accent/20">
                  Explore Services
                </Link>
                <Link href="/contact" className="btn-outline rounded-full px-7 py-3 text-xs md:text-sm !border-white/30 !text-white hover:!bg-white hover:!text-black">
                  Get a Free Quote
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic navigation dots for sequences */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {FEATURES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === idx ? "24px" : "8px",
                background: activeIndex === idx ? "#C8F400" : "rgba(255,255,255,0.4)"
              }}
              aria-label={`Go to feature ${idx + 1}`}
            />
          ))}
        </div> */}
      </section>

      {/* ═══ TRUST STRIP ════════════════════════════════ */}
      <section style={{ background: "#111111" }}>
        <div className="site-container py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST.map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.07}>
                <div className="flex items-start gap-3.5 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(200,244,0,0.12)" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8F400" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d={t.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-snug" style={{ color: "#ffffff" }}>{t.title}</p>
                    <p className="text-xs mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>{t.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW ══════════════════════════ */}
      <section className="section-y bg-white">
        <div className="site-container">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-start">

            {/* Left */}
            <FadeUp>
              <div className="overline mb-4">What We Do</div>
              <h2 className="section-heading mb-5">
                Complete Electrical<br />
                Solutions Under<br />
                One Roof
              </h2>
              <p className="body-text mb-8" style={{ maxWidth: "340px" }}>
                From small fixes to large installations, we deliver excellence in every connection.
              </p>
              <Link href="/services" className="btn-dark">
                View All Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </FadeUp>

            {/* Right responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map((s, i) => (
                <FadeUp key={s.title} delay={0.06 + i * 0.07}>
                  <div className="service-card h-full group">
                    <div className="icon-wrap mb-4">
                      <svg className="transition-transform duration-500 group-hover:rotate-[360deg]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d={s.icon} />
                      </svg>
                    </div>
                    <p className="card-title mb-1.5">{s.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{s.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ════════════════════════════════ */}
      <section style={{ background: "#111111" }}>
        <div className="site-container py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <FadeUp key={s.l} delay={i * 0.08}>
                <div
                  className="font-extrabold leading-none mb-2"
                  style={{
                    fontSize: "clamp(2.25rem,4.5vw,3.25rem)",
                    color: "#C8F400",
                    letterSpacing: "-0.04em",
                    fontFamily: "var(--font-outfit),system-ui,sans-serif",
                  }}
                >
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {s.l}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA CARD ═══════════════════════════════════ */}
      <section className="section-y" style={{ background: "#f9fafb" }}>
        <div className="site-container">
          <FadeUp>
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{ background: "#111111" }}
            >
              {/* Dot grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }}
              />

              <div className="grid lg:grid-cols-[1fr_auto] items-end gap-0">
                {/* Text */}
                <div className="px-8 sm:px-14 py-12 lg:py-14">
                  <h2
                    className="font-extrabold text-white mb-3 leading-tight"
                    style={{
                      fontSize: "clamp(1.625rem,3.5vw,2.625rem)",
                      letterSpacing: "-0.03em",
                      fontFamily: "var(--font-outfit),system-ui,sans-serif",
                    }}
                  >
                    Have an Electrical Project in Mind?
                  </h2>
                  <p className="text-sm mb-8 max-w-sm" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                    Let's turn your ideas into powerful solutions.
                  </p>
                  <Link href="/contact" className="btn-lime">
                    Get a Free Quote
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Person image slideshow */}
                <div className="relative hidden lg:block w-72 xl:w-80 self-end overflow-hidden" style={{ height: "300px", borderRadius: "20px 20px 0 0" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slideIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={SLIDES[slideIndex]}
                        alt="Electrical expert"
                        fill
                        className="object-cover object-center"
                        style={{ borderRadius: "20px 20px 0 0" }}
                        sizes="320px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(17,17,17,0.5) 0%, transparent 50%)", borderRadius: "20px 20px 0 0" }}
                  />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ PROJECTS PREVIEW ═══════════════════════════ */}
      <section className="section-y bg-white">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <FadeUp>
              <div className="overline mb-4">Our Projects</div>
              <h2 className="section-heading" style={{ maxWidth: "360px" }}>
                Delivering Power<br />Across Every Project
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="body-text max-w-xs" style={{ textAlign: "right" }}>
                Explore some of our most recent work that reflects our commitment to quality and excellence.
              </p>
            </FadeUp>
          </div>

          {/* Filter tabs */}
          <FadeUp delay={0.05} className="flex flex-wrap gap-2 mb-7">
            {["All", "Residential", "Commercial", "Industrial"].map((c, i) => (
              <button key={c} className={`ftab ${i === 0 ? "active" : ""}`}>{c}</button>
            ))}
          </FadeUp>

          {/* 2×3 gallery */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { src: "/project-residential.png", title: "Modern Smart Villa",          cat: "Residential" },
              { src: "/project-commercial.png",  title: "Corporate Office Building",    cat: "Commercial" },
              { src: "/project-industrial.png",  title: "Industrial Manufacturing Unit",cat: "Industrial" },
              { src: "/project-hv.png",          title: "Luxury Apartments",            cat: "Residential" },
              { src: "/project-solar.png",       title: "Shopping Mall Complex",        cat: "Commercial" },
              { src: "/project-hospital.png",    title: "Warehouse Lighting Upgrade",   cat: "Industrial" },
            ].map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.06}>
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4"
                    style={{ background: "linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 55%)" }}
                  >
                    <span
                      className="text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full w-fit mb-2"
                      style={{ background: "#C8F400", color: "#111111" }}
                    >
                      {p.cat}
                    </span>
                    <p className="text-white font-bold text-sm leading-snug">{p.title}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-8 flex justify-center">
            <Link href="/portfolio" className="btn-outline">
              View All Projects →
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
