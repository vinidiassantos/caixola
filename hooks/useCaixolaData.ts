"use client";

import { useEffect, useState } from "react";
import { loadData, saveData, type CaixolaData } from "@/lib/storage";
import {
  resumoCaixa,
  ultimosLancamentos,
  despesasPorCategoria,
  historicoPagamentos,
} from "@/lib/mock-data";

const defaultData: CaixolaData = {
  resumo: resumoCaixa,
  lancamentos: ultimosLancamentos,
  despesas: despesasPorCategoria,
  pagamentos: historicoPagamentos,
};

export function useCaixolaData() {
  const [data, setData] = useState<CaixolaData>(defaultData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadData();
    if (stored) setData(stored);
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
    updateLancamentos: (lancamentos: CaixolaData["lancamentos"]) => update({ ...data, lancamentos }),
    updateDespesas: (despesas: CaixolaData["despesas"]) => update({ ...data, despesas }),
    updatePagamentos: (pagamentos: CaixolaData["pagamentos"]) => update({ ...data, pagamentos }),
  };
}
