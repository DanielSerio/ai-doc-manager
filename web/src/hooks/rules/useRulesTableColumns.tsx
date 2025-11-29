import type { DTColumnDef } from "@/components/table/DataTable";
import { getTypedLineNumberColumn } from "@/components/table/DataTable/common";
import type { Rule } from "@/types";
import { useMemo } from "react";

type DTRule = Rule & {
  lineNumber: number;
};

export function useRulesTableColumns() {
  return useMemo(() => {
    return [
      getTypedLineNumberColumn<DTRule, number>(),
    ] as DTColumnDef<DTRule, unknown>[];
  }, []);
}