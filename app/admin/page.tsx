import Link from "next/link";

export default function AdminHome() {
  const cards = [
    { href: "/admin/resumo", icon: "💰", title: "Resumo do caixa", desc: "Saldo, receitas, despesas e inadimplência" },
    { href: "/admin/lancamentos", icon: "📝", title: "Lançamentos", desc: "Entradas e saídas do condomínio" },
    { href: "/admin/despesas", icon: "📊", title: "Despesas por categoria", desc: "Orçado vs. realizado" },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-400 hover:shadow-sm transition">
          <div className="text-2xl mb-2">{c.icon}</div>
          <h2 className="font-semibold text-blue-900">{c.title}</h2>
          <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
        </Link>
      ))}
    </div>
  );
}
