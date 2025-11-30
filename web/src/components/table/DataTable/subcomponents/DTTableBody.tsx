import { TableBody } from "@/components/ui/table";
import type { DTRowData, DTTableBodyProps } from "../DataTable.props";
import { DTRow } from "./DTRow";
import { DTCell } from "./DTCell";
import { flexRender } from "@tanstack/react-table";
import { DTError } from "./DTError";
import { DTEmpty } from "./DTEmpty";
import { DTSkeleton } from "./DTSkeleton";

export function DTTableBody<TData extends DTRowData>({
  skeletonRowCount = 5,
  gridTemplateColumns,
  table,
  isLoading,
  error
}: DTTableBodyProps<TData>) {
  const rows = table.getRowModel().rows;
  const hasError = !!error;
  const isEmpty = isLoading === false && rows.length === 0;


  if (hasError) {
    return <DTError error={error} />;
  }

  if (isLoading) {
    return <DTSkeleton skeletonRowCount={skeletonRowCount} gridTemplateColumns={gridTemplateColumns} />;
  }

  if (isEmpty) {
    return <DTEmpty />;
  }

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