"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/portfolio" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: "#ffffff",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div className="site-container">
        <div className="flex items-center justify-between" style={{ height: "68px" }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Omni Electrics">
            <div
              className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-200 group-hover:scale-110 border border-gray-200/60 bg-black"
            >
              <img src="/logo.jpg" alt="Omni Electrics Logo" className="w-full h-full object-cover scale-105" />
            </div>
            <div className="leading-none">
              <div
                className="font-extrabold tracking-tight leading-none"
                style={{ fontSize: "0.9375rem", color: "#111111" }}
              >
                Omni Electrics
              </div>
              <div
                className="font-semibold uppercase tracking-wider"
                style={{ fontSize: "0.45rem", color: "#9ca3af", marginTop: "2px" }}
              >
                Electrical Solutions
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.label + l.href}
                  href={l.href}
                  className="text-sm font-semibold relative transition-colors duration-200"
                  style={{ color: active ? "#111111" : "#6b7280" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#111111"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = active ? "#111111" : "#6b7280"; }}
                >
                  {l.label}
                  {active && (
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 rounded-full"
                      style={{ height: "2px", background: "#C8F400" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link href="https://wa.me/9349102611" className="nav-pill" id="nav-cta">
              Get a Quote
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            {/* <button
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </button> */}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close" : "Menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block rounded-full transition-all duration-300 origin-center"
                style={{
                  width: "20px", height: "2px", background: "#111111",
                  opacity: i === 1 && open ? 0 : 1,
                  transform:
                    i === 0 && open ? "rotate(45deg) translate(5px, 5px)"
                    : i === 2 && open ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "500px" : "0",
          borderTop: open ? "1px solid #e5e7eb" : "none",
          background: "#fff",
        }}
      >
        <div className="site-container py-4 flex flex-col gap-1">
          {NAV.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.label + l.href}
                href={l.href}
                className="py-2.5 px-3 rounded-xl font-semibold text-sm transition-colors"
                style={{ color: active ? "#111111" : "#6b7280", background: active ? "#f9fafb" : "transparent" }}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #e5e7eb" }}>
            <Link href="/contact" className="nav-pill w-fit">
              Get a Quote
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
