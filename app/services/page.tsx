"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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

const SERVICES = [
  { icon: "M13 10V3L4 14h7v7l9-11h-7z",           title: "Wiring & Rewiring",         desc: "Safe, efficient wiring for your home or commercial properties." },
  { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Lighting Solutions",          desc: "Modern, energy-efficient lighting for every space." },
  { icon: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z", title: "Electrical Installation",     desc: "Complete electrical installations for offices and industries." },
  { icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2", title: "Panel Upgrade",               desc: "Upgrade your electrical panel for better performance." },
  { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z", title: "Maintenance & Repair",         desc: "Preventive maintenance to keep systems running optimally." },
  { icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", title: "Emergency Services",           desc: "24/7 emergency support for your electrical needs." },
];

const STEPS = [
  { 
    n: "01", 
    title: "Consultation", 
    desc: "Understanding your requirements, site conditions, and project goals.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 7h8" />
        <path d="M8 11h5" />
      </svg>
    ),
    bg: "dots"
  },
  { 
    n: "02", 
    title: "Site Inspection", 
    desc: "Detailed site survey and assessment of existing infrastructure.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    bg: "lines"
  },
  { 
    n: "03", 
    title: "Planning", 
    desc: "Engineering drawings, load calculations, and material procurement.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    bg: "dots"
  },
  { 
    n: "04", 
    title: "Installation", 
    desc: "Certified technicians execute with precision and safety protocols.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M6 8a6 6 0 0 1 12 0" />
        <line x1="12" y1="2" x2="12" y2="4" />
      </svg>
    ),
    bg: "lines"
  },
  { 
    n: "05", 
    title: "Testing", 
    desc: "Full system commissioning and safety inspections.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M13 8l-3 4h4l-3 4" />
      </svg>
    ),
    bg: "lines"
  },
  { 
    n: "06", 
    title: "Maintenance", 
    desc: "Ongoing support and preventive maintenance for long-term reliability.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    bg: "dots"
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* ═══ HEADER ══════════════════════════════════════ */}
      <div style={{ paddingTop: "68px", background: "#ffffff" }}>
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
                <div className="overline mb-5">Our Services</div>
                <h1 className="section-heading mb-5">
                  Smart <span style={{ color: "#C8F400" }}>Solutions</span> For Every Need
                </h1>
                <p className="body-text mb-8 max-w-md">
                  We provide end-to-end electrical solutions with a focus on safety, efficiency, and innovation.
                </p>
                <Link href="/contact" className="btn-dark">
                  Get a Free Quote
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right image - positioned absolutely to touch the right screen edge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute -right-12 top-0 bottom-0 w-[52vw] h-full"
          >
            <Image 
              src="/services-hero-v4.png" 
              alt="Modern villa electrical services" 
              fill 
              className="object-contain object-right scale-105 origin-right" 
              sizes="50vw" 
              priority 
            />
          </motion.div>
        </div>
      </div>

      {/* ═══ SERVICES GRID ══════════════════════════════ */}
      <section className="section-y bg-white">
        <div className="site-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.06}>
                <div className="service-card h-full">
                  <div className="icon-wrap mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <p className="card-title mb-2">{s.title}</p>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#9ca3af" }}>{s.desc}</p>
                  <Link href="/contact" className="btn-ghost text-xs">
                    Learn More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERT CTA CARD ════════════════════════════ */}
      <section className="pb-20">
        <div className="site-container">
          <FadeUp>
            <div
              className="relative overflow-hidden rounded-3xl px-10 py-12"
              style={{ background: "#111111" }}
            >
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }}
              />
              <div className="relative z-10 grid lg:grid-cols-2 items-center gap-8">
                <div>
                  <h2
                    className="font-extrabold text-white mb-2 leading-tight"
                    style={{ fontSize: "clamp(1.375rem,2.8vw,2rem)", letterSpacing: "-0.03em", fontFamily: "var(--font-outfit),system-ui,sans-serif" }}
                  >
                    Need an Expert Electrician?
                    <br />
                    <span style={{ color: "#C8F400" }}>We're just a call away.</span>
                  </h2>
                  <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                    Our certified team is ready to handle any electrical challenge, big or small.
                  </p>
                  <Link href="/contact" className="btn-lime">
                    Get a Free Quote
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                <div className="hidden lg:flex justify-end">
                  <a href="tel:+15551234567" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ background: "#C8F400" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.1 6.1l1.48-1.48a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Call Us Now</p>
                      <p className="font-bold text-white">+1 (555) 123-4567</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ PROCESS ════════════════════════════════════ */}
      <section className="section-y" style={{ background: "#f9fafb" }}>
        <div className="site-container">
          <FadeUp className="text-center mb-12">
            <div className="overline mb-4 justify-center">Our Process</div>
            <h2 className="section-heading">How We Work</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.07}>
                <div
                  className="relative bg-white p-6 rounded-2xl transition-all duration-250 group cursor-pointer border-l-[4px] border-l-[#C8F400] flex gap-5 items-start overflow-hidden shadow-sm"
                  style={{ borderTop: "1.5px solid #e5e7eb", borderRight: "1.5px solid #e5e7eb", borderBottom: "1.5px solid #e5e7eb" }}
                  onMouseEnter={(e) => { 
                    const el = e.currentTarget as HTMLElement; 
                    el.style.borderTopColor = "#C8F400"; 
                    el.style.borderRightColor = "#C8F400"; 
                    el.style.borderBottomColor = "#C8F400"; 
                    el.style.transform = "translateY(-4px)"; 
                    el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)"; 
                  }}
                  onMouseLeave={(e) => { 
                    const el = e.currentTarget as HTMLElement; 
                    el.style.borderTopColor = "#e5e7eb"; 
                    el.style.borderRightColor = "#e5e7eb"; 
                    el.style.borderBottomColor = "#e5e7eb"; 
                    el.style.transform = ""; 
                    el.style.boxShadow = ""; 
                  }}
                >
                  {/* Faint large step number on the top-right */}
                  <div className="absolute top-4 right-5 font-black text-5xl leading-none select-none text-[#C8F400]/10" style={{ letterSpacing: "-0.05em" }}>{step.n}</div>

                  {/* Background patterns */}
                  {step.bg === "dots" ? (
                    <svg className="absolute bottom-2 right-2 opacity-[0.08] pointer-events-none" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="5" cy="5" r="2" fill="#C8F400" />
                      <circle cx="15" cy="5" r="2" fill="#C8F400" />
                      <circle cx="25" cy="5" r="2" fill="#C8F400" />
                      <circle cx="35" cy="5" r="2" fill="#C8F400" />
                      <circle cx="5" cy="15" r="2" fill="#C8F400" />
                      <circle cx="15" cy="15" r="2" fill="#C8F400" />
                      <circle cx="25" cy="15" r="2" fill="#C8F400" />
                      <circle cx="35" cy="15" r="2" fill="#C8F400" />
                      <circle cx="5" cy="25" r="2" fill="#C8F400" />
                      <circle cx="15" cy="25" r="2" fill="#C8F400" />
                      <circle cx="25" cy="25" r="2" fill="#C8F400" />
                      <circle cx="35" cy="25" r="2" fill="#C8F400" />
                      <circle cx="5" cy="35" r="2" fill="#C8F400" />
                      <circle cx="15" cy="35" r="2" fill="#C8F400" />
                      <circle cx="25" cy="35" r="2" fill="#C8F400" />
                      <circle cx="35" cy="35" r="2" fill="#C8F400" />
                    </svg>
                  ) : (
                    <svg className="absolute -bottom-6 -right-6 opacity-[0.08] pointer-events-none" width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="#C8F400" strokeWidth="2.5">
                      <circle cx="100" cy="100" r="80" />
                      <circle cx="100" cy="100" r="60" />
                      <circle cx="100" cy="100" r="40" />
                      <circle cx="100" cy="100" r="20" />
                    </svg>
                  )}

                  {/* Left Column: Small step badge + Large circular icon */}
                  <div className="flex flex-col gap-4 items-start shrink-0 relative z-10">
                    {/* Small number badge */}
                    <div className="w-8 h-5 rounded-[4px] bg-[#C8F400] flex items-center justify-center font-bold text-[0.65rem] text-[#111111] leading-none">
                      {step.n}
                    </div>

                    {/* Circular Icon Wrapper */}
                    <div className="w-14 h-14 rounded-full bg-[#f4fadc] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#C8F400]/20">
                      {step.icon}
                    </div>
                  </div>

                  {/* Right Column: Text Content */}
                  <div className="flex-1 pt-1.5 relative z-10">
                    <p className="font-extrabold text-sm text-[#111111] mb-1.5 group-hover:text-accent-dim transition-colors duration-200">{step.title}</p>
                    <p className="text-[0.7rem] leading-relaxed text-gray-500 max-w-[190px]">{step.desc}</p>
                  </div>
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
