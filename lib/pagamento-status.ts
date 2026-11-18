import type { PagamentoUnidade, StatusVisual } from "@/types";

export const DIA_VENCIMENTO = 18;
export const DIAS_CARENCIA = 5;

// ⚠️ DATA DE REFERÊNCIA PARA DEMO. Em produção: new Date().toISOString().slice(0, 10)
export const HOJE_REFERENCIA = "2025-11-22";

export function hojeISO(): string {
  return HOJE_REFERENCIA;
}

export function getVencimento(competencia: string): string {
  return `${competencia}-${String(DIA_VENCIMENTO).padStart(2, "0")}`;
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function getDiasAtraso(p: PagamentoUnidade, hoje: string = hojeISO()): number {
  if (p.pagamento) return 0;
  const d1 = new Date(p.vencimento + "T00:00:00");
  const d2 = new Date(hoje + "T00:00:00");
  const diff = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export function getStatus(p: PagamentoUnidade, hoje: string = hojeISO()): StatusVisual {
  if (p.pagamento) return "pago";
  if (hoje < p.vencimento) return "pendente";
  const carencia = addDays(p.vencimento, DIAS_CARENCIA);
  if (hoje <= carencia) return "vencido";
  return "inadimplente";
}

export function getMesAtual(): string {
  return hojeISO().slice(0, 7);
}
