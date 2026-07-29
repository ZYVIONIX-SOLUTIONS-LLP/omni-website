"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";

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

const CATS = ["All", "Hospitality & Healthcare", "Commercial & Retail", "Industrial & Infrastructure"] as const;
type Cat = typeof CATS[number];

const PROJECTS = [
  { 
    id: "p1", 
    src: "/taj-hotel-wayanad.jpg", 
    title: "Taj Hotel", 
    cat: "Hospitality & Healthcare" as Cat, 
    loc: "Padinharathara, Wayanad", 
    value: "₹6.0 Crore (600 Lakhs)", 
    status: "Completed",
    scope: "Complete electrification from supply point to final terminal equipment" 
  },
  { 
    id: "p2", 
    src: "/aster-mims-kasaragod.jpg", 
    title: "Aster Mims Hospital", 
    cat: "Hospitality & Healthcare" as Cat, 
    loc: "Kasaragod", 
    value: "₹7.0 Crore (700 Lakhs)", 
    status: "Completed",
    scope: "Turnkey electrification from supply point to terminal equipment" 
  },
  { 
    id: "p3", 
    src: "/ibni-resorts.jpg", 
    title: "IBNI Spa Resorts", 
    cat: "Hospitality & Healthcare" as Cat, 
    loc: "Madikeri, Karnataka", 
    value: "₹4.0 Crore (400 Lakhs)", 
    status: "Completed",
    scope: "Complete HT/LT resort electrification infrastructure" 
  },
  { 
    id: "p4", 
    src: "/khaleej-block-aster-mims.jpg", 
    title: "Khaleej Block - Aster Mims", 
    cat: "Hospitality & Healthcare" as Cat, 
    loc: "Kozhikode", 
    value: "₹1.1 Crore (110 Lakhs)", 
    status: "Completed",
    scope: "Complete electrification of hospital expansion block" 
  },
  { 
    id: "p5", 
    src: "/aster-mims-refurbishment.jpg", 
    title: "Aster Mims Refurbishment", 
    cat: "Hospitality & Healthcare" as Cat, 
    loc: "Kozhikode", 
    value: "₹1.6 Crore (160 Lakhs)", 
    status: "Completed",
    scope: "Level 5th & 7th interior electrical refurbishment & modifications" 
  },
  { 
    id: "p6", 
    src: "/bhima-jewellers.jpg", 
    title: "Bhima Jewellers", 
    cat: "Commercial & Retail" as Cat, 
    loc: "Kozhikode", 
    value: "₹50 Lakhs", 
    status: "Completed",
    scope: "Complete HT & LT Electrical Works" 
  },
  { 
    id: "p7", 
    src: "/bank-branches.jpg", 
    title: "SBI, Canara Bank, UBI Branches", 
    cat: "Commercial & Retail" as Cat, 
    loc: "Various Branches across Kerala", 
    value: "₹80 Lakhs", 
    status: "Completed",
    scope: "Turnkey electrical installations for multiple bank branches" 
  },
  { 
    id: "p8", 
    src: "/mandara-healing-space.jpg", 
    title: "Mandara Healing Space LLP by HiLITE", 
    cat: "Commercial & Retail" as Cat, 
    loc: "Kozhikode", 
    value: "₹60 Lakhs", 
    status: "Ongoing (2026-27)",
    scope: "HT & LT Electrical installations" 
  },
  { 
    id: "p9", 
    src: "/mathrubhumi-printing.png", 
    title: "Mathrubhumi Printing & Publishing", 
    cat: "Industrial & Infrastructure" as Cat, 
    loc: "Ramanattukara", 
    value: "₹7 Lakhs", 
    status: "Ongoing (2026-27)",
    scope: "Electrical panel & cable laying works for equipment installation" 
  },
];

const STATS = [
  { n: 35,   s: "+",  l: "Years Founder Experience" },
  { n: 20,   s: "+",  l: "Cr Total Project Value" },
  { n: 100,  s: "%",  l: "Safety & Compliance Record" },
  { n: 2,    s: " State", l: "Grade A Licenses (KL & KA)" },
];

function PCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const { isDark } = useTheme();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ delay: i * 0.04, duration: 0.45 }}
      className="relative rounded-2xl overflow-hidden group border shadow-sm flex flex-col justify-between pcard"
      style={{
        backgroundColor: isDark ? "#1c1c1c" : "#ffffff",
        borderColor: isDark ? "#2a2a2a" : "#f3f4f6",
      }}
    >
      <div className="relative w-full h-48 overflow-hidden bg-gray-900">
        <Image src={p.src} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <span className="text-[0.7rem] font-bold px-2.5 py-1 rounded-full bg-[#111111]/80 text-[#C8F400] backdrop-blur-md border border-white/10">
            {p.status}
          </span>
        </div>
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[0.65rem] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#C8F400] text-[#111111]">
            {p.value}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div
            className="text-[0.7rem] font-bold uppercase tracking-wider mb-1"
            style={{ color: isDark ? "#9ca3af" : "#9ca3af" }}
          >{p.cat}</div>
          <h3
            className="text-lg font-bold mb-1.5 transition-colors pcard-title"
            style={{ color: isDark ? "#ffffff" : "#111111" }}
          >{p.title}</h3>
          <p
            className="text-xs mb-3 flex items-center gap-1"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            📍 <span>{p.loc}</span>
          </p>
          <p
            className="text-xs leading-relaxed pt-3 border-t"
            style={{
              color: isDark ? "#d1d5db" : "#4b5563",
              borderColor: isDark ? "#2a2a2a" : "#f3f4f6",
            }}
          >{p.scope}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState<Cat>("All");
  const sRef = useRef<HTMLElement>(null);
  const sIv  = useInView(sRef as React.RefObject<Element>, { once: true });
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <div style={{ paddingTop: "68px", background: "#f9fafb" }}>
        <div className="relative py-14 lg:py-0 lg:h-[580px] flex items-center overflow-hidden">
          <div className="site-container w-full">
            <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 items-center">
              {/* Left text */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl lg:max-w-3xl"
              >
                <div className="overline mb-5">Our Proven Track Record</div>
                <h1 className="section-heading mb-5">
                  Flagship <span style={{ color: "#C8F400" }}>Electrical</span> Projects
                </h1>
                <p className="body-text mb-8 max-w-md">
                  From multi-crore resort electrification to hospital refurbishment and high-voltage power installations across South India.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute -right-12 top-0 bottom-0 w-[52vw] h-full"
          >
            <Image 
              src="/image/service-page/project-page-hero.png" 
              alt="Omni Electrics projects portfolio" 
              fill 
              className="object-contain object-right scale-105 origin-right" 
              sizes="50vw" 
              priority 
            />
          </motion.div>
        </div>
      </div>

      {/* Gallery */}
      <section className="section-y bg-white">
        <div className="site-container">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`ftab ${active === c ? "active" : ""}`}>{c}</button>
            ))}
          </div>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => <PCard key={p.id} p={p} i={i} />)}
            </AnimatePresence>
          </motion.div>
          <div className="mt-12 flex justify-center">
            <Link href="/contact" className="btn-dark">
              Discuss Your Project With Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
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

      {/* CTA */}
      <section className="section-y bg-white">
        <div className="site-container">
          <FadeUp className="text-center">
            <div className="overline mb-4 justify-center">Start Your Project</div>
            <h2 className="section-heading mb-4">Need Grade A Electrical Execution?</h2>
            <p className="body-text mb-8 max-w-md mx-auto">Get in touch with our engineering team for turnkey estimation, design, and execution.</p>
            <Link href="/contact" className="btn-dark">
              Get In Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
