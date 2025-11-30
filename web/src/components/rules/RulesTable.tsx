import { DataTable, type DTColumnDef, type DTRowData } from "@/components/table/DataTable";
import type { useRulesTable } from "@/hooks/rules/useRulesTable";
import type { SortingState, VisibilityState } from "@tanstack/react-table";

type MethodsRowType = ReturnType<typeof useRulesTable>[1];

interface RulesTableProps<RowType extends DTRowData> {
  isLoading?: boolean;
  error?: Error | null;
  rows: RowType[];
  columns: DTColumnDef<RowType, unknown>[];
  visibilityState: VisibilityState;
  sorting: SortingState;
  methods: MethodsRowType;
}

export function RulesTable<RowType extends DTRowData>({
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
  } }: RulesTableProps<RowType>) {
  return (
    <DataTable
      id="rulesTable"
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