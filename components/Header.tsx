export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-blue-900">Caixola</h1>
      <div className="flex items-center gap-3 text-xl">
        <span>🔔</span>
        <span>👤</span>
      </div>
    </header>
  );
}
