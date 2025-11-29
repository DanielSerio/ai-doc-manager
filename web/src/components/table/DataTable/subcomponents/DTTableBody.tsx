import { TableBody } from "@/components/ui/table";
import type { DTRowData, DTTableBodyProps } from "../DataTable.props";
import { DTRow } from "./DTRow";
import { DTCell } from "./DTCell";
import { flexRender } from "@tanstack/react-table";

export function DTTableBody<TData extends DTRowData>({ gridTemplateColumns, table }: DTTableBodyProps<TData>) {
  const rows = table.getRowModel().rows;

  return (
    <TableBody>
      {rows.map(row => (
        <DTRow key={row.id} gridTemplateColumns={gridTemplateColumns}>
          {row.getVisibleCells().map(cell => (
            <DTCell key={cell.id} align={cell.column.columnDef.meta?.align}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </DTCell>
          ))}
        </DTRow>
      ))}
    </TableBody>
  );
}