"use client";

import { useRef, useState } from "react";
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

const INFO = [
  {
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    label: "Call Us",
    value: "93491 02611",
    sub: "Mon–Sat, 8am–6pm",
    href: "tel:9349102611",
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    label: "Email Us",
    value: "omnielectricscalicut@gmail.com",
    sub: "We'll reply within 24 hours",
    href: "mailto:omnielectricscalicut@gmail.com",
  },
  {
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Visit Us",
    value: "5/778, Rarichan Rd",
    sub: "Nadakkave, Kozhikode, Kerala 673006",
    href: "https://www.google.com/maps/place/omni+electrics/@11.2723973,75.782116,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba65f0070b0a4ad:0x1caa15919070f789!8m2!3d11.2723973!4d75.7846909!16s%2Fg%2F11x6mvp68m",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Working Hours",
    value: "Mon – Fri: 8:00 AM – 6:00 PM",
    sub: "Sunday: Emergency Only",
    href: "#",
  },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  };

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <div style={{ paddingTop: "68px", background: "#f9fafb" }}>
        <div className="site-container py-14 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="overline mb-4">Contact</div>
            <div className="grid lg:grid-cols-2 gap-6 items-end">
              <h1 className="section-heading">Let's Connect<br />We're Here to Help</h1>
              <p className="body-text max-w-sm">Have a question or need assistance? Get in touch with our team — we're always ready to help.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Split contact section */}
      <section className="section-y bg-white">
        <div className="site-container">
          <FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INFO.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="service-card flex flex-col items-center text-center p-6 h-full group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-[#C8F400] group-hover:scale-110 group-hover:rotate-[360deg]"
                    style={{ background: "#f3f4f6" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#9ca3af" }}>{item.label}</p>
                  <p className="font-bold text-sm mb-1 leading-snug" style={{ color: "#111111" }}>{item.value}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{item.sub}</p>
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="site-container">
          <FadeUp>
            <div className="w-full rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb", height: "420px" }}>
              <iframe
                title="Omni Electrics Location"
                src="https://maps.google.com/maps?q=omni%20electrics,%205/778,%20Rarichan%20Rd,%20Paul%20Nagar,%20Nadakkave,%20Kozhikode,%20Kerala%20673006&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Emergency bar */}
      {/* <section className="py-10" style={{ background: "#111111" }}>
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-bold text-white text-lg mb-1">Need Immediate Assistance?</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Our emergency team is available 24/7.</p>
          </div>
          <a href="tel:+15551234567" className="btn-lime shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.1 6.1l1.48-1.48a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call Now: +1 (555) 123-4567
          </a>
        </div>
      </section> */}

      <Footer />
    </main>
  );
}
