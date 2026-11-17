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
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 pb-24 md:pb-4 max-w-5xl mx-auto">{children}</main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
