"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

const CATS = ["All", "Residential", "Commercial", "Industrial"] as const;
type Cat = typeof CATS[number];

const PROJECTS = [
  { id: "p1", src: "/project-residential.png", title: "Modern Smart Villa",          cat: "Residential" as Cat, loc: "California, USA",  year: "2024" },
  { id: "p2", src: "/project-commercial.png",  title: "Corporate Office Building",    cat: "Commercial"  as Cat, loc: "New York, USA",    year: "2024" },
  { id: "p3", src: "/project-industrial.png",  title: "Industrial Manufacturing Unit",cat: "Industrial"  as Cat, loc: "Gujarat, India",   year: "2023" },
  { id: "p4", src: "/project-hv.png",          title: "Luxury Apartments",            cat: "Residential" as Cat, loc: "Chicago, USA",     year: "2023" },
  { id: "p5", src: "/project-solar.png",       title: "Shopping Mall Complex",        cat: "Commercial"  as Cat, loc: "Miami, USA",       year: "2023" },
  { id: "p6", src: "/project-hospital.png",    title: "Warehouse Lighting Upgrade",   cat: "Industrial"  as Cat, loc: "Dallas, USA",      year: "2022" },
];

const STATS = [
  { n: 20,   s: "+",  l: "Years Experience" },
  { n: 200, s: "+",  l: "Projects Completed" },
  { n: 99,   s: "%",  l: "Happy Clients" },
  { n: 100,   s: "+",  l: "Skilled Employees" },
];

function PCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ delay: i * 0.05, duration: 0.45 }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ aspectRatio: "4/3" }}
    >
      <Image src={p.src} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.07]" sizes="33vw" />
      <div className="absolute top-3 right-3 z-10">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
          {p.year}
        </span>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-4"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 55%)" }}
      >
        <span className="text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full w-fit mb-2" style={{ background: "#C8F400", color: "#111111" }}>{p.cat}</span>
        <p className="text-white font-bold text-sm">{p.title}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>📍 {p.loc}</p>
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
        <div className="site-container py-14 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="overline mb-4">Our Projects</div>
            <div className="grid lg:grid-cols-2 gap-6 items-end">
              <h1 className="section-heading">Delivering <span style={{ color: "#C8F400" }}>Power</span><br />Across Every Project</h1>
              <p className="body-text max-w-sm">Explore some of our most recent work that reflects our commitment to quality and excellence.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery */}
      <section className="section-y bg-white">
        <div className="site-container">
          <div className="flex flex-wrap gap-2 mb-7">
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`ftab ${active === c ? "active" : ""}`}>{c}</button>
            ))}
          </div>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => <PCard key={p.id} p={p} i={i} />)}
            </AnimatePresence>
          </motion.div>
          <div className="mt-9 flex justify-center">
            <Link href="/contact" className="btn-outline">View All Projects →</Link>
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
            <h2 className="section-heading mb-4">Have a Project in Mind?</h2>
            <p className="body-text mb-8 max-w-md mx-auto">We are ready to power your ideas. Contact us for a free consultation and quote.</p>
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
