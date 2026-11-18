"use client";

import { useEffect, useState } from "react";
import { useCaixolaData } from "@/hooks/useCaixolaData";
import { MESES_MATRIZ } from "@/lib/mock-data";
import { getStatus, getDiasAtraso, hojeISO, getVencimento } from "@/lib/pagamento-status";
import { CheckCircle2, Clock, AlertTriangle, RotateCcw, Plus, Trash2, Save } from "lucide-react";
import type { PagamentoUnidade } from "@/types";

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition";

export default function AdminPagamentos() {
  const { data, hydrated, updatePagamentos } = useCaixolaData();
  const [mesSel, setMesSel] = useState<string>(MESES_MATRIZ[0].comp);

  const [formUnidade, setFormUnidade] = useState<string>("");
  const [formMes, setFormMes] = useState<string>(MESES_MATRIZ[0].comp);
  const [formValor, setFormValor] = useState<string>("");
  const [formPago, setFormPago] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    if (data.unidades.length > 0 && !formUnidade) setFormUnidade(data.unidades[0].numero);
  }, [data.unidades, formUnidade]);

  useEffect(() => {
    if (!formUnidade || !formMes || !data.unidades.length) return;
    const existing = data.pagamentos.find((p) => p.unidade === formUnidade && p.competencia === formMes);
    if (existing) {
      setFormValor(String(existing.valor));
      setFormPago(!!existing.pagamento);
      setEditandoId(existing.id);
    } else {
      const unidade = data.unidades.find((u) => u.numero === formUnidade);
      setFormValor(String(unidade?.valorMensal ?? 650));
      setFormPago(false);
      setEditandoId(null);
    }
  }, [formUnidade, formMes, data.unidades]);

  if (!hydrated) return <p className="text-sm text-slate-500">Carregando…</p>;

  const doMes = data.pagamentos.filter((p) => p.competencia === mesSel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valorNum = parseFloat(formValor) || 0;
    if (!formUnidade || !formMes || valorNum <= 0) {
      setMensagem("Preencha unidade, mês e valor (> 0).");
      return;
    }
    const existing = data.pagamentos.find((p) => p.unidade === formUnidade && p.competencia === formMes);
    if (existing) {
      updatePagamentos(
        data.pagamentos.map((p) =>
          p.id === existing.id
            ? { ...p, valor: valorNum, pagamento: formPago ? (p.pagamento || hojeISO()) : undefined }
            : p
        )
      );
      setMensagem(`Cobrança do apto ${formUnidade} (${formMes}) atualizada.`);
    } else {
      const nova: PagamentoUnidade = {
        id: `${formUnidade}-${formMes}`,
        unidade: formUnidade,
        competencia: formMes,
        valor: valorNum,
        vencimento: getVencimento(formMes),
        pagamento: formPago ? hojeISO() : undefined,
      };
      updatePagamentos([...data.pagamentos, nova]);
      setMensagem(`Cobrança do apto ${formUnidade} (${formMes}) criada.`);
    }
    setTimeout(() => setMensagem(""), 3000);
  };

  const marcarPago = (id: string) => {
    updatePagamentos(data.pagamentos.map((p) => (p.id === id ? { ...p, pagamento: hojeISO() } : p)));
  };

  const marcarPendente = (id: string) => {
    updatePagamentos(data.pagamentos.map((p) => (p.id === id ? { ...p, pagamento: undefined } : p)));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Excluir esta cobrança?")) return;
    updatePagamentos(data.pagamentos.filter((p) => p.id !== id));
  };

  const handleCarregarParaEditar = (p: PagamentoUnidade) => {
    setFormUnidade(p.unidade);
    setFormMes(p.competencia);
    setFormValor(String(p.valor));
    setFormPago(!!p.pagamento);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] p-5 space-y-3">
        <div>
          <h2 className="font-semibold text-slate-900 tracking-tight">Lançamento manual por apartamento</h2>
          <p className="text-sm text-slate-500 mt-0.5">Crie ou edite a cobrança de qualquer unidade em qualquer mês</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Apartamento</span>
            <select value={formUnidade} onChange={(e) => setFormUnidade(e.target.value)} className={inputClass}>
              {data.unidades.map((u) => (
                <option key={u.numero} value={u.numero}>{u.numero} — {formatBRL(u.valorMensal)}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Mês</span>
            <select value={formMes} onChange={(e) => setFormMes(e.target.value)} className={inputClass}>
              {MESES_MATRIZ.map((m) => (
                <option key={m.comp} value={m.comp}>{m.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Valor (R$)</span>
            <input type="number" step="0.01" value={formValor} onChange={(e) => setFormValor(e.target.value)} className={inputClass} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Status</span>
            <select value={formPago ? "pago" : "pendente"} onChange={(e) => setFormPago(e.target.value === "pago")} className={inputClass}>
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
            </select>
          </label>
        </div>
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <button type="submit" className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-indigo-600/20 transition">
            {editandoId ? <><Save className="w-4 h-4" /> Atualizar cobrança</> : <><Plus className="w-4 h-4" /> Criar cobrança</>}
          </button>
          {editandoId && (
            <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              Cobrança existente — alterações substituirão o valor
            </span>
          )}
          {mensagem && <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">{mensagem}</span>}
        </div>
      </form>

      <div>
        <h2 className="font-semibold text-slate-900 tracking-tight">Cobranças do mês</h2>
        <p className="text-sm text-slate-500 mt-0.5">Selecione um mês para ver e editar cada linha</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {MESES_MATRIZ.map((m) => (
          <button
            key={m.comp}
            onClick={() => setMesSel(m.comp)}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              mesSel === m.comp ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] divide-y divide-slate-100">
        {doMes.length === 0 && <p className="p-5 text-sm text-slate-400 text-center">Nenhuma cobrança neste mês.</p>}
        {doMes.map((p) => {
          const st = getStatus(p);
          const atraso = getDiasAtraso(p);
          const cfg =
            st === "pago"
              ? { icon: CheckCircle2, cor: "text-emerald-600", bg: "bg-emerald-50", label: "Pago", detail: p.pagamento ? `em ${new Date(p.pagamento + "T00:00:00").toLocaleDateString("pt-BR")}` : "" }
              : st === "vencido"
              ? { icon: Clock, cor: "text-amber-600", bg: "bg-amber-50", label: "Vencido", detail: `há ${atraso}d` }
              : st === "inadimplente"
              ? { icon: AlertTriangle, cor: "text-rose-600", bg: "bg-rose-50", label: "Inadimplente", detail: `há ${atraso}d` }
              : { icon: Clock, cor: "text-slate-600", bg: "bg-slate-50", label: "Em aberto", detail: "" };
          const Icon = cfg.icon;
          return (
            <div key={p.id} className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-[160px]">
                <div className={`w-9 h-9 rounded-xl ${cfg.bg} ${cfg.cor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Apto {p.unidade}</p>
                  <p className="text-xs text-slate-500">
                    {cfg.label}{cfg.detail ? ` ${cfg.detail}` : ""} · venc. {new Date(p.vencimento + "T00:00:00").toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold tabular-nums text-slate-900">{formatBRL(p.valor)}</span>
              <div className="flex items-center gap-1">
                {st === "pago" ? (
                  <button onClick={() => marcarPendente(p.id)} className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition" title="Desfazer pagamento">
                    <RotateCcw className="w-3 h-3" /> Desfazer
                  </button>
                ) : (
                  <button onClick={() => marcarPago(p.id)} className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
                    <CheckCircle2 className="w-3 h-3" /> Marcar pago
                  </button>
                )}
                <button onClick={() => handleCarregarParaEditar(p)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition" title="Editar">
                  <Save className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Excluir">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
