"use client";

import { useEffect, useState } from "react";
import { useCaixolaData } from "@/hooks/useCaixolaData";

export default function AdminResumo() {
  const { data, hydrated, updateResumo } = useCaixolaData();
  const [form, setForm] = useState(data.resumo);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated) setForm(data.resumo);
  }, [hydrated, data.resumo]);

  if (!hydrated) return <p className="text-sm text-gray-500">Carregando…</p>;

  const handleChange = (field: keyof typeof form, value: string) => {
    const parsed = field === "unidadesInadimplentes" ? parseInt(value || "0", 10) : parseFloat(value || "0");
    setForm({ ...form, [field]: isNaN(parsed) ? 0 : parsed });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateResumo(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields: { key: keyof typeof form; label: string; step?: string }[] = [
    { key: "saldoAtual", label: "Saldo atual (R$)" },
    { key: "variacaoPercentual", label: "Variação % vs. mês anterior", step: "0.1" },
    { key: "receitasMes", label: "Receitas do mês (R$)" },
    { key: "despesasMes", label: "Despesas do mês (R$)" },
    { key: "inadimplenciaPercentual", label: "Inadimplência (%)", step: "0.1" },
    { key: "unidadesInadimplentes", label: "Unidades inadimplentes" },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <h2 className="font-semibold text-blue-900">Editar resumo do caixa</h2>
      {fields.map((f) => (
        <label key={f.key} className="block">
          <span className="text-sm text-gray-700">{f.label}</span>
          <input
            type="number"
            step={f.step || "0.01"}
            value={form[f.key] as number}
            onChange={(e) => handleChange(f.key, e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
      ))}
      <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
        {saved ? "Salvo ✓" : "Salvar"}
      </button>
    </form>
  );
}
