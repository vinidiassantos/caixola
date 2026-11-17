"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, CreditCard, FolderOpen } from "lucide-react";

const items = [
  { href: "/", label: "Início", icon: LayoutDashboard },
  { href: "/prestacao-de-contas", label: "Contas", icon: Receipt },
  { href: "/pagamentos", label: "Pagar", icon: CreditCard },
  { href: "/documentos", label: "Docs", icon: FolderOpen },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg shadow-slate-900/5 rounded-2xl px-1.5 py-1.5 flex gap-0.5">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              active ? "bg-indigo-50 text-indigo-700" : "text-slate-500"
            }`}
          >
            <Icon className="w-[18px] h-[18px]" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
