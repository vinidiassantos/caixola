import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caixola",
  description: "Transparência na gestão do seu condomínio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 md:px-8 py-5 pb-28 md:pb-10 max-w-6xl mx-auto w-full">{children}</main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
