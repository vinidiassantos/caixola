"use client";

import { useCaixolaData } from "@/hooks/useCaixolaData";
import { MESES_MATRIZ } from "@/lib/mock-data";
import { getStatus, getMesAtual } from "@/lib/pagamento-status";
import type { StatusVisual } from "@/types";

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const STATUS_DOT: Record<StatusVisual, string> = {
  pago: "bg-emerald-500 ring-emerald-200",
  pendente: "bg-slate-400 ring-slate-200",
  vencido: "bg-amber-500 ring-amber-200",
  inadimplente: "bg-rose-500 ring-rose-200",
};

export default function PagamentosPorApartamento() {
  const { data, hydrated } = useCaixolaData();
  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

  const mesAtual = getMesAtual();
  const doMes = data.pagamentos.filter((p) => p.competencia === mesAtual);
  const recebido = doMes.filter((p) => p.pagamento).reduce((s, p) => s + p.valor, 0);
  const esperado = doMes.reduce((s, p) => s + p.valor, 0);
  const emAberto = esperado - recebido;
  const inadimplentes = data.unidades.filter((u) => {
    const p = data.pagamentos.find((x) => x.unidade === u.numero && x.competencia === mesAtual);
    if (!p) return false;
    const st = getStatus(p);
    return st === "vencido" || st === "inadimplente";
  }).length;
  const totalUnidades = data.unidades.length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Pagamentos por Apartamento</h1>
        <p className="text-sm text-slate-500 mt-1">{totalUnidades} unidades · vencimento todo dia 18</p>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Esperado</p>
          <p className="text-lg font-bold text-slate-900 tabular-nums mt-1">{formatBRL(esperado)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Recebido</p>
          <p className="text-lg font-bold text-emerald-600 tabular-nums mt-1">{formatBRL(recebido)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Em aberto</p>
          <p className={`text-lg font-bold tabular-nums mt-1 ${emAberto > 0 ? "text-rose-600" : "text-slate-900"}`}>{formatBRL(emAberto)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Em atraso</p>
          <p className="text-lg font-bold text-slate-900 tabular-nums mt-1">{inadimplentes} / {totalUnidades}</p>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Histórico por unidade</h2>
            <p className="text-xs text-slate-500 mt-0.5">Últimos 6 meses</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Pago</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Em aberto</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Vencido</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Inadimplente</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50/50">
                <th className="text-left font-semibold px-5 py-2.5 sticky left-0 bg-slate-50/50 z-10">Unidade</th>
                {MESES_MATRIZ.map((m) => (
                  <th key={m.comp} className="text-center font-semibold px-3 py-2.5 min-w-[64px]">{m.label}</th>
                ))}
                <th className="text-right font-semibold px-5 py-2.5">Em aberto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.unidades.map((u) => {
                const pagamentosU = data.pagamentos.filter((p) => p.unidade === u.numero);
                const emAbertoU = pagamentosU
                  .filter((p) => getStatus(p) !== "pago")
                  .reduce((s, p) => s + p.valor, 0);
                return (
                  <tr key={u.numero} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-900 sticky left-0 bg-white z-10">{u.numero}</td>
                    {MESES_MATRIZ.map((m) => {
                      const p = pagamentosU.find((x) => x.competencia === m.comp);
                      if (!p) return <td key={m.comp} className="px-3 py-3 text-center text-slate-300">—</td>;
                      const st = getStatus(p);
                      return (
                        <td key={m.comp} className="px-3 py-3 text-center">
                          <span
                            className={`inline-block w-2.5 h-2.5 rounded-full ${STATUS_DOT[st]} ring-4`}
                            title={`${u.numero} · ${m.label}: ${st}${p.pagamento ? ` em ${p.pagamento}` : ""}`}
                          />
                        </td>
                      );
                    })}
                    <td className={`px-5 py-3 text-right tabular-nums font-semibold ${emAbertoU > 0 ? "text-rose-600" : "text-slate-400"}`}>
                      {emAbertoU > 0 ? formatBRL(emAbertoU) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="sm:hidden text-[11px] text-slate-400 text-center py-2 border-t border-slate-100">
          Deslize para ver os meses →
        </p>
      </section>
    </div>
  );
}
