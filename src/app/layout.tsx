import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ChatProvider from "@/components/providers/ChatProvider";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const garnetta = localFont({
  src: "./fonts/Garnetta.otf",
  variable: "--font-garnetta",
  display: "block",
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${garnetta.variable} dark`} suppressHydrationWarning>
      <body className="antialiased bg-[#0A0A0A]">
        <ThemeProvider>
          <ChatProvider>
            <SmoothScroll>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
            <div className="grain-overlay" />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
