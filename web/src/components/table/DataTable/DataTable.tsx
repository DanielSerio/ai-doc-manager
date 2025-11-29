import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import type { DataTableProps, DTRowData } from "./DataTable.props";
import { Table } from "@/components/ui/table";
import { DTTableBody } from "./subcomponents/DTTableBody";
import { DTTableHeader } from "./subcomponents/DTTableHeader";

export function DataTable<TData extends DTRowData, TValue = unknown>({ id, columns, data, isLoading, error }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const gridTemplateColumns = '';

  return (
    <div className="flex flex-col">
      <Table id={id}>
        <DTTableHeader
          gridTemplateColumns={gridTemplateColumns}
          columnDefs={columns}
          table={table}
        />
        <DTTableBody
          gridTemplateColumns={gridTemplateColumns}
          table={table}
          isLoading={isLoading}
          error={error}
        />
      </Table>
    </div>
  );
}