import type { VisibilityState } from "@tanstack/react-table";
import { useDataTableRows } from "../data-table";
import { useGeneralDocuments } from "./useGeneralDocuments";
import { useState } from "react";

export function useGeneralDocumentsTable() {
  const [visibilityState, setVisibilityState] = useState<VisibilityState>({});
  const [{ query, sorting }, generalDocumentsMethods] = useGeneralDocuments({
    limit: 10,
    offset: 0
  });

  const data = query.data;

  const rows = useDataTableRows({ data });

  const state = {
    rows,
    isLoading: query.isLoading,
    error: query.error,
    visibilityState,
    sorting
  };

  const methods = {
    ...generalDocumentsMethods,
    setColumnVisibility: setVisibilityState
  };

  return [state, methods] as const;
}