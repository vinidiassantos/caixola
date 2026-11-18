export interface Unidade {
  numero: string;
  responsavel?: string;
  valorMensal: number;
}

export interface PagamentoUnidade {
  id: string;
  unidade: string;
  competencia: string;
  valor: number;
  vencimento: string;
  pagamento?: string;
}

export type StatusVisual = "pago" | "pendente" | "vencido" | "inadimplente";

export interface Lancamento {
  id: string;
  descricao: string;
  categoria: string;
  valor: number;
  data: string;
  tipo: "entrada" | "saida";
}

export interface CategoriaDespesa {
  categoria: string;
  orcado: number;
  realizado: number;
  icone: string;
}

export interface ResumoCaixa {
  variacaoPercentual: number;
  receitasMes: number;
  despesasMes: number;
  inadimplenciaPercentual: number;
  unidadesInadimplentes: number;
}

export interface CaixaDetalhado {
  contaCorrente: number;
  fundoReserva: number;
  fundoObras: number;
}
