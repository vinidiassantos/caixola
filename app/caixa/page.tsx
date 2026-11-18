"use client";

import { Wallet, Shield, Hammer, TrendingUp, TrendingDown } from "lucide-react";
import { useCaixolaData } from "@/hooks/useCaixolaData";

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Caixa() {
  const { data, hydrated } = useCaixolaData();
  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

  const { caixa, resumo } = data;
  const total = caixa.contaCorrente + caixa.fundoReserva + caixa.fundoObras;

  const cards = [
    { label: "Conta corrente", value: caixa.contaCorrente, icon: Wallet, cor: "from-indigo-500 to-indigo-600", desc: "Saldo operacional disponível" },
    { label: "Fundo de reserva", value: caixa.fundoReserva, icon: Shield, cor: "from-emerald-500 to-emerald-600", desc: "Reserva para emergências e obras" },
    { label: "Fundo de obras", value: caixa.fundoObras, icon: Hammer, cor: "from-amber-500 to-amber-600", desc: "Reservado para reformas aprovadas" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Caixa do Condomínio</h1>
        <p className="text-sm text-slate-500 mt-1">Visão consolidada dos recursos</p>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/20">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <p className="relative text-xs font-semibold text-slate-300 uppercase tracking-wider">Caixa total</p>
        <p className="relative text-4xl font-bold tracking-tight mt-1 tabular-nums">{formatBRL(total)}</p>
        <p className="relative text-xs text-slate-400 mt-2">Somatório de conta corrente, reserva e obras</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-sm shadow-slate-900/[0.02]">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.cor} text-white flex items-center justify-center mb-3 shadow-sm`}>
                <Icon className="w-[18px] h-[18px]" />
              </div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{c.label}</p>
              <p className="text-xl font-bold text-slate-900 tabular-nums mt-1">{formatBRL(c.value)}</p>
              <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02]">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Movimento do mês</h2>
          <p className="text-xs text-slate-500 mt-0.5">Entradas e saídas de novembro/2025</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-[18px] h-[18px]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Receitas</p>
              <p className="text-lg font-bold text-emerald-600 tabular-nums">{formatBRL(resumo.receitasMes)}</p>
            </div>
          </div>
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <TrendingDown className="w-[18px] h-[18px]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Despesas</p>
              <p className="text-lg font-bold text-rose-600 tabular-nums">{formatBRL(resumo.despesasMes)}</p>
            </div>
          </div>
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Wallet className="w-[18px] h-[18px]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Resultado</p>
              <p className={`text-lg font-bold tabular-nums ${resumo.receitasMes - resumo.despesasMes >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {formatBRL(resumo.receitasMes - resumo.despesasMes)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
