import type { ResumoCaixa, Lancamento, Pagamento, CategoriaDespesa } from "@/types";

export const STORAGE_KEY = "caixola:v1";

export interface CaixolaData {
  resumo: ResumoCaixa;
  lancamentos: Lancamento[];
  despesas: CategoriaDespesa[];
  pagamentos: Pagamento[];
}

export function loadData(): CaixolaData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CaixolaData) : null;
  } catch {
    return null;
  }
}

export function saveData(data: CaixolaData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
