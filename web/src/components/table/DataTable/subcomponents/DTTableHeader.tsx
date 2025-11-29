import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DTRowData, DTTableHeaderProps } from "../DataTable.props";
import { flexRender } from "@tanstack/react-table";
import { DTRow } from "./DTRow";

export function DTTableHeader<TData extends DTRowData, TValue = unknown>({ gridTemplateColumns, columnDefs: _columnDefs, table }: DTTableHeaderProps<TData, TValue>) {
  return (
    <TableHeader>
      <TableRow>
        {table.getHeaderGroups().map(headerGroup => (
          <DTRow key={headerGroup.id} gridTemplateColumns={gridTemplateColumns}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </TableHead>
            ))}
          </DTRow>
        ))}
      </TableRow>
    </TableHeader>
  );
}