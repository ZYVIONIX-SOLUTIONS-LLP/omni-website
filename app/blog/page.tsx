"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const POSTS = [
  { id: "b1", src: "/project-commercial.png", date: "JULY 12, 2025", cat: "Home Tips", title: "How Smart Lighting Can Transform Your Home", excerpt: "Tips and insights about smart lighting technology while sharing thoughts on everything electrical." },
  { id: "b2", src: "/project-residential.png", date: "JULY 8, 2025",  cat: "Safety",   title: "Electrical Safety Tips Every Homeowner Should Know", excerpt: "Essential safety practices to protect your family and home from common electrical hazards." },
  { id: "b3", src: "/project-solar.png",       date: "JUNE 27, 2025", cat: "Energy",   title: "Benefits of Upgrading Your Electrical Panel", excerpt: "Why modernizing your electrical panel is one of the best investments for your property." },
  { id: "b4", src: "/project-industrial.png",  date: "JUNE 15, 2025", cat: "Industrial",title: "Industrial Wiring: Best Practices for 2025", excerpt: "Industry-leading standards shaping modern industrial electrical systems." },
  { id: "b5", src: "/project-hv.png",          date: "JUNE 5, 2025",  cat: "Solar",    title: "Solar Energy ROI: What to Expect in Your First Year", excerpt: "Real data and insights on returns from residential and commercial solar installations." },
  { id: "b6", src: "/project-hospital.png",    date: "MAY 22, 2025",  cat: "Maintenance",title: "Signs Your Home Needs an Electrical Inspection", excerpt: "Common warning signs indicating it's time for a professional electrical inspection." },
];

export default function BlogPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <div style={{ paddingTop: "68px", background: "#f9fafb" }}>
        <div className="site-container py-14 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="overline mb-4">Blog</div>
            <div className="grid lg:grid-cols-2 gap-6 items-end">
              <h1 className="section-heading">Insights &amp; Ideas<br />To Keep You Informed</h1>
              <p className="body-text max-w-sm">Tips, trends and expert insights on everything electrical — from home safety to industrial innovation.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog grid */}
      <section className="section-y bg-white">
        <div className="site-container">
          {/* Category pills */}
          <FadeUp className="flex flex-wrap gap-2 mb-9">
            {["All", "Home Tips", "Safety", "Energy", "Industrial", "Solar", "Maintenance"].map((c, i) => (
              <button key={c} className={`ftab ${i === 0 ? "active" : ""}`}>{c}</button>
            ))}
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.07}>
                <article className="blog-card h-full flex flex-col">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image src={p.src} alt={p.title} fill className="object-cover transition-transform duration-500 hover:scale-[1.05]" sizes="33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full" style={{ background: "#C8F400", color: "#111111" }}>{p.cat}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[0.65rem] font-bold tracking-wider mb-2.5" style={{ color: "#9ca3af" }}>{p.date}</p>
                    <h2 className="font-bold mb-2.5 leading-snug flex-1" style={{ fontSize: "0.9375rem", color: "#111111", letterSpacing: "-0.02em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {p.title}
                    </h2>
                    <p className="text-sm mb-5" style={{ color: "#9ca3af", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {p.excerpt}
                    </p>
                    <Link href="#" className="btn-ghost text-xs mt-auto">
                      Read More
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-9 flex justify-center">
            <Link href="#" className="btn-outline">View All Articles →</Link>
          </FadeUp>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="pb-20">
        <div className="site-container">
          <FadeUp>
            <div className="relative overflow-hidden rounded-3xl text-center px-8 py-14" style={{ background: "#111111" }}>
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }}
              />
              <div className="relative z-10">
                <div className="overline mb-4 justify-center" style={{ color: "#C8F400" }}>Newsletter</div>
                <h2 className="font-extrabold text-white mb-3"
                  style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.03em", fontFamily: "var(--font-outfit),system-ui,sans-serif" }}>
                  Stay Up to Date
                </h2>
                <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  Subscribe for expert tips, project spotlights, and company updates.
                </p>
                <form onSubmit={e => e.preventDefault()} className="flex gap-3 max-w-md mx-auto">
                  <input type="email" placeholder="Your Email Address" className="flex-1 min-w-0 px-4 py-3 text-sm rounded-xl outline-none"
                    style={{ background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }} />
                  <button type="submit" className="btn-lime shrink-0">
                    Subscribe
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </form>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
