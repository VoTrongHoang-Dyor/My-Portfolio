import { Space_Grotesk, Manrope } from "next/font/google";
import { buildProfileArtifact } from "@/profile/server.mjs";
import { SITE_URL } from "@/lib/seo";
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

export const metadata = buildProfileArtifact("metadata", { origin: SITE_URL });

export const viewport = {
  themeColor: "#070a18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="alternate"
          type="application/json"
          href="/profile.json"
          title="Machine-readable candidate profile"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="AI-readable portfolio summary"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
