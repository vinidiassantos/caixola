import type {
  ResumoCaixa,
  CaixaDetalhado,
  Lancamento,
  Unidade,
  PagamentoUnidade,
  CategoriaDespesa,
} from "@/types";
import { getVencimento } from "@/lib/pagamento-status";

export const unidades: Unidade[] = [
  { numero: "102", valorMensal: 650 },
  { numero: "104", valorMensal: 650 },
  { numero: "202", valorMensal: 650 },
  { numero: "204", valorMensal: 650 },
  { numero: "302", valorMensal: 650 },
  { numero: "304", valorMensal: 680 },
  { numero: "402", valorMensal: 720 },
  { numero: "404", valorMensal: 720 },
];

export const UNIDADES_NUMEROS = unidades.map((u) => u.numero);

export const MESES_HISTORICO = [
  "2025-11", "2025-10", "2025-09", "2025-08", "2025-07", "2025-06",
] as const;

export const MESES_MATRIZ = [
  { comp: "2025-11", label: "Nov/25" },
  { comp: "2025-10", label: "Out/25" },
  { comp: "2025-09", label: "Set/25" },
  { comp: "2025-08", label: "Ago/25" },
  { comp: "2025-07", label: "Jul/25" },
  { comp: "2025-06", label: "Jun/25" },
];

export const resumoCaixa: ResumoCaixa = {
  variacaoPercentual: 4.1,
  receitasMes: 3320,
  despesasMes: 2080,
  inadimplenciaPercentual: 37.5,
  unidadesInadimplentes: 3,
};

export const caixaDetalhado: CaixaDetalhado = {
  contaCorrente: 5480,
  fundoReserva: 15600,
  fundoObras: 3200,
};

export const ultimosLancamentos: Lancamento[] = [
  { id: "1", descricao: "Conta de água — Nov/2025", categoria: "Água", valor: 520, data: "2025-11-15", tipo: "saida" },
  { id: "2", descricao: "Conta de luz — Nov/2025", categoria: "Energia", valor: 410, data: "2025-11-14", tipo: "saida" },
  { id: "3", descricao: "Serviço de limpeza — Nov/2025", categoria: "Limpeza", valor: 650, data: "2025-11-12", tipo: "saida" },
  { id: "4", descricao: "Manutenção predial", categoria: "Manutenção", valor: 320, data: "2025-11-10", tipo: "saida" },
  { id: "5", descricao: "Material de limpeza e outros", categoria: "Outras despesas", valor: 180, data: "2025-11-08", tipo: "saida" },
  { id: "6", descricao: "Taxa condominial apto 102", categoria: "Rateio", valor: 650, data: "2025-11-15", tipo: "entrada" },
  { id: "7", descricao: "Taxa condominial apto 104", categoria: "Rateio", valor: 650, data: "2025-11-16", tipo: "entrada" },
];

export const despesasPorCategoria: CategoriaDespesa[] = [
  { categoria: "Água", orcado: 500, realizado: 520, icone: "💧" },
  { categoria: "Energia", orcado: 400, realizado: 410, icone: "⚡" },
  { categoria: "Limpeza", orcado: 650, realizado: 650, icone: "🧹" },
  { categoria: "Manutenção", orcado: 300, realizado: 320, icone: "🔧" },
  { categoria: "Outras despesas", orcado: 200, realizado: 180, icone: "📋" },
];

const naoPagosPorMes: Record<string, Set<string>> = {
  "204": new Set(["2025-10", "2025-11"]),
  "304": new Set(["2025-11"]),
  "404": new Set(["2025-11"]),
};

function gerarPagamentos(): PagamentoUnidade[] {
  const result: PagamentoUnidade[] = [];
  for (const u of unidades) {
    for (const comp of MESES_HISTORICO) {
      const pago = !naoPagosPorMes[u.numero]?.has(comp);
      result.push({
        id: `${u.numero}-${comp}`,
        unidade: u.numero,
        competencia: comp,
        valor: u.valorMensal,
        vencimento: getVencimento(comp),
        pagamento: pago ? `${comp}-08` : undefined,
      });
    }
  }
  return result;
}

export const pagamentosPorUnidade: PagamentoUnidade[] = gerarPagamentos();
