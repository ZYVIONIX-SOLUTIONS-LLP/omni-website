"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

const NAV = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/portfolio" },
  { label: "Contact",  href: "/contact" },
];

/* ─── Home Wall Switch ────────────────────────────────────────────── */
function ElectricSwitch() {
  const { isDark, toggleTheme } = useTheme();
  const on = isDark; // ON = dark mode 🌙, OFF = light mode ☀️

  const [sparks, setSparks] = useState<{ id: number; angle: number }[]>([]);
  const [clicking, setClicking] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSwitchSound = (isTurningOn: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Master Gain for clear, loud audio playback
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(1.4, now);
      masterGain.connect(ctx.destination);

      // 1. High frequency snap / plastic latch click
      const snapLen = Math.floor(ctx.sampleRate * 0.015);
      const snapBuffer = ctx.createBuffer(1, snapLen, ctx.sampleRate);
      const snapData = snapBuffer.getChannelData(0);
      for (let i = 0; i < snapLen; i++) {
        snapData[i] = (Math.random() * 2 - 1) * (1 - i / snapLen);
      }
      const snapNode = ctx.createBufferSource();
      snapNode.buffer = snapBuffer;

      const snapFilter = ctx.createBiquadFilter();
      snapFilter.type = "bandpass";
      snapFilter.frequency.setValueAtTime(isTurningOn ? 3400 : 2800, now);
      snapFilter.Q.setValueAtTime(1.2, now);

      snapNode.connect(snapFilter);
      snapFilter.connect(masterGain);
      snapNode.start(now);

      // 2. Heavy mechanical spring thump / toggle knock
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";

      const startFreq = isTurningOn ? 280 : 220;
      const endFreq = isTurningOn ? 45 : 35;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.045);

      oscGain.gain.setValueAtTime(0.9, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.05);

      // Clean up AudioContext after playback
      setTimeout(() => {
        try { ctx.close(); } catch (_) {}
      }, 150);
    } catch (e) {
      console.error("Switch audio play error:", e);
    }
  };

  const handleToggle = () => {
    playSwitchSound(!on);
    setClicking(true);
    setTimeout(() => setClicking(false), 150);
    const newSparks = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      angle: i * 72 + Math.random() * 30,
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 500);
    toggleTheme();
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "8px 12px",
        background: on
          ? "linear-gradient(145deg, #1b1b1b 0%, #111111 100%)"
          : "linear-gradient(145deg, #f9fafb 0%, #ececec 100%)",
        border: on ? "1px solid #333333" : "1px solid #d4d4d8",
        borderRadius: "8px",
        boxShadow: on
          ? "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
          : "0 4px 10px rgba(0, 0, 0, 0.06), inset 0 1px 0 #ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "64px",
        transition: "all 0.3s ease",
      }}
    >
      {/* Switchboard Screws (Corner Details) */}
      {[
        { top: "4px", left: "4px" },
        { top: "4px", right: "4px" },
        { bottom: "4px", left: "4px" },
        { bottom: "4px", right: "4px" },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: on ? "#444444" : "#a1a1aa",
            border: on ? "1px solid #222" : "1px solid #d4d4d8",
            boxShadow: on ? "none" : "inset 0 1px 1px rgba(0,0,0,0.1)",
            ...pos,
          }}
        />
      ))}

      {/* Actual Switch */}
      <button
        onClick={handleToggle}
        aria-label={on ? "Switch to Light Mode" : "Switch to Dark Mode"}
        title={on ? "Switch to Light Mode" : "Switch to Dark Mode"}
        style={{
          position: "relative",
          width: "28px",
          height: "42px",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        {/* Outer plate */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "4px",
          background: on
            ? "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 100%)"
            : "linear-gradient(160deg, #f5f5f5 0%, #e8e8e8 100%)",
          border: on ? "1px solid #444" : "1px solid #cccccc",
          boxShadow: on
            ? "0 0 0 1.5px rgba(200,244,0,0.4), 0 2px 8px rgba(200,244,0,0.12), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 2px 6px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
          transition: "all 0.3s ease",
        }}>
          {/* Paddle rocker */}
          <div style={{
            position: "absolute",
            left: "4px",
            right: "4px",
            top: "5px",
            bottom: "5px",
            borderRadius: "2px",
            transformOrigin: "center 50%",
            transform: on ? "perspective(60px) rotateX(18deg)" : "perspective(60px) rotateX(-18deg)",
            transition: "transform 0.18s cubic-bezier(0.34,1.3,0.64,1), background 0.3s, border-color 0.3s",
            background: on
              ? "linear-gradient(180deg, #2e2e2e 0%, #222 50%, #2a2a2a 100%)"
              : "linear-gradient(180deg, #e0e0e0 0%, #f0f0f0 50%, #d5d5d5 100%)",
            boxShadow: on
              ? "inset 0 -1px 3px rgba(0,0,0,0.4), inset 0 2px 1px rgba(255,255,255,0.05)"
              : "inset 0 1px 3px rgba(0,0,0,0.15), inset 0 -2px 1px rgba(255,255,255,0.8)",
            border: on ? "1px solid #3a3a3a" : "1px solid #bbb",
            cursor: "pointer",
          }}>
            {/* Theme Icon (Sun/Moon) on the switch button */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: on ? "30%" : "70%",
              transform: "translate(-50%, -50%)",
              width: "12px",
              height: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "top 0.18s, color 0.2s, opacity 0.2s",
              color: on ? "#C8F400" : "#666",
            }}>
              {on ? (
                // Sun Icon (when Dark Mode is live)
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 3px rgba(200,244,0,0.6))" }}>
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.161 6.16a.75.75 0 0 1 1.06 0l1.59 1.59a.75.75 0 1 1-1.06 1.06l-1.59-1.59a.75.75 0 0 1 0-1.06Zm11.678 0a.75.75 0 0 1 0 1.06l-1.59 1.59a.75.75 0 1 1-1.06-1.06l1.59-1.59a.75.75 0 0 1 1.06 0ZM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM2.25 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM18.75 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.161 17.84a.75.75 0 0 1 0-1.06l1.59-1.59a.75.75 0 1 1 1.06 1.06l-1.59 1.59a.75.75 0 0 1-1.06 0Zm11.678 0a.75.75 0 0 1-1.06 0l-1.59-1.59a.75.75 0 1 1 1.06-1.06l1.59 1.59a.75.75 0 0 1 0 1.06ZM12 18.75a.75.75 0 0 1 .75.75V21.75a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75Z" />
                </svg>
              ) : (
                // Moon Icon (when Light Mode is live)
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: "100%", height: "100%" }}>
                  <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </div>
          </div>

          {/* "I" top */}
          <div style={{
            position: "absolute", top: "2px", left: "50%",
            transform: "translateX(-50%)", width: "2px", height: "3px",
            borderRadius: "1px",
            background: on ? "#666" : "#aaa",
            transition: "background 0.2s",
          }} />

          {/* "O" bottom */}
          <div style={{
            position: "absolute", bottom: "2px", left: "50%",
            transform: "translateX(-50%)", width: "4px", height: "3px",
            borderRadius: "2px",
            border: `1px solid ${on ? "#666" : "#555"}`,
            background: "transparent",
            transition: "border-color 0.2s",
          }} />
        </div>

        {/* Spark particles */}
        {sparks.map((s) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "2.5px",
              height: "2.5px",
              borderRadius: "50%",
              background: on ? "#C8F400" : "#ff9f1a",
              pointerEvents: "none",
              boxShadow: `0 0 4px 1px ${on ? "rgba(200,244,0,0.9)" : "rgba(255,159,26,0.9)"}`,
              animation: `oe-home-spark-${s.id % 5} 0.4s ease-out forwards`,
              zIndex: 3,
            }}
          />
        ))}

        <style>{`
          ${[0,1,2,3,4].map((i) => `
            @keyframes oe-home-spark-${i} {
              0%   { opacity: 1; transform: translate(-50%,-50%) translate(0px,0px) scale(1); }
              100% { opacity: 0; transform: translate(-50%,-50%) translate(${(Math.cos(i*72*Math.PI/180)*14).toFixed(4)}px, ${(Math.sin(i*72*Math.PI/180)*14).toFixed(4)}px) scale(0.1); }
            }
          `).join("")}
        `}</style>
      </button>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const pathname = usePathname();
  const { isDark } = useTheme();

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
        background: isDark ? "#0f0f0f" : "#ffffff",
        borderBottom: scrolled
          ? (isDark ? "1px solid #2a2a2a" : "1px solid #e5e7eb")
          : "1px solid transparent",
        boxShadow: scrolled
          ? (isDark ? "0 2px 16px rgba(0,0,0,0.3)" : "0 2px 16px rgba(0,0,0,0.05)")
          : "none",
      }}
    >
      {/* ⚡ Wall Switch — pinned to absolute right of navbar */}
      <div
        className="hidden lg:flex items-center"
        style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
      >
        <ElectricSwitch />
      </div>
      <div className="site-container">
        <div className="flex items-center justify-between" style={{ height: "68px" }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Omni Electrics">
            <div
              className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-gray-200/60 bg-black logo-shock"
            >
              <img src="/logo.jpg" alt="Omni Electrics Logo" loading="eager" decoding="async" className="w-full h-full object-cover scale-105" />
            </div>
            <div className="leading-none">
              <div
                className="font-extrabold tracking-tight leading-none"
                style={{ fontSize: "0.9375rem", color: isDark ? "#f0f0f0" : "#111111" }}
              >
                Omni Electrics
              </div>
              <div
                className="font-semibold uppercase tracking-wider"
                style={{ fontSize: "0.45rem", color: isDark ? "#7c8491" : "#9ca3af", marginTop: "2px" }}
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
                  style={{ color: active ? (isDark ? "#f0f0f0" : "#111111") : (isDark ? "#9ca3af" : "#6b7280") }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = isDark ? "#ffffff" : "#111111"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = active ? (isDark ? "#f0f0f0" : "#111111") : (isDark ? "#9ca3af" : "#6b7280"); }}
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
          <div className="hidden lg:flex items-center">
            <Link href="https://wa.me/919387322262" className="nav-pill" id="nav-cta" target="_blank" rel="noopener noreferrer">
              Get a Quote
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile Switch & Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <div style={{ transform: "scale(0.78)", transformOrigin: "right center" }}>
              <ElectricSwitch />
            </div>
            <button
              className="flex flex-col items-center justify-center gap-[5px] w-10 h-10"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close" : "Menu"}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-300 origin-center"
                  style={{
                    width: "20px", height: "2px", background: isDark ? "#f0f0f0" : "#111111",
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
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "500px" : "0",
          borderTop: open ? (isDark ? "1px solid #2a2a2a" : "1px solid #e5e7eb") : "none",
          background: isDark ? "#0f0f0f" : "#fff",
        }}
      >
        <div className="site-container py-4 flex flex-col gap-1">
          {NAV.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.label + l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 px-3 rounded-xl font-semibold text-sm transition-colors"
                style={{
                  color: active ? (isDark ? "#f0f0f0" : "#111111") : (isDark ? "#9ca3af" : "#6b7280"),
                  background: active ? (isDark ? "#1a1a1a" : "#f9fafb") : "transparent"
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="mt-3 pt-3" style={{ borderTop: isDark ? "1px solid #2a2a2a" : "1px solid #e5e7eb" }}>
            <Link href="https://wa.me/919387322262" className="nav-pill w-fit" target="_blank" rel="noopener noreferrer">
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
