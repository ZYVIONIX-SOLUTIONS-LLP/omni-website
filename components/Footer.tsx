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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: "#C8F400" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#111111"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
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

          {/* Newsletter */}
          <div>
            <h4 className="text-[0.65rem] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.28)" }}>Stay Updated</h4>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>
              Subscribe to our newsletter for tips and updates.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 min-w-0 px-3 py-2.5 text-xs rounded-lg outline-none"
                style={{ background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
                onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C8F400"; }}
                onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
              />
              <button type="submit"
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform hover:scale-110"
                style={{ background: "#C8F400", color: "#11" }}
                aria-label="Subscribe"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>
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
