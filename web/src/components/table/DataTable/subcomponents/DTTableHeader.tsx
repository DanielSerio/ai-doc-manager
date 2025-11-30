import { TableHeader } from "@/components/ui/table";
import type { DTRowData, DTTableHeaderProps } from "../DataTable.props";
import { flexRender } from "@tanstack/react-table";
import { DTRow } from "./DTRow";
import { DTHead } from "./DTHead";

export function DTTableHeader<TData extends DTRowData, TValue = unknown>({ gridTemplateColumns, columnDefs: _columnDefs, table }: DTTableHeaderProps<TData, TValue>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map(headerGroup => (
        <DTRow key={headerGroup.id} gridTemplateColumns={gridTemplateColumns}>
          {headerGroup.headers.map(header => (
            <DTHead key={header.id} align={header.column.columnDef.meta?.align}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
            </DTHead>
          ))}
        </DTRow>
      ))}
    </TableHeader>
  );
}