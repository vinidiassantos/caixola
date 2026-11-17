"use client";

import { useEffect, useState } from "react";
import { useCaixolaData } from "@/hooks/useCaixolaData";
import type { Lancamento } from "@/types";

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const empty: Lancamento = {
  id: "",
  descricao: "",
  categoria: "",
  valor: 0,
  data: new Date().toISOString().slice(0, 10),
  tipo: "saida",
};

export default function AdminLancamentos() {
  const { data, hydrated, updateLancamentos } = useCaixolaData();
  const [form, setForm] = useState<Lancamento>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!editingId) setForm({ ...empty });
  }, [editingId]);

  if (!hydrated) return <p className="text-sm text-gray-500">Carregando…</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.descricao || !form.valor) return;
    if (editingId) {
      updateLancamentos(data.lancamentos.map((l) => (l.id === editingId ? { ...form, id: editingId } : l)));
      setEditingId(null);
    } else {
      updateLancamentos([{ ...form, id: crypto.randomUUID() }, ...data.lancamentos]);
    }
    setForm(empty);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <h2 className="font-semibold text-blue-900">{editingId ? "Editar lançamento" : "Novo lançamento"}</h2>
        <label className="block">
          <span className="text-sm text-gray-700">Descrição</span>
          <input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-700">Categoria</span>
          <input value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </label>
        <div className="flex gap-3">
          <label className="block flex-1">
            <span className="text-sm text-gray-700">Valor (R$)</span>
            <input type="number" step="0.01" value={form.valor || ""} onChange={(e) => setForm({ ...form, valor: parseFloat(e.target.value) || 0 })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </label>
          <label className="block flex-1">
            <span className="text-sm text-gray-700">Data</span>
            <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-gray-700">Tipo</span>
          <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as Lancamento["tipo"] })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </label>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
            {editingId ? "Salvar edição" : "Adicionar"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(empty); }}
              className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50">Cancelar</button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {data.lancamentos.length === 0 && <p className="p-4 text-sm text-gray-500">Nenhum lançamento cadastrado.</p>}
        {data.lancamentos.map((l) => (
          <div key={l.id} className="p-3 flex items-center justify-between text-sm gap-2 flex-wrap">
            <div className="flex-1 min-w-[140px]">
              <p className="font-medium text-gray-800">{l.descricao}</p>
              <p className="text-xs text-gray-500">{l.categoria} · {l.data}</p>
            </div>
            <span className={l.tipo === "entrada" ? "text-green-600" : "text-red-600"}>
              {l.tipo === "entrada" ? "+" : "-"} {formatBRL(l.valor)}
            </span>
            <div className="flex gap-1">
              <button onClick={() => { setForm(l); setEditingId(l.id); }} className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50">Editar</button>
              <button onClick={() => updateLancamentos(data.lancamentos.filter((x) => x.id !== l.id))}
                className="text-xs px-2 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
