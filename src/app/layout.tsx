import type { Metadata } from "next";
import { Archivo_Black, Plus_Jakarta_Sans } from "next/font/google";
// Optional: uncomment if you drop Sakana.woff2 into src/app/fonts/
// import localFont from "next/font/local";
import "./globals.css";

// const sakana = localFont({
//   src: "./fonts/Sakana.woff2",
//   variable: "--font-sakana",
//   weight: "400",
// });

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NITRO | Future Energy Drink",
  description: "High-voltage 3D interactive energy drink showcase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased selection:bg-[#E0E600] selection:text-black">
        {children}
      </body>
    </html>
  );
}