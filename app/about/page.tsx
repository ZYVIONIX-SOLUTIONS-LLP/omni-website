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
        <span className="font-bold text-sm accordion-title">{title}</span>
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
  { n: 35,   s: "+",  l: "Years Founder Experience" },
  { n: 128,  s: "MW", l: "Max Power Station Handled" },
  { n: 7500, s: " sqft", l: "Office & Warehouse Space" },
  { n: 100,  s: "%",  l: "Statutory & Safety Compliant" },
];

const STRENGTHS = [
  {
    title: "Engineering Team & Supervision",
    desc: "Group of Electrical and Electronic engineers backed by highly skilled Supervisors and Electricians, trained to IS and IEC standards.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
  },
  {
    title: "Advanced In-House Testing & Software",
    desc: "Equipped with state-of-the-art testing & commissioning tools, in-house CAD drawing & estimation facilities, and 'Powerplay' software for real-time project management.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
  },
  {
    title: "Full Compliance & Dealerships",
    desc: "Complete statutory compliance (GST, IT, ESI, PF) with insured workforce. Direct dealership of Schneider Electric, GM, Orient, Tisva, and top international brands.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  }
];

const KEY_LEADERSHIP = [
  { name: "VIJAYALAKSHMI", role: "Office Administrator", dept: "Administration", avatar: "/image/about-page/avatar_female_1.png" },
  { name: "MOHAMMED SADIQE", role: "Project Engineer", dept: "Engineering", avatar: "/image/about-page/avatar_male_1.png" },
  { name: "DHANESH AP", role: "Senior Supervisor", dept: "Site Operations", avatar: "/image/about-page/avatar_male_3.png" },
  { name: "VIPINDAS", role: "Senior Supervisor", dept: "Site Operations", avatar: "/image/about-page/avatar_male_3.png" },
];

const NON_ELECTRICIANS = [
  { name: "MUHAMMED SHARFAS PV", role: "Accountant", dept: "Finance", avatar: "/image/about-page/avatar_male_2.png" },
  { name: "NEHLA", role: "Purchase Manager", dept: "Procurement", avatar: "/image/about-page/avatar_female_2.png" },
  { name: "AVANISH M", role: "Supervisor", dept: "Site Operations", avatar: "/image/about-page/avatar_male_3.png" },
  { name: "SIBIL P RAJAN", role: "Supervisor", dept: "Site Operations", avatar: "/image/about-page/avatar_male_1.png" },
  { name: "ABHISHEK", role: "Supervisor", dept: "Site Operations", avatar: "/image/about-page/avatar_male_2.png" },
];

const ELECTRICIANS = [
  { name: "ROHITH.T", role: "Senior Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_1.png" },
  { name: "AKHILESH. PK", role: "Senior Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_2.png" },
  { name: "DEEPAK SEBASTIAN", role: "Senior Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_1.png" },
  { name: "SREERAJ", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_3.png" },
  { name: "AKSHAY KUMAR", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_1.png" },
  { name: "MUHAMMED ASLAM", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_2.png" },
  { name: "ADHARSH P", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_3.png" },
  { name: "MANIKANDAN R", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_1.png" },
  { name: "MUHAMMED NABHAN", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_2.png" },
  { name: "JITH", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_2.png" },
  { name: "ABHINAV M", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_3.png" },
  { name: "ADHITYAN", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_1.png" },
  { name: "HARINAD", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_2.png" },
  { name: "RAHUL KUMAR", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_3.png" },
  { name: "PANKAJ KUMAR", role: "Electrician", dept: "Technical", avatar: "/image/about-page/avatar_male_1.png" }
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
        <div className="relative py-14 lg:py-0 lg:h-[580px] flex items-center overflow-hidden">
          <div className="site-container w-full">
            <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-2xl lg:max-w-3xl">
                <div className="overline mb-4">Grade A Electrical Contractors</div>
                <h1 className="section-heading mb-5">Powering Spaces <span style={{ color: "#C8F400" }}>Empowering</span><br /> Lives</h1>
                <p className="body-text">Established in Kozhikode and expanding nationwide under CEA "One India One License" regulations, delivering Turnkey Electrical Solutions.</p>
              </motion.div>
            </div>
          </div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute -right-12 top-0 bottom-0 w-[52vw] h-full"
            style={{ filter: "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.12))" }}
          >
            <Image
              src="/image/about-page/ChatGPT Image Jul 19, 2026, 06_06_55 PM.png"
              alt="Omni Electrics Hero"
              fill
              sizes="50vw"
              className="object-contain object-right scale-105 origin-right"
              priority
            />
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
                  style={{ bottom: "-8px", right: "-8px", background: "#111111", minWidth: "180px", zIndex: 10 }}
                >
                  <div className="font-extrabold leading-none mb-1"
                    style={{ fontSize: "2.25rem", color: "#C8F400", letterSpacing: "-0.04em", fontFamily: "var(--font-outfit),system-ui,sans-serif" }}>
                    GRADE A
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Kerala & Karnataka</div>
                </motion.div>
              </div>
            </FadeUp>

            {/* Content */}
            <div>
              <FadeUp delay={0.05}>
                <div className="overline mb-4">Our Company & Reach</div>
                <h2 className="section-heading mb-5">Grade A Electrical Contracting Across India</h2>
                <p className="body-text mb-4">Omni Electrics is a premier Grade A Electrical Contracting firm based in Kozhikode, Kerala. Operating with 6,000 sq ft godown space and 1,500 sq ft head office, we provide end-to-end electrical design, HT/LT installations, panel wiring, testing, and commissioning.</p>
                <p className="body-text mb-8">Aligned with the latest Central Electricity Authority (CEA) regulations under "ONE INDIA ONE LICENSE", Omni Electrics is executing flagship high-voltage commercial, healthcare, luxury resort, and industrial projects nationwide.</p>
              </FadeUp>
              <FadeUp delay={0.1} className="flex flex-col gap-3 mb-8">
                <Accordion 
                  title="Our Engineering Assurance" 
                  body="We assure our customers electrical designs based on proven engineering practices adhering strictly to International and Indian (IS/IEC) standards. Execution is centered on safe, sustainable practices with rigorous testing and verification." 
                  isOpen={activeAccordion === 0}
                  onToggle={() => setActiveAccordion(0)}
                />
                <Accordion 
                  title="Infrastructure & Logistics" 
                  body="With over 7,500 sq ft combined office and godown facilities in Kozhikode, in-house design & estimation software, and dedicated Powerplay project management software, we execute large-scale turnkey contracts with absolute schedule adherence." 
                  isOpen={activeAccordion === 1}
                  onToggle={() => setActiveAccordion(1)}
                />
                <Accordion 
                  title="Official Brand Dealerships" 
                  body="We hold direct dealership and distribution ties with leading international and Indian electrical manufacturers, including Schneider Electric India, GM Modular, Orient Electric, and Tisva." 
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

      {/* Leadership Spotlight Section */}
      <section className="py-20 leadership-section">
        <div className="site-container">
          <FadeUp className="mb-12">
            <div className="overline mb-4">Leadership</div>
            <h2 className="section-heading">Key Person & Leadership</h2>
          </FadeUp>

          <FadeUp>
            <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-sm grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center leadership-card">

              <div className="flex flex-col items-center text-center">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden mb-5 border-4 border-white shadow-[0_14px_36px_rgba(0,0,0,0.28)] bg-gray-100">
                  <Image
                    src="/image/about-page/amritlal_vk.jpg"
                    alt="Amritlal V.K. - Founder & Owner Omni Electrics"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 25%" }}
                    priority
                  />
                </div>
                <h3 className="text-xl font-bold text-[#111111] mb-1 amritlal-name">AMRITLAL V.K.</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-2">Owner & Sole Proprietor</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#111111] text-[#C8F400] text-xs font-bold mb-2 be-badge">
                  BE Electrical & Electronics (1991)
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C8F400]/20 text-[#111] text-xs font-semibold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  35+ Years Engineering Expertise
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold card-title text-[#111111] mb-4">Credentials & Certifications</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3 text-sm text-gray-700 cred-list-item">
                    <span className="w-2 h-2 rounded-full bg-[#C8F400] mt-2 shrink-0" />
                    <span><strong>Grade A Supervisor License:</strong> Certified in Kerala and Karnataka.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-700 cred-list-item">
                    <span className="w-2 h-2 rounded-full bg-[#C8F400] mt-2 shrink-0" />
                    <span><strong>Class A Supervisor (Qatar UPDA):</strong> Internationally certified Class A supervisor with middle-east mega project expertise.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-700 cred-list-item">
                    <span className="w-2 h-2 rounded-full bg-[#C8F400] mt-2 shrink-0" />
                    <span><strong>Comprehensive Project Execution:</strong> Decades of experience in design, supervision, operation, maintenance, testing, and commissioning of electrical installations up to 128 MW power generating stations, industrial factories, hospital complexes, luxury resorts, and high-rise commercial structures.</span>
                  </li>
                </ul>

                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="p-4 rounded-2xl bg-gray-50 edu-card">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Education</p>
                    <p className="text-sm font-bold text-gray-800">B.E. Electrical & Electronics (1991 Batch)</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 edu-card">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Specialization</p>
                    <p className="text-sm font-bold text-gray-800">128MW Generating Stations & HT/LT Substations</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Team & Key Personnel Section */}
      <section className="py-20 overflow-hidden relative team-section">

        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8F400]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="site-container mb-12">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="overline mb-3">Management & Workforce</div>
              <h2 className="section-heading">Key Personnel & Execution Team</h2>
            </div>
            <p className="body-text max-w-md text-sm">
              Our key management heads and dedicated site execution force driving precision, safety, and compliance across every project nationwide.
            </p>
          </FadeUp>

          {/* 4 Key Person Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mt-10">
            {KEY_LEADERSHIP.map((emp, i) => (
              <FadeUp key={emp.name} delay={i * 0.08}>
                <div className="p-4 sm:p-6 rounded-3xl bg-gray-50 border border-gray-200/80 hover:border-[#C8F400] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center text-center group h-full justify-between relative overflow-hidden emp-card">
                  <div className="w-full flex justify-end mb-1 sm:mb-2">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#C8F400] text-[#111] emp-badge">
                      {emp.dept}
                    </span>
                  </div>
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 sm:mb-4 border-2 sm:border-4 border-white shadow-lg bg-gray-100 group-hover:scale-105 transition-transform duration-300 emp-avatar-box">
                    <Image
                      src={emp.avatar}
                      alt={emp.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 64px, 96px"
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="font-extrabold text-xs sm:text-base text-[#111111] mb-0.5 sm:mb-1 transition-colors emp-name leading-snug">
                      {emp.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 emp-role">
                      {emp.role}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Continuous Flow Marquee of All Employees */}
        <div className="mt-14 pt-8 border-t border-gray-100 team-divider">
          <div className="site-container mb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 emp-role">Engineering & Technical Force</div>
          </div>

          {/* Row 1: Non-Electricians (Supervisors, Accountants, Purchase Managers) */}
          <div className="relative w-full overflow-hidden py-3">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none marquee-mask-left" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none marquee-mask-right" />

            <div className="animate-marquee-ltr flex gap-5">
              {[...NON_ELECTRICIANS, ...NON_ELECTRICIANS, ...NON_ELECTRICIANS].map((emp, i) => (
                <div
                  key={`${emp.name}-1-${i}`}
                  className="w-72 shrink-0 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#C8F400] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center gap-4 group emp-card"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-gray-100 group-hover:scale-105 transition-transform duration-300 emp-avatar-box">
                    <Image
                      src={emp.avatar}
                      alt={emp.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-[#111111] truncate emp-name">
                      {emp.name}
                    </h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5 truncate emp-role">
                      {emp.role}
                    </p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8F400]/25 text-[#111] emp-badge">
                      {emp.dept}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Electricians & Senior Electricians */}
          <div className="relative w-full overflow-hidden py-3 mt-2">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none marquee-mask-left" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none marquee-mask-right" />

            <div className="animate-marquee-ltr flex gap-5">
              {[...ELECTRICIANS, ...ELECTRICIANS].map((emp, i) => (
                <div
                  key={`${emp.name}-2-${i}`}
                  className="w-72 shrink-0 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#C8F400] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center gap-4 group emp-card"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-gray-100 group-hover:scale-105 transition-transform duration-300 emp-avatar-box">
                    <Image
                      src={emp.avatar}
                      alt={emp.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-[#111111] truncate emp-name">
                      {emp.name}
                    </h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5 truncate emp-role">
                      {emp.role}
                    </p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8F400]/25 text-[#111] emp-badge">
                      {emp.dept}
                    </span>
                  </div>
                </div>
              ))}
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

      {/* Operational Strengths */}
      <section className="section-y" style={{ background: "#f9fafb" }}>
        <div className="site-container">
          <FadeUp className="text-center mb-12">
            <div className="overline mb-4 justify-center">Why Choose Omni Electrics</div>
            <h2 className="section-heading">Our Core Strengths & Infrastructure</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STRENGTHS.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.08}>
                <div className="service-card text-center group h-full flex flex-col justify-between">
                  <div>
                    <div className="icon-wrap w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-200 group-hover:bg-[#C8F400]" style={{ background: "#f3f4f6" }}>
                      <svg className="transition-transform duration-500 group-hover:rotate-[360deg]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={v.icon} /></svg>
                    </div>
                    <p className="card-title mb-3">{v.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{v.desc}</p>
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
