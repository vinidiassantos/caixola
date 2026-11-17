"use client";

import { useEffect, useState } from "react";
import { useCaixolaData } from "@/hooks/useCaixolaData";
import type { CategoriaDespesa } from "@/types";

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const empty: CategoriaDespesa = { categoria: "", orcado: 0, realizado: 0, icone: "📌" };

export default function AdminDespesas() {
  const { data, hydrated, updateDespesas } = useCaixolaData();
  const [form, setForm] = useState<CategoriaDespesa>(empty);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (editingIndex === null) setForm(empty);
  }, [editingIndex]);

  if (!hydrated) return <p className="text-sm text-gray-500">Carregando…</p>;

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
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <h2 className="font-semibold text-blue-900">{editingIndex !== null ? "Editar categoria" : "Nova categoria"}</h2>
        <div className="flex gap-3">
          <label className="block flex-1">
            <span className="text-sm text-gray-700">Categoria</span>
            <input value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </label>
          <label className="block w-24">
            <span className="text-sm text-gray-700">Ícone</span>
            <input value={form.icone} onChange={(e) => setForm({ ...form, icone: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-center" />
          </label>
        </div>
        <div className="flex gap-3">
          <label className="block flex-1">
            <span className="text-sm text-gray-700">Orçado (R$)</span>
            <input type="number" step="0.01" value={form.orcado || ""} onChange={(e) => setForm({ ...form, orcado: parseFloat(e.target.value) || 0 })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </label>
          <label className="block flex-1">
            <span className="text-sm text-gray-700">Realizado (R$)</span>
            <input type="number" step="0.01" value={form.realizado || ""} onChange={(e) => setForm({ ...form, realizado: parseFloat(e.target.value) || 0 })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
            {editingIndex !== null ? "Salvar edição" : "Adicionar"}
          </button>
          {editingIndex !== null && (
            <button type="button" onClick={() => { setEditingIndex(null); setForm(empty); }}
              className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50">Cancelar</button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {data.despesas.map((d, idx) => (
          <div key={idx} className="p-3 flex items-center justify-between text-sm gap-2 flex-wrap">
            <span className="flex-1">{d.icone} {d.categoria}</span>
            <span className="text-gray-600">{formatBRL(d.realizado)} / {formatBRL(d.orcado)}</span>
            <div className="flex gap-1">
              <button onClick={() => { setForm(d); setEditingIndex(idx); }} className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50">Editar</button>
              <button onClick={() => updateDespesas(data.despesas.filter((_, i) => i !== idx))}
                className="text-xs px-2 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
