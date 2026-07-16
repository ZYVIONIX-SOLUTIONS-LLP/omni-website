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
  { n: "01", title: "Consultation",    desc: "Understanding your requirements, site conditions, and project goals." },
  { n: "02", title: "Site Inspection", desc: "Detailed site survey and assessment of existing infrastructure." },
  { n: "03", title: "Planning",        desc: "Engineering drawings, load calculations, and material procurement." },
  { n: "04", title: "Installation",    desc: "Certified technicians execute with precision and safety protocols." },
  { n: "05", title: "Testing",         desc: "Full system commissioning and safety inspections." },
  { n: "06", title: "Maintenance",     desc: "Ongoing support and preventive maintenance for long-term reliability." },
];

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* ═══ HEADER ══════════════════════════════════════ */}
      <div style={{ paddingTop: "68px", background: "#f9fafb" }}>
        <div className="site-container py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="overline mb-5">Our Services</div>
              <h1 className="section-heading mb-5">
                Smart Solutions<br />For Every Need
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

            {/* Right blob image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4/3", borderRadius: "50% 30% 40% 40%/30% 50% 30% 50%", background: "#e5e7eb" }}
              >
                <Image src="/project-hv.png" alt="Electrical services" fill className="object-cover" sizes="50vw" priority />
              </div>
            </motion.div>
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.07}>
                <div
                  className="relative bg-white p-6 rounded-2xl transition-all duration-250 group cursor-pointer"
                  style={{ border: "1.5px solid #e5e7eb" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#C8F400"; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#e5e7eb"; el.style.transform = ""; el.style.boxShadow = ""; }}
                >
                  <div className="absolute top-4 right-5 font-black text-5xl leading-none select-none" style={{ color: "rgba(200,244,0,0.18)", letterSpacing: "-0.05em" }}>{step.n}</div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm mb-4"
                    style={{ background: "#C8F400", color: "#111111" }}
                  >
                    {step.n}
                  </div>
                  <p className="card-title mb-2">{step.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{step.desc}</p>
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
