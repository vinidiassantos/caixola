"use client";

import { useEffect, useState } from "react";
import { useCaixolaData } from "@/hooks/useCaixolaData";
import type { CategoriaDespesa } from "@/types";
import { Pencil, Trash2, Plus } from "lucide-react";

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const empty: CategoriaDespesa = { categoria: "", orcado: 0, realizado: 0, icone: "📌" };

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition";

export default function AdminDespesas() {
  const { data, hydrated, updateDespesas } = useCaixolaData();
  const [form, setForm] = useState<CategoriaDespesa>(empty);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (editingIndex === null) setForm(empty);
  }, [editingIndex]);

  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoria) return;
    if (editingIndex !== null) {
      const next = [...data.despesas];
      next[editingIndex] = form;
      updateDespesas(next);
      setEditingIndex(null);
    } else {
      updateDespesas([...data.despesas, form]);
    }
    setForm(empty);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] p-5 space-y-3 max-w-2xl">
        <h2 className="font-semibold text-slate-900 tracking-tight">
          {editingIndex !== null ? "Editar categoria" : "Nova categoria"}
        </h2>
        <div className="flex gap-3">
          <label className="block flex-1">
            <span className="text-sm font-medium text-slate-700">Categoria</span>
            <input value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className={inputClass} />
          </label>
          <label className="block w-24">
            <span className="text-sm font-medium text-slate-700">Ícone</span>
            <input value={form.icone} onChange={(e) => setForm({ ...form, icone: e.target.value })} className={`${inputClass} text-center`} />
          </label>
        </div>
        <div className="flex gap-3">
          <label className="block flex-1">
            <span className="text-sm font-medium text-slate-700">Orçado (R$)</span>
            <input type="number" step="0.01" value={form.orcado || ""} onChange={(e) => setForm({ ...form, orcado: parseFloat(e.target.value) || 0 })} className={inputClass} />
          </label>
          <label className="block flex-1">
            <span className="text-sm font-medium text-slate-700">Realizado (R$)</span>
            <input type="number" step="0.01" value={form.realizado || ""} onChange={(e) => setForm({ ...form, realizado: parseFloat(e.target.value) || 0 })} className={inputClass} />
          </label>
        </div>
        <div className="flex gap-2 pt-1">
          <button type="submit" className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-indigo-600/20 transition">
            <Plus className="w-4 h-4" />
            {editingIndex !== null ? "Salvar edição" : "Adicionar"}
          </button>
          {editingIndex !== null && (
            <button type="button" onClick={() => { setEditingIndex(null); setForm(empty); }} className="px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 hover:bg-slate-50 transition">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] divide-y divide-slate-100">
        {data.despesas.map((d, idx) => (
          <div key={idx} className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
            <span className="flex-1 text-sm font-medium text-slate-800">{d.icone} {d.categoria}</span>
            <span className="text-sm text-slate-600 tabular-nums">{formatBRL(d.realizado)} <span className="text-slate-400">/ {formatBRL(d.orcado)}</span></span>
            <div className="flex gap-1">
              <button onClick={() => { setForm(d); setEditingIndex(idx); }} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition" title="Editar">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => updateDespesas(data.despesas.filter((_, i) => i !== idx))} className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Excluir">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
