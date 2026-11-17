import type { ResumoCaixa, Lancamento, Pagamento, CategoriaDespesa } from "@/types";

export const resumoCaixa: ResumoCaixa = {
  saldoAtual: 48750,
  variacaoPercentual: 5.2,
  receitasMes: 32400,
  despesasMes: 28150,
  inadimplenciaPercentual: 4.8,
  unidadesInadimplentes: 6,
};

export const ultimosLancamentos: Lancamento[] = [
  { id: "1", descricao: "Energia elétrica", categoria: "Energia", valor: 3200, data: "2025-05-12", tipo: "saida" },
  { id: "2", descricao: "Portaria", categoria: "Portaria", valor: 8500, data: "2025-05-10", tipo: "saida" },
  { id: "3", descricao: "Rateio extra", categoria: "Rateio", valor: 1200, data: "2025-05-08", tipo: "entrada" },
];

export const despesasPorCategoria: CategoriaDespesa[] = [
  { categoria: "Manutenção", orcado: 8000, realizado: 8200, icone: "🏢" },
  { categoria: "Água", orcado: 4500, realizado: 5100, icone: "💧" },
  { categoria: "Energia", orcado: 3000, realizado: 3200, icone: "⚡" },
  { categoria: "Portaria", orcado: 8500, realizado: 8500, icone: "👮" },
  { categoria: "Limpeza", orcado: 2500, realizado: 2300, icone: "🧹" },
];

export const historicoPagamentos: Pagamento[] = [
  { id: "1", competencia: "Jun/2025", valor: 650, vencimento: "2025-06-10", pagamento: "2025-06-08", status: "pago", unidade: "302", bloco: "B" },
  { id: "2", competencia: "Mai/2025", valor: 650, vencimento: "2025-05-10", pagamento: "2025-05-09", status: "pago", unidade: "302", bloco: "B" },
  { id: "3", competencia: "Abr/2025", valor: 650, vencimento: "2025-04-10", pagamento: "2025-04-12", status: "pago", unidade: "302", bloco: "B" },
  { id: "4", competencia: "Mar/2025", valor: 650, vencimento: "2025-03-10", pagamento: "2025-03-07", status: "pago", unidade: "302", bloco: "B" },
];
