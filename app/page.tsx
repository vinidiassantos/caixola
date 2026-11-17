"use client";

import { StatCard } from "@/components/StatCard";
import { useCaixolaData } from "@/hooks/useCaixolaData";

const formatBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Dashboard() {
  const { data, hydrated } = useCaixolaData();
  const { resumo, lancamentos } = data;

  if (!hydrated) return <p className="text-sm text-gray-500">Carregando…</p>;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm text-gray-500">Saldo em caixa</p>
        <p className="text-3xl font-bold text-blue-900">{formatBRL(resumo.saldoAtual)}</p>
        <p className="text-sm text-green-600">▲ {resumo.variacaoPercentual}% vs. mês anterior</p>
      </section>

      <section className="flex flex-col md:flex-row gap-4">
        <StatCard label="Receitas" value={formatBRL(resumo.receitasMes)} hint="Mês atual" variant="positive" />
        <StatCard label="Despesas" value={formatBRL(resumo.despesasMes)} hint="Mês atual" variant="negative" />
        <StatCard label="Inadimplência" value={`${resumo.inadimplenciaPercentual}%`} hint={`${resumo.unidadesInadimplentes} unidades`} />
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Últimos lançamentos</h2>
        <ul className="divide-y divide-gray-100">
          {lancamentos.slice(0, 5).map((l) => (
            <li key={l.id} className="py-2 flex justify-between text-sm">
              <span className="text-gray-700">{l.descricao}</span>
              <span className={l.tipo === "entrada" ? "text-green-600" : "text-red-600"}>
                {l.tipo === "entrada" ? "+" : "-"} {formatBRL(l.valor)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
