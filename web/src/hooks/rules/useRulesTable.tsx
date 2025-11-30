import type { VisibilityState } from "@tanstack/react-table";
import { useDataTableRows } from "../data-table";
import { useRules } from "./useRules";
import { useState } from "react";

export function useRulesTable() {
  const [visibilityState, setVisibilityState] = useState<VisibilityState>({});
  const [{ query }, ruleMethods] = useRules({
    limit: 10,
    offset: 0
  });

  const data = query.data;

  const rows = useDataTableRows({ data });

  const state = {
    rows,
    isLoading: query.isLoading,
    error: query.error,
    visibilityState
  };

  const methods = {
    ...ruleMethods,
    setColumnVisibility: setVisibilityState
  };

  return [state, methods] as const;
}