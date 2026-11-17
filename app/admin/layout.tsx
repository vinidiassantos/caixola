import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Caixola" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
        🔧 Área administrativa — os dados ficam salvos neste navegador (localStorage).
      </div>
      <nav className="flex flex-wrap gap-2 text-sm">
        <Link href="/admin" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-blue-50">Visão geral</Link>
        <Link href="/admin/resumo" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-blue-50">Resumo do caixa</Link>
        <Link href="/admin/lancamentos" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-blue-50">Lançamentos</Link>
        <Link href="/admin/despesas" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-blue-50">Despesas</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
