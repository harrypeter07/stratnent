import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Startnent — Automated Sales & Lead-Generation Systems",
  description: "We build the engine behind your growth. Startnent designs automated sales and lead-gen systems on n8n — so your pipeline fills itself while your team focuses on closing.",
  metadataBase: new URL("https://startnent.com"),
  openGraph: {
    title: "Startnent — Automated Sales & Lead-Generation Systems",
    description: "Startnent designs automated sales and lead-gen systems on n8n to keep your pipeline full 24/7.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased bg-bg text-text selection:bg-coral/30 selection:text-text">
        {children}
      </body>
    </html>
  );
}
