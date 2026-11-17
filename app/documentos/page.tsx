import { FileText, Receipt } from "lucide-react";

const docs = [
  { titulo: "Balancete Maio/2025", tipo: "Prestação de contas" },
  { titulo: "Balancete Abr/2025", tipo: "Prestação de contas" },
  { titulo: "Contrato Portaria 2025", tipo: "Contrato" },
  { titulo: "NF Energia — Maio/2025", tipo: "Nota fiscal" },
  { titulo: "NF Água — Maio/2025", tipo: "Nota fiscal" },
];

export default function Documentos() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Documentos</h1>
        <p className="text-sm text-slate-500 mt-1">Tudo o que você tem direito de consultar</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.02] divide-y divide-slate-100">
        {docs.map((d, i) => (
          <div key={i} className="px-5 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800 truncate">{d.titulo}</p>
              <p className="text-xs text-slate-500">{d.tipo}</p>
            </div>
            <Receipt className="w-4 h-4 text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
