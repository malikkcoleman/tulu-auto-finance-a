import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tulu Auto Finance | Pre-Qualify in 2 Minutes",
  description:
    "See if you qualify for a car \u2014 even with bad credit. Quick pre-qualification, no credit impact, real answers in 2 minutes.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tulu Auto Finance | Pre-Qualify in 2 Minutes",
    description:
      "See if you qualify for a car \u2014 even with bad credit. Quick pre-qualification, no credit impact, real answers in 2 minutes.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tulu Auto Finance | Pre-Qualify in 2 Minutes",
    description:
      "See if you qualify for a car \u2014 even with bad credit. Quick pre-qualification, no credit impact, real answers in 2 minutes.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#0F2027] text-[#AFC3C7] selection:bg-[rgba(127,208,181,0.25)] selection:text-[#F4F7F6]">
        {children}
      </body>
    </html>
  );
}
