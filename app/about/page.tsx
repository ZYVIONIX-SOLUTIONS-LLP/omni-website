"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, margin: "-6%" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={iv ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Accordion({ title, body, isOpen, onToggle }: { title: string; body: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: `1.5px solid ${isOpen ? "#C8F400" : "#e5e7eb"}` }}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="font-bold text-sm" style={{ color: "#111111" }}>{title}</span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
          style={{ background: isOpen ? "#C8F400" : "#f3f4f6" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#111" : "#6b7280"} strokeWidth="2.5"
            style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .3s" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>
      <div style={{ maxHeight: isOpen ? "200px" : "0", overflow: "hidden", transition: "max-height .35s ease" }}>
        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#6b7280" }}>{body}</p>
      </div>
    </div>
  );
}

const STATS = [
  { n: 20,   s: "+",  l: "Years Experience" },
  { n: 200, s: "+",  l: "Projects Completed" },
  { n: 99,   s: "%",  l: "Happy Clients" },
  { n: 100,   s: "+",  l: "Skilled Employees" },
];

const VALUES = [
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Innovation",  desc: "Pioneering new electrical technologies and sustainable energy solutions." },
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Safety",       desc: "ISO 45001 compliant with a zero-incident safety culture across all sites." },
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Teamwork",    desc: "Collaborative approach with skilled engineers committed to excellence." },
];

export default function AboutPage() {
  const sRef = useRef<HTMLElement>(null);
  const sIv  = useInView(sRef as React.RefObject<Element>, { once: true });
  const [activeAccordion, setActiveAccordion] = useState<number>(0);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <div style={{ paddingTop: "68px", background: "#f9fafb" }}>
        <div className="site-container py-14 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-xl">
            <div className="overline mb-4">About Us</div>
            <h1 className="section-heading mb-5">Powering Spaces<br /><span style={{ color: "#C8F400" }}>Empowering</span> Lives</h1>
            <p className="body-text">Over a decade of delivering safe, reliable, and innovative electrical solutions.</p>
          </motion.div>
        </div>
      </div>

      {/* Story section */}
      <section className="section-y bg-white">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <FadeUp>
              <div className="relative">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "3/4", maxHeight: "560px", borderRadius: "50% 30% 40% 40%/30% 50% 35% 55%", background: "#e5e7eb" }}
                >
                  <video
                    src="/video/about-section/Electrician_performing_maintenan…_202607171420.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute rounded-2xl shadow-xl px-5 py-4"
                  style={{ bottom: "-8px", right: "-8px", background: "#111111", minWidth: "160px", zIndex: 10 }}
                >
                  <div className="font-extrabold leading-none mb-1"
                    style={{ fontSize: "2.25rem", color: "#C8F400", letterSpacing: "-0.04em", fontFamily: "var(--font-outfit),system-ui,sans-serif" }}>
                    20+
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Years of Excellence</div>
                </motion.div>
              </div>
            </FadeUp>

            {/* Content */}
            <div>
              <FadeUp delay={0.05}>
                <div className="overline mb-4">Our Story</div>
                <h2 className="section-heading mb-5">Who We Are</h2>
                <p className="body-text mb-4">Omni Electrics is a trusted Class A Electrical Contractor founded to redefine electrical contracting standards — delivering precision engineering across residential, commercial, and industrial sectors.</p>
                <p className="body-text mb-8">Our certified team handles everything from residential wiring to high-voltage substations, solar EPC, and industrial automation, maintaining the highest quality and safety benchmarks.</p>
              </FadeUp>
              <FadeUp delay={0.1} className="flex flex-col gap-3 mb-8">
                <Accordion 
                  title="Our Mission" 
                  body="To deliver safe, reliable, and innovative electrical solutions that empower communities, businesses, and industries while upholding the highest safety and quality standards." 
                  isOpen={activeAccordion === 0}
                  onToggle={() => setActiveAccordion(0)}
                />
                <Accordion 
                  title="Our Vision" 
                  body="To be the most trusted electrical solutions provider in the region, driving sustainable energy practices and technological innovation in every project." 
                  isOpen={activeAccordion === 1}
                  onToggle={() => setActiveAccordion(1)}
                />
                <Accordion 
                  title="Our Values" 
                  body="Safety, Integrity, Innovation, Teamwork, and Customer Excellence — these core values guide every decision we make and every project we deliver." 
                  isOpen={activeAccordion === 2}
                  onToggle={() => setActiveAccordion(2)}
                />
              </FadeUp>
              <FadeUp delay={0.15}>
                <Link href="/contact" className="btn-dark">
                  Work With Us
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={sRef as React.RefObject<HTMLElement>} style={{ background: "#111111" }}>
        <div className="site-container py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={sIv ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <div className="font-extrabold leading-none mb-2"
                  style={{ fontSize: "clamp(2.25rem,4.5vw,3.25rem)", color: "#C8F400", letterSpacing: "-0.04em", fontFamily: "var(--font-outfit),system-ui,sans-serif" }}>
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y" style={{ background: "#f9fafb" }}>
        <div className="site-container">
          <FadeUp className="text-center mb-12">
            <div className="overline mb-4 justify-center">What Drives Us</div>
            <h2 className="section-heading">Our Core Values</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.08}>
                <div className="service-card text-center group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-200 group-hover:bg-[#C8F400]" style={{ background: "#f3f4f6" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={v.icon} /></svg>
                  </div>
                  <p className="card-title mb-3">{v.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
