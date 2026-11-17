"use client";

import { useCaixolaData } from "@/hooks/useCaixolaData";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const formatBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function PrestacaoDeContas() {
  const { data, hydrated } = useCaixolaData();
  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Prestação de Contas</h1>
        <p className="text-sm text-slate-500 mt-1">Maio/2025</p>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" />
        Aprovado pelo Conselho em 15/06
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02]">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Despesas por categoria</h2>
          <p className="text-xs text-slate-500 mt-0.5">Realizado vs. orçado</p>
        </div>
        <ul className="divide-y divide-slate-100">
          {data.despesas.map((c) => {
            const estouro = c.realizado > c.orcado;
            return (
              <li key={c.categoria} className="px-5 py-3 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-800">
                  {c.icone} {c.categoria}
                </span>
                <div className="text-right">
                  <span className={`text-sm font-semibold tabular-nums ${estouro ? "text-rose-600" : "text-slate-800"}`}>
                    {formatBRL(c.realizado)}
                  </span>
                  <span className="text-xs text-slate-400 tabular-nums ml-1.5">/ {formatBRL(c.orcado)}</span>
                  {estouro && (
                    <div className="flex items-center gap-1 justify-end text-[11px] text-rose-600 mt-0.5">
                      <AlertTriangle className="w-3 h-3" />
                      Acima do orçado
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
