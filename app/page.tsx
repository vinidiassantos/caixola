"use client";

import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useCaixolaData } from "@/hooks/useCaixolaData";

const formatBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Dashboard() {
  const { data, hydrated } = useCaixolaData();
  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;
  const { resumo, lancamentos } = data;

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-900/20">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
        <p className="relative text-xs font-semibold text-indigo-100 uppercase tracking-wider">Saldo em caixa</p>
        <p className="relative text-4xl font-bold tracking-tight mt-1 tabular-nums">{formatBRL(resumo.saldoAtual)}</p>
        <div className="relative mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{resumo.variacaoPercentual}% vs. mês anterior</span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard label="Receitas" value={formatBRL(resumo.receitasMes)} hint="Mês atual" variant="positive" icon={TrendingUp} />
        <StatCard label="Despesas" value={formatBRL(resumo.despesasMes)} hint="Mês atual" variant="negative" icon={TrendingDown} />
        <StatCard label="Inadimplência" value={`${resumo.inadimplenciaPercentual}%`} hint={`${resumo.unidadesInadimplentes} unidades`} icon={AlertCircle} />
      </section>

      <section className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Últimos lançamentos</h2>
          <span className="text-xs text-slate-400">{lancamentos.length} registros</span>
        </div>
        <ul className="divide-y divide-slate-100">
          {lancamentos.slice(0, 5).map((l) => (
            <li key={l.id} className="px-5 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full shrink-0 ${l.tipo === "entrada" ? "bg-emerald-500" : "bg-rose-500"}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{l.descricao}</p>
                  <p className="text-xs text-slate-500">{l.categoria} · {new Date(l.data).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold tabular-nums shrink-0 ${l.tipo === "entrada" ? "text-emerald-600" : "text-rose-600"}`}>
                {l.tipo === "entrada" ? "+" : "−"} {formatBRL(l.valor)}
              </span>
            </li>
          ))}
          {lancamentos.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-slate-400">Nenhum lançamento ainda.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
