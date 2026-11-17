"use client";

import { useCaixolaData } from "@/hooks/useCaixolaData";

const formatBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function PrestacaoDeContas() {
  const { data, hydrated } = useCaixolaData();

  if (!hydrated) return <p className="text-sm text-gray-500">Carregando…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-blue-900">Prestação de Contas — Maio/2025</h1>
      <p className="text-sm text-green-600">✅ Aprovado pelo Conselho em 15/06</p>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Despesas por categoria (orçado vs. realizado)
        </h2>
        <ul className="space-y-2">
          {data.despesas.map((c) => {
            const estouro = c.realizado > c.orcado;
            return (
              <li key={c.categoria} className="flex justify-between text-sm">
                <span>{c.icone} {c.categoria}</span>
                <span className={estouro ? "text-red-600 font-medium" : "text-gray-700"}>
                  {formatBRL(c.realizado)}{" "}
                  <span className="text-gray-400">/ {formatBRL(c.orcado)}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
