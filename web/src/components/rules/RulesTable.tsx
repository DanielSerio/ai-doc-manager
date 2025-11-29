import { DataTable, type DTRowData } from "@/components/table/DataTable";
import type { useRulesTable } from "@/hooks/rules/useRulesTable";

type MethodsRowType = ReturnType<typeof useRulesTable>[1];

interface RulesTableProps<RowType extends DTRowData> {
  isLoading?: boolean;
  error?: Error | null;
  rows: RowType[];
  methods: MethodsRowType;
}

export function RulesTable<RowType extends DTRowData>({
  isLoading,
  error,
  rows,
  methods: {
    changeColumnSorting,
    ...pagingMethods
  } }: RulesTableProps<RowType>) {
  return (
    <DataTable
      id="rulesTable"
      columns={[]}
      data={rows}
      isLoading={isLoading}
      error={error}
      pagingMethods={pagingMethods}
      sortingMethods={{ changeColumnSorting }}
    />
  );
}