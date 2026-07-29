"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

type Service = {
  icon: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
  longDesc: string;
  features: string[];
};

const SERVICES: Service[] = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Design & Engineering",
    tag: "Grade A Contracting",
    desc: "Experienced in electrical system design for generating stations up to 128MW, factories, hospitals, hotels, and commercial complexes.",
    image: "/image/service-page/service-page-hero.png.png",
    longDesc: "Our design and engineering team brings decades of expertise in creating robust, efficient, and compliant electrical systems. From initial load calculations to final single-line diagrams, we deliver precision engineering that meets IS and IEC standards.",
    features: [
      "Generating station design up to 128MW capacity",
      "Single-line diagram and panel layout drawings",
      "Load flow, short-circuit & protection co-ordination studies",
      "Factory, hospital, hotel & commercial complex design",
      "Compliance with IS 732, NBC, and IEC standards",
      "Energy audit and efficiency optimization reports",
    ],
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Supervision",
    tag: "On-Site Expertise",
    desc: "Professional supervision of electrical installations across residential complexes, hotels, hospitals, and large-scale commercial projects.",
    image: "/image/service-page/project-page-hero.png",
    longDesc: "We provide expert on-site supervision ensuring every installation meets design specifications and safety regulations. Our supervisors bring field-certified experience to manage contractors, quality-check workmanship, and ensure zero-defect delivery.",
    features: [
      "Dedicated certified supervisor for every project phase",
      "Daily progress reporting and documentation",
      "Contractor coordination and quality audits",
      "Verification against approved engineering drawings",
      "Residential complexes, hotels & hospital supervision",
      "As-built drawing preparation post-completion",
    ],
  },
  {
    icon: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
    title: "Operation & Maintenance",
    tag: "Peak Performance",
    desc: "Comprehensive operation and preventive maintenance services to keep electrical installations running at peak performance and safety.",
    image: "/image/service-page/service-page-hero.png.png",
    longDesc: "Maximize uptime and extend equipment lifespan with our structured Operation & Maintenance programs. We design bespoke maintenance schedules, perform thermal imaging, and handle all reactive fault rectification — keeping your systems safe and code-compliant.",
    features: [
      "Annual maintenance contracts (AMC) with defined SLAs",
      "Scheduled preventive maintenance and inspections",
      "Thermal imaging and thermographic surveys",
      "Switchgear, transformer & generator maintenance",
      "Log book maintenance and compliance reporting",
      "Reactive fault rectification within agreed response times",
    ],
  },
  {
    icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
    title: "Construction & Installation",
    tag: "End-to-End Execution",
    desc: "End-to-end construction and installation of electrical systems for factories, generating stations, and high-rise commercial structures.",
    image: "/image/service-page/project-page-hero.png",
    longDesc: "From cable laying and panel erection to bus duct installations, our certified installation teams execute complex electrical infrastructure with precision. We manage procurement, logistics, and site execution — delivering on schedule, on budget.",
    features: [
      "HT & LT cable laying, jointing and termination",
      "MV/LV switchgear, panel boards & DB installation",
      "Transformer, DG set and UPS system installation",
      "Earthing, lightning protection & surge protection",
      "Structured cabling and fire alarm integration",
      "High-rise, factory and generating station erection",
    ],
  },
  {
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Testing & Commissioning",
    tag: "Safety First",
    desc: "Rigorous testing and commissioning of electrical installations including 128MW generating stations to ensure safety and compliance.",
    image: "/image/service-page/service-page-hero.png.png",
    longDesc: "Our testing and commissioning service provides exhaustive pre-energisation checks and post-energisation validation. We use calibrated instruments to verify insulation resistance, protection relay settings, power quality and full-system functionality before handover.",
    features: [
      "Insulation resistance and continuity testing",
      "Protection relay calibration and testing",
      "Power quality analysis and harmonic studies",
      "HV/EHV cable pressure and HiPot testing",
      "Full-load trial runs for generating stations",
      "Commissioning reports, test certificates & handover docs",
    ],
  },
  {
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    title: "Emergency Services",
    tag: "24/7 Rapid Response",
    desc: "24/7 emergency support for electrical faults across all project types — from residential complexes to industrial power installations.",
    image: "/image/service-page/project-page-hero.png",
    longDesc: "Electrical emergencies can't wait. Our 24/7 rapid-response team is always on standby to diagnose and restore power across all installation types. With a stocked emergency vehicle and experienced fault-finders, we minimise downtime and safety risk.",
    features: [
      "24/7/365 emergency call response",
      "Rapid fault diagnosis with advanced test equipment",
      "Emergency switchgear and cable fault repair",
      "Generator backup and temporary power solutions",
      "Industrial, commercial and residential coverage",
      "Post-incident safety inspection and reporting",
    ],
  },
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
  const [activeService, setActiveService] = useState<Service | null>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeService]);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* ═══ SERVICE DETAIL MODAL ════════════════════════ */}
      <AnimatePresence>
        {activeService && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveService(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9998,
                background: "rgba(10,10,12,0.72)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.93, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.25rem",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  pointerEvents: "all",
                  width: "100%",
                  maxWidth: "600px",
                  maxHeight: "90vh",
                  borderRadius: "28px",
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow:
                    "0 40px 100px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="dark:bg-[#111]"
              >
                {/* Content panel */}
                <div
                  style={{
                    padding: "2.25rem 2rem",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {/* Header row: icon + title + close */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                      <div
                        style={{
                          width: "3.75rem",
                          height: "3.75rem",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #111111 0%, #2a2a2a 100%)",
                          border: "2px solid #C8F400",
                          boxShadow:
                            "inset 0 2px 4px rgba(200, 244, 0, 0.6), inset 0 -3px 6px rgba(0, 0, 0, 0.9), 0 8px 20px rgba(200, 244, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: "2.75rem",
                            height: "2.75rem",
                            borderRadius: "50%",
                            background: "linear-gradient(145deg, #C8F400 0%, #9cb800 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.35))" }}>
                            <path d={activeService.icon} />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#999",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {activeService.tag}
                        </div>
                        <h2
                          style={{
                            fontFamily: "var(--font-outfit),system-ui,sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(1.15rem,2.5vw,1.5rem)",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.15,
                            color: "#111",
                          }}
                          className="dark:text-white"
                        >
                          {activeService.title}
                        </h2>
                      </div>
                    </div>
                    {/* Close button */}
                    <button
                      onClick={() => setActiveService(null)}
                      style={{
                        width: "2.35rem",
                        height: "2.35rem",
                        borderRadius: "50%",
                        background: "#f5f5f7",
                        borderTop: "1.5px solid #ffffff",
                        borderLeft: "1.5px solid rgba(255, 255, 255, 0.9)",
                        borderBottom: "1.5px solid rgba(160, 165, 180, 0.45)",
                        borderRight: "1.5px solid rgba(180, 185, 200, 0.35)",
                        boxShadow:
                          "inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.95), inset -2px -2px 4px rgba(0, 0, 0, 0.15), 3px 6px 16px rgba(0, 0, 0, 0.18), 0 2px 4px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      aria-label="Close modal"
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.15))" }}>
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />

                  {/* Description */}
                  <div>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: 1.75,
                        color: "#444",
                        marginBottom: "1.5rem",
                      }}
                      className="dark:text-[#aaa]"
                    >
                      {activeService.longDesc}
                    </p>

                    {/* Feature list */}
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#999",
                        marginBottom: "0.75rem",
                      }}
                    >
                      What&apos;s Included
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", padding: 0, margin: 0, listStyle: "none" }}>
                      {activeService.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.625rem",
                            fontSize: "0.85rem",
                            color: "#333",
                            lineHeight: 1.55,
                          }}
                          className="dark:text-[#ccc]"
                        >
                          <span
                            style={{
                              width: "1.3rem",
                              height: "1.3rem",
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, rgba(200,244,0,0.25) 0%, rgba(160,200,0,0.15) 100%)",
                              borderTop: "1px solid rgba(255, 255, 255, 0.8)",
                              borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                              borderBottom: "1px solid rgba(120, 150, 0, 0.4)",
                              borderRight: "1px solid rgba(140, 170, 0, 0.3)",
                              boxShadow:
                                "inset 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 2px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.06)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          >
                            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#5a8200" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 0.5px 0.5px rgba(0,0,0,0.2))" }}>
                              <path d="M2 6l3 3 5-5" />
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                    <Link
                      href="/contact"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.85rem 1.5rem",
                        borderRadius: "14px",
                        fontWeight: 700,
                        fontSize: "0.925rem",
                        color: "#111111",
                        background: "linear-gradient(135deg, #d8fd24 0%, #9cb800 100%)",
                        borderTop: "1.5px solid rgba(255, 255, 255, 0.9)",
                        borderLeft: "1.5px solid rgba(255, 255, 255, 0.7)",
                        borderBottom: "1.5px solid rgba(100, 120, 0, 0.7)",
                        borderRight: "1.5px solid rgba(120, 140, 0, 0.6)",
                        boxShadow:
                          "inset 2px 2px 4px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.2), 0 6px 18px rgba(200, 244, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.1)",
                        textDecoration: "none",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onClick={() => setActiveService(null)}
                    >
                      Request a Quote
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.2))" }}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ HEADER ══════════════════════════════════════ */}
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

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute -right-12 top-0 bottom-0 w-[52vw] h-full"
          >
            <Image
              src="/image/service-page/service-page-hero.png.png"
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.06}>
                <button
                  onClick={() => setActiveService(s)}
                  className="service-card group h-full w-full text-left"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  <div>
                    <div className="icon-wrap mb-5">
                      <svg className="transition-transform duration-700 ease-out group-hover:rotate-[360deg]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d={s.icon} />
                      </svg>
                    </div>
                    <h3 className="card-title text-lg font-bold tracking-tight mb-2">{s.title}</h3>
                    <p className="text-xs leading-relaxed mb-6 text-[#86868b] dark:text-[#9ca3af]">{s.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-black dark:text-white group-hover:text-[#b0d900] transition-colors">
                    <span>Learn More</span>
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
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
                    Have an Electrical Project in Mind?
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
                  <a href="tel:+919387322262" className="service-card flex items-center gap-4 p-5 rounded-2xl group border border-white/10 hover:border-[#C8F400]/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ background: "#C8F400" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.1 6.1l1.48-1.48a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Call Us Now</p>
                      <p className="font-bold text-white">+91 9387322262</p>
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
          <ol className="circle-steps">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.65, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="icon">
                  {React.cloneElement(step.icon as React.ReactElement<any>, {
                    className: "w-7 h-7",
                    stroke: "currentColor"
                  })}
                </div>
                <div className="title">{step.title}</div>
                <div className="descr">{step.desc}</div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </main>
  );
}
