"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, AlertCircle, Shield, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useCaixolaData } from "@/hooks/useCaixolaData";
import { getStatus, getMesAtual, getDiasAtraso } from "@/lib/pagamento-status";
import type { StatusVisual } from "@/types";

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const STATUS_CONFIG: Record<StatusVisual, { label: string; bg: string; border: string; text: string; icon: typeof CheckCircle2 }> = {
  pago: { label: "Pago", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: CheckCircle2 },
  pendente: { label: "Em aberto", bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-600", icon: Clock },
  vencido: { label: "Vencido", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: Clock },
  inadimplente: { label: "Inadimplente", bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", icon: AlertTriangle },
};

export default function Dashboard() {
  const { data, hydrated } = useCaixolaData();
  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

  const { resumo, caixa, lancamentos, pagamentos, unidades } = data;
  const totalCaixa = caixa.contaCorrente + caixa.fundoReserva + caixa.fundoObras;
  const mesAtual = getMesAtual();
  const mesLabel = new Date(mesAtual + "-01").toLocaleDateString("pt-BR", { month: "short", year: "numeric" });

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-900/20">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
        <p className="relative text-xs font-semibold text-indigo-100 uppercase tracking-wider">Caixa total</p>
        <p className="relative text-4xl font-bold tracking-tight mt-1 tabular-nums">{formatBRL(totalCaixa)}</p>
        <div className="relative mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            {resumo.variacaoPercentual}% vs. mês anterior
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur text-xs">
            Reserva: {formatBRL(caixa.fundoReserva)}
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <StatCard label="Receitas" value={formatBRL(resumo.receitasMes)} hint="Mês atual" variant="positive" icon={TrendingUp} />
        <StatCard label="Despesas" value={formatBRL(resumo.despesasMes)} hint="Mês atual" variant="negative" icon={TrendingDown} />
        <StatCard label="Inadimplência" value={`${resumo.inadimplenciaPercentual}%`} hint={`${resumo.unidadesInadimplentes} unidades`} icon={AlertCircle} />
        <StatCard label="Fundo de reserva" value={formatBRL(caixa.fundoReserva)} hint="Reserva do condomínio" icon={Shield} />
      </section>

      <section className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02]">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Situação dos apartamentos</h2>
            <p className="text-xs text-slate-500 mt-0.5">Vencimento dia 18 · {mesLabel}</p>
          </div>
          <Link href="/pagamentos" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
            Ver histórico →
          </Link>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {unidades.map((u) => {
            const p = pagamentos.find((x) => x.unidade === u.numero && x.competencia === mesAtual);
            const st: StatusVisual = p ? getStatus(p) : "pendente";
            const cfg = STATUS_CONFIG[st];
            const Icon = cfg.icon;
            const atraso = p ? getDiasAtraso(p) : 0;
            return (
              <div key={u.numero} className={`rounded-2xl border ${cfg.bg} ${cfg.border} p-3`}>
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold tabular-nums ${cfg.text}`}>{u.numero}</span>
                  <Icon className={`w-4 h-4 ${cfg.text}`} />
                </div>
                <p className={`text-[11px] font-semibold ${cfg.text} mt-0.5`}>{cfg.label}</p>
                <p className="text-[11px] text-slate-500 tabular-nums mt-0.5">
                  {st === "pago"
                    ? formatBRL(u.valorMensal)
                    : atraso > 0
                    ? `Há ${atraso}d · ${formatBRL(u.valorMensal)}`
                    : formatBRL(u.valorMensal)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="px-5 py-2.5 border-t border-slate-100 flex flex-wrap gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Pago</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Em aberto</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Vencido (≤5 dias)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Inadimplente (&gt;5 dias)</span>
        </div>
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
