"use client";

import { useEffect, useState } from "react";
import { useCaixolaData } from "@/hooks/useCaixolaData";
import type { Unidade } from "@/types";
import { Check } from "lucide-react";

export default function AdminUnidades() {
  const { data, hydrated, updateUnidades } = useCaixolaData();
  const [form, setForm] = useState<Unidade[]>(data.unidades);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated) setForm(data.unidades);
  }, [hydrated, data.unidades]);

  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

  const handleChange = (idx: number, value: string) => {
    const n = parseFloat(value || "0");
    const next = [...form];
    next[idx] = { ...next[idx], valorMensal: isNaN(n) ? 0 : n };
    setForm(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUnidades(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const total = form.reduce((s, u) => s + u.valorMensal, 0);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] p-5 space-y-3 max-w-xl">
      <div>
        <h2 className="font-semibold text-slate-900 tracking-tight">Cota fixa por apartamento</h2>
        <p className="text-sm text-slate-500 mt-0.5">Valor mensal cobrado de cada unidade</p>
      </div>
      <div className="space-y-2">
        {form.map((u, idx) => (
          <div key={u.numero} className="flex items-center gap-3">
            <span className="w-16 font-semibold text-slate-700 tabular-nums">{u.numero}</span>
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
              <input
                type="number"
                step="0.01"
                value={u.valorMensal}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-sm">
        <span className="text-slate-500">Total mensal previsto: </span>
        <span className="font-semibold text-slate-900 tabular-nums">
          {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </span>
      </div>
      <p className="text-[11px] text-slate-500">
        ℹ️ Alterar a cota afeta apenas lançamentos novos; os já lançados mantêm o valor da época.
      </p>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-indigo-600/20 transition"
      >
        {saved ? (<><Check className="w-4 h-4" /> Salvo</>) : "Salvar"}
      </button>
    </form>
  );
}
