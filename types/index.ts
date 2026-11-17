export type StatusPagamento = "pago" | "pendente" | "atrasado";

export interface Pagamento {
  id: string;
  competencia: string;
  valor: number;
  vencimento: string;
  pagamento?: string;
  status: StatusPagamento;
  unidade: string;
  bloco: string;
}

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
  saldoAtual: number;
  variacaoPercentual: number;
  receitasMes: number;
  despesasMes: number;
  inadimplenciaPercentual: number;
  unidadesInadimplentes: number;
}
