"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench } from "lucide-react";

const tabs = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/resumo", label: "Resumo" },
  { href: "/admin/lancamentos", label: "Lançamentos" },
  { href: "/admin/despesas", label: "Despesas" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200/70 rounded-2xl p-3.5 text-sm text-amber-800 flex items-center gap-2.5">
        <Wrench className="w-4 h-4 shrink-0" />
        <span>Área administrativa — os dados ficam salvos neste navegador (localStorage).</span>
      </div>
      <nav className="flex flex-wrap gap-1 bg-white rounded-2xl border border-slate-200/70 p-1.5 shadow-sm shadow-slate-900/[0.02]">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                active ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
      <div>{children}</div>
    </div>
  );
}
