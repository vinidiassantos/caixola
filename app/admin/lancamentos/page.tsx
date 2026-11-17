"use client";

import { useEffect, useState } from "react";
import { useCaixolaData } from "@/hooks/useCaixolaData";
import type { Lancamento } from "@/types";
import { Pencil, Trash2, Plus } from "lucide-react";

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const empty: Lancamento = {
  id: "",
  descricao: "",
  categoria: "",
  valor: 0,
  data: new Date().toISOString().slice(0, 10),
  tipo: "saida",
};

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition";

export default function AdminLancamentos() {
  const { data, hydrated, updateLancamentos } = useCaixolaData();
  const [form, setForm] = useState<Lancamento>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!editingId) setForm({ ...empty });
  }, [editingId]);

  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

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
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] p-5 space-y-3 max-w-2xl">
        <h2 className="font-semibold text-slate-900 tracking-tight">
          {editingId ? "Editar lançamento" : "Novo lançamento"}
        </h2>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Descrição</span>
          <input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Categoria</span>
          <input value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className={inputClass} />
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="block flex-1">
            <span className="text-sm font-medium text-slate-700">Valor (R$)</span>
            <input type="number" step="0.01" value={form.valor || ""} onChange={(e) => setForm({ ...form, valor: parseFloat(e.target.value) || 0 })} className={inputClass} />
          </label>
          <label className="block flex-1">
            <span className="text-sm font-medium text-slate-700">Data</span>
            <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} className={inputClass} />
          </label>
          <label className="block flex-1">
            <span className="text-sm font-medium text-slate-700">Tipo</span>
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as Lancamento["tipo"] })} className={inputClass}>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2 pt-1">
          <button type="submit" className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-indigo-600/20 transition">
            <Plus className="w-4 h-4" />
            {editingId ? "Salvar edição" : "Adicionar"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(empty); }} className="px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 hover:bg-slate-50 transition">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] divide-y divide-slate-100">
        {data.lancamentos.length === 0 && <p className="p-5 text-sm text-slate-400 text-center">Nenhum lançamento cadastrado.</p>}
        {data.lancamentos.map((l) => (
          <div key={l.id} className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-[160px]">
              <p className="text-sm font-medium text-slate-800">{l.descricao}</p>
              <p className="text-xs text-slate-500">{l.categoria} · {new Date(l.data).toLocaleDateString("pt-BR")}</p>
            </div>
            <span className={`text-sm font-semibold tabular-nums ${l.tipo === "entrada" ? "text-emerald-600" : "text-rose-600"}`}>
              {l.tipo === "entrada" ? "+" : "−"} {formatBRL(l.valor)}
            </span>
            <div className="flex gap-1">
              <button onClick={() => { setForm(l); setEditingId(l.id); }} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition" title="Editar">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => updateLancamentos(data.lancamentos.filter((x) => x.id !== l.id))} className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Excluir">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
