import Link from "next/link";
import { Wallet, ListPlus, BarChart3, CheckCircle2, Coins, Building2 } from "lucide-react";

export default function AdminHome() {
  const cards = [
    { href: "/admin/resumo", icon: Coins, title: "Resumo do mês", desc: "Receitas, despesas e inadimplência" },
    { href: "/admin/caixa", icon: Wallet, title: "Caixa", desc: "Conta corrente, reserva e obras" },
    { href: "/admin/unidades", icon: Building2, title: "Apartamentos", desc: "Cota fixa por unidade" },
    { href: "/admin/pagamentos", icon: CheckCircle2, title: "Pagamentos por apto", desc: "Marcar cotas recebidas" },
    { href: "/admin/lancamentos", icon: ListPlus, title: "Lançamentos", desc: "Entradas e saídas do condomínio" },
    { href: "/admin/despesas", icon: BarChart3, title: "Despesas por categoria", desc: "Orçado vs. realizado" },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Link
            key={c.href}
            href={c.href}
            className="group bg-white rounded-2xl border border-slate-200/70 p-4 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-900/5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="font-semibold text-slate-900 tracking-tight">{c.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{c.desc}</p>
          </Link>
        );
      })}
    </div>
  );
}
