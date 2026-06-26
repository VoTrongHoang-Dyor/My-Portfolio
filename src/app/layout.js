import { Space_Grotesk, Manrope } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description:
    "3D portfolio of Võ Trọng Hoàng — Freelance AI Automation Engineer specializing in n8n workflows, browser automation, and LLM-powered tools.",
  applicationName: "Võ Trọng Hoàng — Portfolio",
  authors: [{ name: SITE.name }],
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description:
      "Freelance AI Automation Engineer — n8n workflows, browser automation, and LLM-powered tools.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#070a18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
