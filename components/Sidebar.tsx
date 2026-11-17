"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, CreditCard, FolderOpen, Settings2 } from "lucide-react";

const items = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/prestacao-de-contas", label: "Prestação de Contas", icon: Receipt },
  { href: "/pagamentos", label: "Pagamentos", icon: CreditCard },
  { href: "/documentos", label: "Documentos", icon: FolderOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/70 min-h-[calc(100vh-3.5rem)] p-3 gap-0.5 sticky top-14 shrink-0">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">Menu</p>
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon className="w-[18px] h-[18px]" />
            <span>{item.label}</span>
          </Link>
        );
      })}
      <div className="mt-auto pt-3 border-t border-slate-100">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
        >
          <Settings2 className="w-[18px] h-[18px]" />
          <span>Admin</span>
        </Link>
      </div>
    </aside>
  );
}
