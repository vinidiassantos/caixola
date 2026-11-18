"use client";

import { useEffect, useState } from "react";
import { loadData, saveData, type CaixolaData } from "@/lib/storage";
import {
  resumoCaixa,
  caixaDetalhado,
  ultimosLancamentos,
  despesasPorCategoria,
  pagamentosPorUnidade,
  unidades,
} from "@/lib/mock-data";

const defaultData: CaixolaData = {
  resumo: resumoCaixa,
  caixa: caixaDetalhado,
  lancamentos: ultimosLancamentos,
  despesas: despesasPorCategoria,
  pagamentos: pagamentosPorUnidade,
  unidades: unidades,
};

export function useCaixolaData() {
  const [data, setData] = useState<CaixolaData>(defaultData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadData();
    if (stored) {
      const merged: CaixolaData = {
        resumo: stored.resumo ?? defaultData.resumo,
        caixa: stored.caixa ?? defaultData.caixa,
        lancamentos: stored.lancamentos ?? defaultData.lancamentos,
        despesas: stored.despesas?.length ? stored.despesas : defaultData.despesas,
        pagamentos: stored.pagamentos?.length ? stored.pagamentos : defaultData.pagamentos,
        unidades: stored.unidades?.length ? stored.unidades : defaultData.unidades,
      };
      setData(merged);
      if (!stored.despesas?.length || !stored.pagamentos?.length || !stored.unidades?.length) {
        saveData(merged);
      }
    }
    setHydrated(true);
  }, []);

  const update = (next: CaixolaData) => {
    setData(next);
    saveData(next);
  };

  return {
    data,
    hydrated,
    updateResumo: (resumo: CaixolaData["resumo"]) => update({ ...data, resumo }),
    updateCaixa: (caixa: CaixolaData["caixa"]) => update({ ...data, caixa }),
    updateLancamentos: (lancamentos: CaixolaData["lancamentos"]) => update({ ...data, lancamentos }),
    updateDespesas: (despesas: CaixolaData["despesas"]) => update({ ...data, despesas }),
    updatePagamentos: (pagamentos: CaixolaData["pagamentos"]) => update({ ...data, pagamentos }),
    updateUnidades: (unidades: CaixolaData["unidades"]) => update({ ...data, unidades }),
  };
}
