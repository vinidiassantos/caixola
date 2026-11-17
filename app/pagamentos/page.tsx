import { historicoPagamentos } from "@/lib/mock-data";

const formatBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Pagamentos() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-blue-900">Meus Pagamentos</h1>
      <p className="text-sm text-gray-600">Unidade 302 — Bloco B</p>
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {historicoPagamentos.map((p) => (
          <div key={p.id} className="p-3 flex justify-between items-center text-sm">
            <div>
              <p className="font-medium text-gray-800">{p.competencia}</p>
              <p className="text-xs text-gray-500">Venc. {p.vencimento}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800">{formatBRL(p.valor)}</p>
              {p.pagamento && <p className="text-xs text-green-600">Pago em {p.pagamento}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
