import type { Metadata } from "next";
import { Space_Grotesk, Syne, Syncopate, Michroma, Audiowide } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-box-2",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-box-1",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  variable: "--font-box-3",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: "400",
  variable: "--font-box-4",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-box-5",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ram Chandu | The Storyteller",
  description: "Building with logic. Creating with imagination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} ${syncopate.variable} ${michroma.variable} ${audiowide.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
