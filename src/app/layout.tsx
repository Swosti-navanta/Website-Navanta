import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { DemoModalProvider } from "@/components/DemoModal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Navanta | The Supply Chain Intelligence Layer for Industrial Enterprises",
  description:
    "Navanta unifies orders, inventory, and procurement into one intelligence layer, turning fragmented signals into decisions from day one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <DemoModalProvider>{children}</DemoModalProvider>
      </body>
    </html>
  );
}
