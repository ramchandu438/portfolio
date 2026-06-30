import type { Metadata } from "next";
import { Source_Serif_4, Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const racingSansOne = localFont({
  src: "../../public/fonts/RacingSansOne-Regular.ttf",
  variable: "--font-headline",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ram Chandu — Developer, Creator, Storyteller",
  description:
    "Building with logic. Creating with imagination. The portfolio of Ram Chandu — a developer, videographer, and creative builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${racingSansOne.variable} ${sourceSerif.variable} ${robotoCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
