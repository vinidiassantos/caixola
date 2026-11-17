import { historicoPagamentos } from "@/lib/mock-data";
import { CheckCircle2, Clock } from "lucide-react";

const formatBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Pagamentos() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Meus Pagamentos</h1>
        <p className="text-sm text-slate-500 mt-1">Unidade 302 — Bloco B</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] divide-y divide-slate-100">
        {historicoPagamentos.map((p) => {
          const pago = p.status === "pago";
          return (
            <div key={p.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${pago ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {pago ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{p.competencia}</p>
                  <p className="text-xs text-slate-500">Venc. {new Date(p.vencimento).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900 tabular-nums">{formatBRL(p.valor)}</p>
                {p.pagamento && (
                  <p className="text-[11px] text-emerald-600">
                    Pago em {new Date(p.pagamento).toLocaleDateString("pt-BR")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
