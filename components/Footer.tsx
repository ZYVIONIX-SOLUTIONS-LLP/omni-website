"use client";

import Link from "next/link";

const QUICK = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/portfolio" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];
const SVCS = [
  "Wiring & Rewiring", "Solar Installation", "Generator Setup",
  "Electrical Installations", "Panel Upgrades", "Emergency Services",
];
const SUPP = ["FAQs", "24/7 Support", "Privacy Policy", "Terms & Conditions", "Sitemap"];
const SOCIALS = [
  { label: "Facebook",  href: "#", d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { label: "Twitter",   href: "#", d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
  { label: "Instagram", href: "#", d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11A1.5 1.5 0 0119 8v8a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 16V8A1.5 1.5 0 016.5 6.5z" },
  { label: "YouTube",   href: "#", d: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#111111", color: "#fff" }}>
      <div className="site-container pt-14 pb-8">
        {/* Top grid */}
        <div
          className="grid gap-10 pb-12 mb-8"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1.4fr",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-white/10 bg-black logo-shock">
                <img src="/logo.jpg" alt="Omni Electrics Logo" className="w-full h-full object-cover scale-105" />
              </div>
              <div className="leading-none">
                <div className="font-extrabold text-sm tracking-tight text-white">Omni Electrics</div>
                <div className="font-semibold uppercase tracking-wider" style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>Electrical Solutions</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Powering homes, businesses &amp; industries with reliable, safe, and innovative electrical solutions since 2006.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#C8F400"; el.style.color = "#111"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.07)"; el.style.color = "rgba(255,255,255,0.45)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[0.65rem] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.28)" }}>Quick Links</h4>
            <ul className="space-y-3">
              {QUICK.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm transition-colors duration-200" style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#C8F400"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[0.65rem] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.28)" }}>Services</h4>
            <ul className="space-y-3">
              {SVCS.map(l => (
                <li key={l}>
                  <Link href="/services" className="text-sm transition-colors duration-200" style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#C8F400"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                  >{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[0.65rem] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.28)" }}>Support</h4>
            <ul className="space-y-3">
              {SUPP.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm transition-colors duration-200" style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#C8F400"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[0.65rem] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.28)" }}>Contact Info</h4>
            <ul className="space-y-3.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li className="flex items-start gap-2.5">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8F400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <a 
                  href="https://www.google.com/maps/place/omni+electrics/@11.2723973,75.782116,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba65f0070b0a4ad:0x1caa15919070f789!8m2!3d11.2723973!4d75.7846909!16s%2Fg%2F11x6mvp68m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#C8F400]"
                >
                  5/778, Rarichan Rd,<br />
                  Nadakkave, Kozhikode,<br />
                  Kerala 673006
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8F400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:9349102611" className="transition-colors hover:text-[#C8F400]">
                  93491 02611
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8F400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:omnielectricscalicut@gmail.com" className="transition-colors hover:text-[#C8F400] break-all">
                  omnielectricscalicut@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8F400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Omni Electrics. All Rights Reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map(t => (
              <a key={t} href="#" className="text-xs transition-colors" style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
