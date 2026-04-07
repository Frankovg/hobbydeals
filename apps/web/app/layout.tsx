import { Inter, Space_Grotesk } from "next/font/google";

import { Providers } from "./providers";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HobbyDeals — Chollos de hobbies",
  description:
    "Plataforma de chollos especializada en hobbies: juegos de mesa, gaming, coleccionismo, airsoft, música y modelismo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
