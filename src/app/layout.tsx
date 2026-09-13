import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coastal Cabs | Gokarna & Coastal Karnataka Cab Services",
  description:
    "Premium cab services in Gokarna and Coastal Karnataka for sightseeing, temple tours, railway transfers and outstation journeys.",
  keywords: [
    "Gokarna cab service",
    "Gokarna taxi service",
    "Gokarna sightseeing cab",
    "Gokarna to Murudeshwar cab",
    "Gokarna to Yana cab",
    "Coastal Karnataka taxi",
    "Gokarna airport taxi",
    "Gokarna railway station taxi",
  ],
  authors: [{ name: "Coastal Cabs by Gokarna Friends" }],
  metadataBase: new URL("https://coastalcabsbygokarnafriends.com"),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Coastal Cabs | Explore Gokarna & Coastal Karnataka",
    description:
      "Premium cab services for Gokarna, Coastal Karnataka sightseeing, temple tours and railway transfers.",
    type: "website",
    locale: "en_IN",
    siteName: "Coastal Cabs by Gokarna Friends",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}