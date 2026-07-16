import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import WhatsAppBtn from "@/components/WhatsAppBtn";
import ElectricCursor from "@/components/ElectricCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Omni Electrics | Trusted Electrical Contractors",
  description:
    "Omni Electrics — licensed electrical contractors delivering residential, commercial, and industrial electrical solutions with precision and safety.",
  keywords: "electrical contractor, electrical installation, solar, generator, CCTV, industrial wiring",
  openGraph: {
    siteName: "Omni Electrics",
    title: "Omni Electrics | Trusted Electrical Contractors",
    description: "Electrical Solutions That Empower Every Space.",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#C8F400",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white overflow-x-hidden" style={{ color: "#111111" }}>
        {children}
        <WhatsAppBtn />
        <ElectricCursor />
      </body>
    </html>
  );
}
