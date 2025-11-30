import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import type { DataTableProps, DTRowData } from "./DataTable.props";
import { Table } from "@/components/ui/table";
import { DTTableBody } from "./subcomponents/DTTableBody";
import { DTTableHeader } from "./subcomponents/DTTableHeader";
import { useMemo } from "react";
import { getDataTableGrid } from "@/lib/utils";

export function DataTable<TData extends DTRowData, TValue = unknown>({
  id,
  columns,
  data,
  isLoading,
  skeletonRowCount,
  error,
  visibilityState,
  visibilityMethods: { setColumnVisibility }
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility: visibilityState
    },
    onColumnVisibilityChange: setColumnVisibility
  });

  const {
    columnDefs,
    gridTemplateColumns,
    minWidth,
    maxWidth
  } = useMemo(() => {
    if (!columns) {
      return {
        columnDefs: [],
        gridTemplateColumns: "",
        minWidth: 0,
        maxWidth: 0
      };
    }
    const columnDefs = columns.filter(column => visibilityState[column.id] !== false);
    // get grid-template-columns from columnDefs
    const { gridTemplateColumns, minWidth, maxWidth } = getDataTableGrid(columnDefs);
    return {
      columnDefs,
      gridTemplateColumns,
      minWidth,
      maxWidth
    };
  }, [columns, visibilityState]);

  return (
    <div className="flex flex-col border">
      <Table className="w-full" id={id}>
        <DTTableHeader
          gridTemplateColumns={gridTemplateColumns}
          columnDefs={columnDefs}
          table={table}
        />
        <DTTableBody
          skeletonRowCount={skeletonRowCount}
          gridTemplateColumns={gridTemplateColumns}
          table={table}
          isLoading={isLoading}
          error={error}
        />
      </Table>
    </div>
  );
}