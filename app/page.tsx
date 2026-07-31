"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Grade A Contractors", desc: "Licensed in Kerala, Karnataka & Qatar UPDA Class A" },
  { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "One India One License", desc: "Spreading operations nationwide under CEA regulations" },
  { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "Statutory Compliant", desc: "Full GST, IT, ESI, PF registrations & insured force" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Turnkey Execution", desc: "From point of supply to terminal equipment" },
];

const SERVICES = [
  { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", title: "Commercial & Healthcare", desc: "Turnkey HT/LT electrification for hospitals, luxury resorts, and high-rises." },
  { icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", title: "Power Stations & Industrial", desc: "Up to 128MW generating stations, heavy cable laying, and transformer substations." },
  { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z", title: "Testing & Commissioning", desc: "In-house tools and testing as per latest Indian (IS) and IEC standards." },
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", title: "Drawings & Estimation", desc: "Complete in-house CAD drafting, estimation, billing, and Powerplay project tracking." },
];

const STATS = [
  { n: 35,   s: "+",  l: "Years Founder Experience" },
  { n: 128,  s: "MW", l: "Power Station Handled" },
  { n: 7500, s: " sqft", l: "Office & Godown Facilities" },
  { n: 100,  s: "%",  l: "Statutory Compliance" },
];

const BRANDS = ["Schneider Electric", "GM Modular", "Orient Electric", "Tisva Lighting"];

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
      title: "GRADE A ELECTRICAL",
      highlight: "CONTRACTORS",
      desc: "Turnkey electrical engineering solutions adhering to IS, IEC & CEA regulations nationwide."
    },
    {
      title: "POWERING MEGA PROJECTS",
      highlight: "UP TO 128 MW",
      desc: "Delivering complete electrification for luxury resorts, super-specialty hospitals, and industrial power plants."
    },
    {
      title: "ONE INDIA ONE LICENSE",
      highlight: "NATIONWIDE REACH",
      desc: "Headquartered in Kozhikode with 7,500 sq.ft. facilities, executing turnkey projects across India."
    },
    {
      title: "DIRECT BRAND DEALERSHIPS",
      highlight: "SCHNEIDER, GM, ORIENT",
      desc: "Direct supply partner with top global manufacturers ensuring authentic, premium quality installations."
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
      <section className="hero-video-section relative w-full h-[88vh] lg:h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {/* Video background */}
        <video
          src="/video/about-section/omni-homepage-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
          style={{ transform: "scale(1)", transformOrigin: "center" }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/90 pointer-events-none" />

        {/* Text Overlays */}
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
              <h2 
                className="font-extrabold uppercase tracking-tight !text-white mb-6"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 4.25rem)",
                  lineHeight: 1.05,
                  fontFamily: "var(--font-outfit), var(--font-inter), sans-serif",
                }}
              >
                {FEATURES[activeIndex].title}
                <br />
                <span className="!text-[#C8F400]" style={{ color: "#C8F400" }}>{FEATURES[activeIndex].highlight}</span>
              </h2>

              <p className="!text-white/80 text-sm md:text-base max-w-lg leading-relaxed mb-8">
                {FEATURES[activeIndex].desc}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/services" className="btn-lime rounded-full px-7 py-3 text-xs md:text-sm shadow-lg shadow-accent/20 !text-black">
                  Explore Services
                </Link>
                <Link href="/contact" className="btn-outline rounded-full px-7 py-3 text-xs md:text-sm !border-white/30 !text-white hover:!bg-white hover:!text-black">
                  Get a Free Quote
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ TRUST STRIP ════════════════════════════════ */}
      <section style={{ background: "#111111" }}>
        <div className="site-container py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST.map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.07}>
                <div className="flex items-start gap-3.5 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "linear-gradient(145deg, #09090b 0%, #161619 100%)",
                      borderTop: "1.5px solid #000000",
                      borderLeft: "1.5px solid #000000",
                      borderBottom: "1.5px solid rgba(255, 255, 255, 0.12)",
                      borderRight: "1.5px solid rgba(255, 255, 255, 0.08)",
                      boxShadow:
                        "inset 2.5px 2.5px 6px rgba(0, 0, 0, 0.95), inset -1.5px -1.5px 4px rgba(255, 255, 255, 0.05), 0 0 10px rgba(200, 244, 0, 0.1)",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8F400" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 4px rgba(200,244,0,0.5))" }}>
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

      {/* ═══ BRAND PARTNERSHIPS STRIP (Inverted Skeuomorphism) ═════════════════ */}
      <section className="py-8 bg-white dark:bg-[#0a0a0c] brand-section flex justify-center overflow-hidden transition-colors duration-300">
        <div className="site-container flex justify-center max-w-4xl">
          <div
            className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-6 px-6 py-3 rounded-full overflow-hidden brand-notch-bar bg-[#e5e9f0] dark:bg-[#0d0d0f]"
            style={{
              borderRadius: "100px",
            }}
          >
            <span className="text-[0.68rem] font-black uppercase tracking-widest text-[#111111] dark:text-[#C8F400] flex items-center gap-2 shrink-0 z-10 brand-notch-title pr-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111111] dark:bg-[#C8F400] shadow-[0_0_6px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_rgba(200,244,0,0.8)]" />
              Authorized Dealerships & Partners:
            </span>


            {/* Marquee ticker moving Left -> Right */}
            <div className="relative w-full overflow-hidden flex items-center">
              <motion.div
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 30,
                }}
                className="flex items-center gap-8 whitespace-nowrap"
              >
                {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
                  <span
                    key={`${b}-${i}`}
                    className="text-xs font-extrabold brand-text-item hover:text-[#3b5200] dark:hover:text-[#C8F400] transition-colors cursor-default inline-flex items-center gap-8"
                  >
                    <span className="brand-text-label">{b}</span>
                    <span className="w-2 h-2 rounded-full shrink-0 brand-dot-sep" style={{ background: "#000000", minWidth: "8px", minHeight: "8px" }} />
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW ══════════════════════════ */}
      <section className="section-y bg-white">
        <div className="site-container">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-start">

            {/* Left */}
            <FadeUp>
              <div className="overline mb-4">Grade A Contracting</div>
              <h2 className="section-heading mb-5">
                Complete Turnkey<br />
                Electrical Engineering<br />
                & Execution
              </h2>
              <p className="body-text mb-8" style={{ maxWidth: "340px" }}>
                From high-voltage stations to resort and hospital electrification, we handle supply, panel wiring, testing, and commissioning.
              </p>
              <Link href="/services" className="btn-dark">
                View All Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </FadeUp>

            {/* Right responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SERVICES.map((s, i) => (
                <FadeUp key={s.title} delay={0.06 + i * 0.07}>
                  <div className="service-card h-full group">
                    <div className="icon-wrap mb-4">
                      <svg className="transition-transform duration-700 ease-out group-hover:rotate-[360deg]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d={s.icon} />
                      </svg>
                    </div>
                    <p className="card-title text-base font-bold tracking-tight mb-1.5">{s.title}</p>
                    <p className="text-xs leading-relaxed text-[#86868b] dark:text-[#9ca3af]">{s.desc}</p>
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
              <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }}
              />

              <div className="grid lg:grid-cols-[1fr_auto] items-stretch gap-0">
                <div className="px-8 sm:px-14 py-12 lg:py-14">
                  <h2
                    className="font-extrabold text-white mb-3 leading-tight"
                    style={{
                      fontSize: "clamp(1.625rem,3.5vw,2.625rem)",
                      letterSpacing: "-0.03em",
                      fontFamily: "var(--font-outfit),system-ui,sans-serif",
                    }}
                  >
                    Need Grade A Electrical Contracting?
                  </h2>
                  <p className="text-sm mb-8 max-w-sm" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                    Consult with founder Amritlal V.K. and our engineering team for full project estimation and design.
                  </p>
                  <Link href="/contact" className="btn-lime">
                    Get a Free Quote
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="relative hidden lg:block w-72 xl:w-80 h-full min-h-[220px] overflow-hidden" style={{ borderRadius: "0 1.5rem 1.5rem 0" }}>
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
                        sizes="320px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(17,17,17,0.4) 0%, transparent 40%)" }}
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
              <div className="overline mb-4">Featured Projects</div>
              <h2 className="section-heading" style={{ maxWidth: "420px" }}>
                Multi-Crore Electrical<br />Projects Delivered
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="body-text max-w-xs" style={{ textAlign: "right" }}>
                Proven execution across super-specialty hospitals, luxury resorts, and high-voltage commercial structures.
              </p>
            </FadeUp>
          </div>

          {/* 2×3 gallery */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { src: "/taj-hotel-wayanad.jpg", title: "Taj Hotel, Wayanad", cat: "₹6.0 Crore (600L)", loc: "Wayanad" },
              { src: "/aster-mims-kasaragod.jpg", title: "Aster Mims Hospital", cat: "₹7.0 Crore (700L)", loc: "Kasaragod" },
              { src: "/ibni-resorts.jpg", title: "IBNI Spa Resorts", cat: "₹4.0 Crore (400L)", loc: "Madikeri, Karnataka" },
              { src: "/khaleej-block-aster-mims.jpg", title: "Khaleej Block - Aster Mims", cat: "₹1.1 Crore (110L)", loc: "Kozhikode" },
              { src: "/bhima-jewellers.jpg", title: "Bhima Jewellers HT/LT Works", cat: "₹50 Lakhs", loc: "Kozhikode" },
              { src: "/mandara-healing-space.jpg", title: "Mandara Healing Space by HiLITE", cat: "₹60 Lakhs (Ongoing)", loc: "Kozhikode" },
            ].map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.06}>
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4"
                    style={{ background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%)" }}
                  >
                    <span
                      className="text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full w-fit mb-2"
                      style={{ background: "#C8F400", color: "#111111" }}
                    >
                      {p.cat}
                    </span>
                    <p className="text-white font-bold text-base leading-snug">{p.title}</p>
                    <p className="text-xs text-white/70 mt-0.5">📍 {p.loc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-8 flex justify-center">
            <Link href="/portfolio" className="btn-outline">
              View All 9 Projects →
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
