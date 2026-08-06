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

type Project = {
  id: string;
  src: string;
  title: string;
  cat: Cat;
  loc: string;
  value: string;
  status: string;
  scope: string;
  year?: string;
  client?: string;
  highlights: string[];
  longDesc: string;
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    src: "/taj-hotel-wayanad.jpg",
    title: "Taj Hotel",
    cat: "Hospitality & Healthcare",
    loc: "Padinharathara, Wayanad",
    value: "₹6.0 Crore (600 Lakhs)",
    status: "Completed",
    year: "2022",
    client: "Taj Hotels & Resorts",
    scope: "Complete electrification from supply point to final terminal equipment",
    longDesc: "A landmark hospitality project in the Western Ghats, the Taj Hotel Wayanad required a full turnkey electrical solution across all guest wings, back-of-house facilities, and landscaped outdoor areas. Our team handled the complete scope from HT supply intake and main LV distribution to final terminal equipment, ensuring a luxurious, fault-free guest experience.",
    highlights: [
      "HT cable laying, termination & metering",
      "Main LV switchgear & sub-distribution boards",
      "Guest room wiring, lighting & controls",
      "Outdoor landscape & façade lighting",
      "Backup DG synchronisation & auto-changeover",
      "Fire alarm and emergency lighting integration",
    ],
  },
  {
    id: "p2",
    src: "/aster-mims-kasaragod.jpg",
    title: "Aster Mims Hospital",
    cat: "Hospitality & Healthcare",
    loc: "Kasaragod",
    value: "₹7.0 Crore (700 Lakhs)",
    status: "Completed",
    year: "2021",
    client: "Aster DM Healthcare",
    scope: "Turnkey electrification from supply point to terminal equipment",
    longDesc: "One of our most complex healthcare deliveries, the Aster Mims Hospital Kasaragod demanded zero-downtime reliability for critical clinical areas. We executed the full electrical infrastructure — from HT intake, transformer and genset installation, to ICU and OT wiring meeting IEC 60364-7-710 standards, delivering a hospital-grade electrical ecosystem.",
    highlights: [
      "11kV HT switchgear & transformer installation",
      "Critical power UPS & isolation transformer systems",
      "OT & ICU dedicated earthing and equipotential bonding",
      "Nurse-call, CCTV and emergency power circuits",
      "2 × 1000 kVA DG synchronisation panel",
      "Full commissioning, testing & handover documentation",
    ],
  },
  {
    id: "p3",
    src: "/ibni-resorts.jpg",
    title: "IBNI Spa Resorts",
    cat: "Hospitality & Healthcare",
    loc: "Madikeri, Karnataka",
    value: "₹4.0 Crore (400 Lakhs)",
    status: "Completed",
    year: "2020",
    client: "IBNI Hospitality Pvt. Ltd.",
    scope: "Complete HT/LT resort electrification infrastructure",
    longDesc: "Nestled in the coffee-clad hills of Coorg, IBNI Spa Resorts required a comprehensive HT/LT electrical infrastructure across its spread-out cottage and villa units, spa blocks, and central restaurant. We provided a robust, aesthetically unobtrusive system that met the resort's luxury ambiance while guaranteeing continuous supply reliability.",
    highlights: [
      "HT overhead & underground cable network",
      "Resort-wide LV distribution to individual villas",
      "Spa & wellness centre specialised power circuits",
      "Outdoor pool & water-feature electrical safety systems",
      "Solar-ready metering panel infrastructure",
      "Energy-efficient LED control systems",
    ],
  },
  {
    id: "p4",
    src: "/khaleej-block-aster-mims.jpg",
    title: "Khaleej Block — Aster Mims",
    cat: "Hospitality & Healthcare",
    loc: "Kozhikode",
    value: "₹1.1 Crore (110 Lakhs)",
    status: "Completed",
    year: "2023",
    client: "Aster DM Healthcare",
    scope: "Complete electrification of hospital expansion block",
    longDesc: "The Khaleej Block was a new expansion wing added to the existing Aster Mims campus in Kozhikode. Tight scheduling and seamless integration with live hospital infrastructure were our prime challenges. We coordinated shutdown schedules and installed new sub-distribution, ensuring zero disruption to the operational hospital.",
    highlights: [
      "Integration with existing HT & main LV system",
      "New sub-distribution boards for patient wards",
      "Specialised circuits for medical imaging equipment",
      "Emergency lighting & fire alarm extension",
      "Earthing continuity testing & validation",
      "Phased handover with zero clinical disruption",
    ],
  },
  {
    id: "p5",
    src: "/aster-mims-refurbishment.jpg",
    title: "Aster Mims Refurbishment",
    cat: "Hospitality & Healthcare",
    loc: "Kozhikode",
    value: "₹1.6 Crore (160 Lakhs)",
    status: "Completed",
    year: "2024",
    client: "Aster DM Healthcare",
    scope: "Level 5th & 7th interior electrical refurbishment & modifications",
    longDesc: "A precision refurbishment of the 5th and 7th floors of Aster Mims Kozhikode, upgrading aging electrical infrastructure while the hospital remained live and fully operational. This project required meticulous planning, overnight work windows, and strict infection-control protocols throughout execution.",
    highlights: [
      "Full panel, wiring and containment replacement",
      "LED retrofit across both levels",
      "Upgraded nurse-call and bedhead unit wiring",
      "Night-shift execution to protect patient care",
      "Infection-control compliant material selection",
      "Load balancing and power quality improvements",
    ],
  },
  {
    id: "p6",
    src: "/bhima-jewellers.jpg",
    title: "Bhima Jewellers",
    cat: "Commercial & Retail",
    loc: "Kozhikode",
    value: "₹50 Lakhs",
    status: "Completed",
    year: "2022",
    client: "Bhima Gold Pvt. Ltd.",
    scope: "Complete HT & LT Electrical Works",
    longDesc: "A premium retail showroom environment demanded flawless display lighting and an ultra-reliable power system to protect sensitive inventory. We delivered complete HT and LT electrical works for Bhima Jewellers Kozhikode, including a carefully designed lighting scheme that showcases jewellery with precision colour rendering.",
    highlights: [
      "HT metering & LV main switchboard",
      "Precision display case and showcase lighting circuits",
      "High-CRI LED lighting control system",
      "Vault and security power circuits",
      "Dedicated AC plant electrical works",
      "UPS power for POS and surveillance systems",
    ],
  },
  {
    id: "p7",
    src: "/bank-branches.jpg",
    title: "SBI, Canara Bank, UBI Branches",
    cat: "Commercial & Retail",
    loc: "Various Branches across Kerala",
    value: "₹80 Lakhs",
    status: "Completed",
    year: "2019–2023",
    client: "State Bank of India / Canara Bank / Union Bank",
    scope: "Turnkey electrical installations for multiple bank branches",
    longDesc: "A multi-branch electrical works programme for three major nationalised banks across Kerala. Each branch required standardised yet locally compliant electrical installations — from main LV boards and UPS systems to structured cabling and ATM power outlets — executed to individual bank's technical specifications and RBI norms.",
    highlights: [
      "Standardised LV distribution boards per bank specs",
      "Dedicated UPS & inverter power for core banking",
      "ATM room electrical and earthing works",
      "CCTV and access control power infrastructure",
      "Fire detection and suppression power circuits",
      "Testing and compliance certification for all branches",
    ],
  },
  {
    id: "p8",
    src: "/mandara-healing-space.jpg",
    title: "Mandara Healing Space by HiLITE",
    cat: "Commercial & Retail",
    loc: "Kozhikode",
    value: "₹60 Lakhs",
    status: "Ongoing (2026–27)",
    year: "2026",
    client: "HiLITE Builders",
    scope: "HT & LT Electrical installations",
    longDesc: "A contemporary wellness and healing-space development by HiLITE Builders, Mandara demands a calm, human-centric electrical environment with biophilic design integration. Currently underway, we are delivering the complete HT and LT electrical package including energy-efficient lighting controls and dedicated spa equipment circuits.",
    highlights: [
      "HT supply and metering infrastructure",
      "Wellness room and therapy suite power circuits",
      "Dim-to-warm LED control system",
      "HVAC and air handling unit electrical works",
      "Earthing and lightning protection system",
      "Smart energy monitoring for sustainability goals",
    ],
  },
  {
    id: "p9",
    src: "/mathrubhumi-printing.png",
    title: "Mathrubhumi Printing & Publishing",
    cat: "Industrial & Infrastructure",
    loc: "Ramanattukara",
    value: "₹7 Lakhs",
    status: "Ongoing (2026–27)",
    year: "2026",
    client: "Mathrubhumi Printing & Publishing Ltd.",
    scope: "Electrical panel & cable laying works for equipment installation",
    longDesc: "Supporting the expansion of one of Kerala's most iconic media organisations, we are providing specialised electrical panel and cable laying works for new printing and publishing equipment at the Ramanattukara facility. Precision load management ensures uninterrupted round-the-clock print production.",
    highlights: [
      "Industrial electrical panel fabrication and installation",
      "Heavy-duty cable laying for press machinery",
      "Power factor correction panel integration",
      "Machine earthing and bonding works",
      "Cable tray and containment installation",
      "Load testing and commissioning support",
    ],
  },
];

const STATS = [
  { n: 35,   s: "+",      l: "Years Founder Experience" },
  { n: 20,   s: "+",      l: "Cr Total Project Value" },
  { n: 100,  s: "%",      l: "Safety & Compliance Record" },
  { n: 2,    s: " State", l: "Grade A Licenses (KL & KA)" },
];

function PCard({ p, i, onClick }: { p: Project; i: number; onClick: () => void }) {
  const { isDark } = useTheme();
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ delay: i * 0.04, duration: 0.45 }}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden group border shadow-sm flex flex-col justify-between pcard text-left w-full"
      style={{
        backgroundColor: isDark ? "#1c1c1c" : "#ffffff",
        borderColor: isDark ? "#2a2a2a" : "#f3f4f6",
        cursor: "pointer",
      }}
    >
      <div className="relative w-full h-32 sm:h-48 overflow-hidden bg-gray-900">
        <Image src={p.src} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" sizes="(max-width: 768px) 50vw, 33vw" />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex gap-2">
          <span className="text-[0.55rem] sm:text-[0.7rem] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#111111]/80 text-[#C8F400] backdrop-blur-md border border-white/10">
            {p.status}
          </span>
        </div>
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
          <span className="text-[0.55rem] sm:text-[0.65rem] font-extrabold uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#C8F400] text-[#111111]">
            {p.value}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-xs sm:text-lg font-bold mb-1 sm:mb-1.5 transition-colors pcard-title leading-snug"
            style={{ color: isDark ? "#ffffff" : "#111111" }}
          >{p.title}</h3>

          <p
            className="text-[10px] sm:text-xs mb-2 sm:mb-3 flex items-center gap-1"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            📍 <span>{p.loc}</span>
          </p>
          <p
            className="text-[11px] sm:text-xs leading-relaxed pt-2 sm:pt-3 border-t pcard-scope line-clamp-2 sm:line-clamp-none"
            style={{
              color: isDark ? "#d1d5db" : "#4b5563",
              borderColor: isDark ? "#2a2a2a" : "#f3f4f6",
            }}
          >{p.scope}</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState<Cat>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { isDark } = useTheme();
  const sRef = useRef<HTMLElement>(null);
  const sIv  = useInView(sRef as React.RefObject<Element>, { once: true });
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* ═══ PROJECT DETAIL MODAL ════════════════════════ */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveProject(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9998,
                background: "rgba(10,10,12,0.75)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            />

            {/* Modal */}
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
                  maxWidth: "900px",
                  maxHeight: "90vh",
                  borderRadius: "28px",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  background: isDark ? "#141416" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(0,0,0,0.12)",
                  boxShadow: isDark
                    ? "0 35px 90px -15px rgba(0,0,0,0.8), inset 1px 1px 2px rgba(255,255,255,0.1)"
                    : "0 35px 90px -15px rgba(0,0,0,0.35), inset 1.5px 1.5px 3px rgba(255,255,255,1)",
                }}
                className="project-modal"
              >
                {/* LEFT — Image panel */}
                <div style={{ position: "relative", minHeight: "440px", background: "#0a0a0a", flexShrink: 0 }}>
                  <Image
                    src={activeProject.src}
                    alt={activeProject.title}
                    fill
                    className="object-cover"
                    sizes="450px"
                  />
                  {/* Dark gradient overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
                  {/* Status badge */}
                  <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem" }}>
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      background: "rgba(17,17,17,0.82)",
                      color: "#C8F400",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "100px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(6px)",
                    }}>
                      {activeProject.status}
                    </span>
                  </div>
                  {/* Value badge */}
                  <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem" }}>
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      background: "#C8F400",
                      color: "#111",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "100px",
                      textTransform: "uppercase",
                    }}>
                      {activeProject.value}
                    </span>
                  </div>
                  {/* Bottom text overlay */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 1.75rem 1.75rem" }}>
                    <h2 style={{

                      color: "#fff",
                      fontFamily: "var(--font-outfit),system-ui,sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(1.2rem,2.5vw,1.65rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.15,
                      marginBottom: "0.5rem",
                    }}>
                      {activeProject.title}
                    </h2>
                    <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", display: "flex", itemsCenter: "center", gap: "0.35rem" }}>
                      📍 {activeProject.loc}
                    </p>
                  </div>
                </div>

                {/* RIGHT — Details panel */}
                <div style={{
                  padding: "2rem 1.75rem",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.1rem",
                  background: isDark ? "#111" : "#ffffff",
                }}>
                  {/* Close button */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => setActiveProject(null)}
                      style={{
                        width: "2.35rem",
                        height: "2.35rem",
                        borderRadius: "50%",
                        background: isDark ? "#1c1c1e" : "#f5f5f7",
                        borderTop: `1.5px solid ${isDark ? "rgba(255,255,255,0.2)" : "#ffffff"}`,
                        borderLeft: `1.5px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(255, 255, 255, 0.9)"}`,
                        borderBottom: `1.5px solid ${isDark ? "rgba(0,0,0,0.8)" : "rgba(160, 165, 180, 0.45)"}`,
                        borderRight: `1.5px solid ${isDark ? "rgba(0,0,0,0.6)" : "rgba(180, 185, 200, 0.35)"}`,
                        boxShadow:
                          isDark
                            ? "inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.1), inset -2px -2px 4px rgba(0, 0, 0, 0.5), 3px 6px 16px rgba(0, 0, 0, 0.5)"
                            : "inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.95), inset -2px -2px 4px rgba(0, 0, 0, 0.15), 3px 6px 16px rgba(0, 0, 0, 0.18), 0 2px 4px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      aria-label="Close"
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#ccc" : "#111"} strokeWidth="2.5" strokeLinecap="round" style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.15))" }}>
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Meta pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {activeProject.client && (
                      <span style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.35rem 0.85rem",
                        borderRadius: "100px",
                        background: isDark ? "linear-gradient(135deg, #1f1f22 0%, #151518 100%)" : "linear-gradient(135deg, #ffffff 0%, #edf0f5 100%)",
                        color: isDark ? "#ccc" : "#444",
                        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#ffffff"}`,
                        borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255, 255, 255, 0.9)"}`,
                        borderBottom: `1px solid ${isDark ? "rgba(0,0,0,0.6)" : "rgba(180, 185, 200, 0.4)"}`,
                        borderRight: `1px solid ${isDark ? "rgba(0,0,0,0.5)" : "rgba(190, 195, 210, 0.3)"}`,
                        boxShadow: isDark ? "inset 1px 1px 2px rgba(255,255,255,0.08), inset -1px -1px 2px rgba(0,0,0,0.5)" : "inset 1px 1px 2px rgba(255,255,255,0.9), 0 2px 5px rgba(0,0,0,0.05)",
                      }}>
                        🏢 {activeProject.client}
                      </span>
                    )}
                    {activeProject.year && (
                      <span style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.35rem 0.85rem",
                        borderRadius: "100px",
                        background: isDark ? "linear-gradient(135deg, #1f1f22 0%, #151518 100%)" : "linear-gradient(135deg, #ffffff 0%, #edf0f5 100%)",
                        color: isDark ? "#ccc" : "#444",
                        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#ffffff"}`,
                        borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255, 255, 255, 0.9)"}`,
                        borderBottom: `1px solid ${isDark ? "rgba(0,0,0,0.6)" : "rgba(180, 185, 200, 0.4)"}`,
                        borderRight: `1px solid ${isDark ? "rgba(0,0,0,0.5)" : "rgba(190, 195, 210, 0.3)"}`,
                        boxShadow: isDark ? "inset 1px 1px 2px rgba(255,255,255,0.08), inset -1px -1px 2px rgba(0,0,0,0.5)" : "inset 1px 1px 2px rgba(255,255,255,0.9), 0 2px 5px rgba(0,0,0,0.05)",
                      }}>
                        📅 {activeProject.year}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }} />

                  {/* Project description */}
                  <p style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.75,
                    color: isDark ? "#aaa" : "#444",
                  }}>
                    {activeProject.longDesc}
                  </p>

                  {/* Scope card (Inverted Skeuomorphism - Recessed Well) */}
                  <div style={{
                    padding: "1rem 1.15rem",
                    borderRadius: "16px",
                    background: isDark ? "#0d0d0f" : "#e8ecf2",
                    borderTop: `1.5px solid ${isDark ? "#000000" : "rgba(140, 148, 165, 0.6)"}`,
                    borderLeft: `1.5px solid ${isDark ? "#000000" : "rgba(150, 158, 175, 0.5)"}`,
                    borderBottom: `1.5px solid ${isDark ? "rgba(255,255,255,0.12)" : "#ffffff"}`,
                    borderRight: `1.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(255, 255, 255, 0.9)"}`,
                    boxShadow: isDark
                      ? "inset 3px 3px 7px rgba(0, 0, 0, 0.95), inset -2px -2px 5px rgba(255, 255, 255, 0.05)"
                      : "inset 3px 3px 7px rgba(0, 0, 0, 0.16), inset -2px -2px 5px rgba(255, 255, 255, 0.9)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                  }}>
                    <div style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "12px",
                      background: isDark ? "#161619" : "#dbe0e8",
                      borderTop: `1px solid ${isDark ? "#000" : "rgba(130,135,150,0.5)"}`,
                      borderLeft: `1px solid ${isDark ? "#000" : "rgba(140,145,160,0.4)"}`,
                      borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#ffffff"}`,
                      borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ffffff"}`,
                      boxShadow: isDark
                        ? "inset 2px 2px 4px rgba(0, 0, 0, 0.8), inset -1px -1px 2px rgba(255, 255, 255, 0.05)"
                        : "inset 2px 2px 4px rgba(0, 0, 0, 0.12), inset -1px -1px 2px rgba(255, 255, 255, 0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#C8F400" : "#6a8d00"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "0.625rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isDark ? "#C8F400" : "#557500",
                        marginBottom: "0.2rem",
                      }}>
                        Scope of Work
                      </div>
                      <p style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        lineHeight: 1.55,
                        color: isDark ? "#d4d4d8" : "#2d3748",
                        margin: 0,
                      }}>
                        {activeProject.scope}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <div style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#999",
                      marginBottom: "0.65rem",
                    }}>
                      Key Highlights
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0, margin: 0, listStyle: "none" }}>
                      {activeProject.highlights.slice(0, 5).map((h) => (

                        <li
                          key={h}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.65rem",
                            fontSize: "0.835rem",
                            color: isDark ? "#ccc" : "#333",
                            lineHeight: 1.55,
                          }}
                        >
                          <span style={{
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
                          }}>
                            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke={isDark ? "#C8F400" : "#5a8200"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 0.5px 0.5px rgba(0,0,0,0.2))" }}>
                              <path d="M2 6l3 3 5-5" />
                            </svg>
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ paddingTop: "68px", background: "#f9fafb" }}>
        <div className="relative py-14 lg:py-0 lg:h-[580px] flex items-center overflow-hidden">
          <div className="site-container w-full">
            <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 items-center">
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
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <PCard key={p.id} p={p} i={i} onClick={() => setActiveProject(p)} />
              ))}
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
