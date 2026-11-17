"use client";

import { useEffect, useState } from "react";
import { useCaixolaData } from "@/hooks/useCaixolaData";
import { Check } from "lucide-react";

export default function AdminResumo() {
  const { data, hydrated, updateResumo } = useCaixolaData();
  const [form, setForm] = useState(data.resumo);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated) setForm(data.resumo);
  }, [hydrated, data.resumo]);

  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

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

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] p-5 space-y-3 max-w-xl">
      <h2 className="font-semibold text-slate-900 tracking-tight">Editar resumo do caixa</h2>
      {fields.map((f) => (
        <label key={f.key} className="block">
          <span className="text-sm font-medium text-slate-700">{f.label}</span>
          <input
            type="number"
            step={f.step || "0.01"}
            value={form[f.key] as number}
            onChange={(e) => handleChange(f.key, e.target.value)}
            className={inputClass}
          />
        </label>
      ))}
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-indigo-600/20 transition"
      >
        {saved ? (<><Check className="w-4 h-4" /> Salvo</>) : "Salvar"}
      </button>
    </form>
  );
}
