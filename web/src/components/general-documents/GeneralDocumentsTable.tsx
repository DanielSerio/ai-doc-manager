import { DataTable, type DTColumnDef, type DTRowData } from "@/components/table/DataTable";
import type { useGeneralDocumentsTable } from "@/hooks/general-documents";
import type { SortingState, VisibilityState } from "@tanstack/react-table";

type MethodsRowType = ReturnType<typeof useGeneralDocumentsTable>[1];

interface GeneralDocumentsTableProps<RowType extends DTRowData> {
  isLoading?: boolean;
  error?: Error | null;
  rows: RowType[];
  columns: DTColumnDef<RowType, unknown>[];
  visibilityState: VisibilityState;
  sorting: SortingState;
  methods: MethodsRowType;
}

export function GeneralDocumentsTable<RowType extends DTRowData>({
  isLoading,
  error,
  rows,
  columns,
  visibilityState,
  sorting,
  methods: {
    setSorting,
    setColumnVisibility,
    ...pagingMethods
  } }: GeneralDocumentsTableProps<RowType>) {
  return (
    <DataTable
      id="generalDocumentsTable"
      columns={columns}
      data={rows}
      isLoading={isLoading}
      error={error}
      visibilityState={visibilityState}
      sorting={sorting}
      visibilityMethods={{ setColumnVisibility }}
      pagingMethods={pagingMethods}
      sortingMethods={{ setSorting }}
    />
  );
}