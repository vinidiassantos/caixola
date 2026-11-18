import type {
  ResumoCaixa,
  CaixaDetalhado,
  Lancamento,
  CategoriaDespesa,
  PagamentoUnidade,
  Unidade,
} from "@/types";

export const STORAGE_KEY = "caixola:v4";
const LEGACY_V3 = "caixola:v3";
const LEGACY_V2 = "caixola:v2";
const LEGACY_V1 = "caixola:v1";

export interface CaixolaData {
  resumo: ResumoCaixa;
  caixa: CaixaDetalhado;
  lancamentos: Lancamento[];
  despesas: CategoriaDespesa[];
  pagamentos: PagamentoUnidade[];
  unidades: Unidade[];
}

export function loadData(): CaixolaData | null {
  if (typeof window === "undefined") return null;
  try {
    const v4 = localStorage.getItem(STORAGE_KEY);
    if (v4) return JSON.parse(v4) as CaixolaData;

    const v3 = localStorage.getItem(LEGACY_V3);
    if (v3) {
      const old = JSON.parse(v3);
      const migrated: CaixolaData = {
        resumo: old.resumo ?? null,
        caixa: old.caixa ?? null,
        lancamentos: old.lancamentos ?? [],
        despesas: [],
        pagamentos: [],
        unidades: [],
      };
      saveData(migrated);
      return migrated;
    }

    const v2 = localStorage.getItem(LEGACY_V2);
    if (v2) {
      const old = JSON.parse(v2);
      const migrated: CaixolaData = {
        resumo: old.resumo ?? null,
        caixa: old.caixa ?? null,
        lancamentos: old.lancamentos ?? [],
        despesas: [],
        pagamentos: [],
        unidades: [],
      };
      saveData(migrated);
      return migrated;
    }

    const v1 = localStorage.getItem(LEGACY_V1);
    if (v1) {
      const old = JSON.parse(v1);
      const migrated: CaixolaData = {
        resumo: old.resumo ?? null,
        caixa: old.resumo?.saldoAtual
          ? { contaCorrente: old.resumo.saldoAtual, fundoReserva: 0, fundoObras: 0 }
          : null,
        lancamentos: old.lancamentos ?? [],
        despesas: [],
        pagamentos: [],
        unidades: [],
      };
      saveData(migrated);
      return migrated;
    }
    return null;
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
