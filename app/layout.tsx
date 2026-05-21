import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Stem.Split - AI Audio Stem Separation",
  description: "Split your audio tracks into vocals, drums, bass, and melody",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="font-sans antialiased flex flex-col h-screen"
        suppressHydrationWarning
      >
        <Nav />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto ">{children}</main>
        </div>
      </body>
    </html>
  );
}
