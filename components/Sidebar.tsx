import Link from "next/link";

const items = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/prestacao-de-contas", label: "Prestação de Contas", icon: "📄" },
  { href: "/pagamentos", label: "Pagamentos", icon: "💳" },
  { href: "/documentos", label: "Documentos", icon: "📁" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 min-h-screen p-4 gap-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-900 transition"
        >
          <span>{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      ))}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-50 text-amber-700 transition"
        >
          <span>🔧</span>
          <span className="text-sm font-medium">Admin</span>
        </Link>
      </div>
    </aside>
  );
}
