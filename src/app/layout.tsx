import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/** MD Primer (test cut) — site-wide type for now */
const mdPrimer = localFont({
  src: [
    { path: "../fonts/MDPrimerTest-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/MDPrimerTest-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/MDPrimerTest-Semibold.otf", weight: "600", style: "normal" },
    { path: "../fonts/MDPrimerTest-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-primer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Navanta — The Supply Chain Intelligence Layer for Industrial Enterprises",
  description:
    "Navanta unifies orders, inventory, and procurement into one intelligence layer — turning fragmented signals into decisions from day one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mdPrimer.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
