import { TableHeader } from "@/components/ui/table";
import type { DTRowData, DTTableHeaderProps } from "../DataTable.props";
import { flexRender } from "@tanstack/react-table";
import { DTRow } from "./DTRow";
import { DTHead } from "./DTHead";
import { Button } from "@/components/ui/button";
import { SortAsc, SortDesc } from "lucide-react";

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
              {header.column.getCanSort() && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-6 w-6 text-muted-foreground"
                  onClick={() => header.column.toggleSorting()}
                >
                  {header.column.getIsSorted() === 'asc' ? <SortAsc /> : <SortDesc />}
                </Button>
              )}
            </DTHead>
          ))}
        </DTRow>
      ))}
    </TableHeader>
  );
}