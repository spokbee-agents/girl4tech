import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "girl4tech — Karina C",
  description: "Industrial Spatial Computing. The End of Software. Built on Spokbee.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
