import { useDataTableRows } from "../data-table";
import { useRules } from "./useRules";

export function useRulesTable() {
  const [{ query }, ruleMethods] = useRules({
    limit: 10,
    offset: 0
  });

  const data = query.data;

  const rows = useDataTableRows({ data });

  const state = {
    rows,
    isLoading: query.isLoading,
    error: query.error
  };

  const methods = {
    ...ruleMethods
  };

  return [state, methods] as const;
}