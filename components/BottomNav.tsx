import Link from "next/link";

const items = [
  { href: "/", label: "Início", icon: "📊" },
  { href: "/prestacao-de-contas", label: "Contas", icon: "📄" },
  { href: "/pagamentos", label: "Pagar", icon: "💳" },
  { href: "/documentos", label: "Docs", icon: "📁" },
];

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center text-xs text-gray-600">
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
