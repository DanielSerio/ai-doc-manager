import { Badge } from "@/components/ui/badge";
import type { Row } from "@tanstack/react-table";
import type { DTColumnDef, DTRowData } from "../DataTable.props";
import { Link } from "@tanstack/react-router";

export const getTypedLineNumberColumn = <RowType extends DTRowData, TValue>(idColumn: string): DTColumnDef<RowType, TValue> => ({
  id: 'lineNumber',
  header: '#',
  cell: ({ row }: { row: Row<RowType>; }) => <Badge variant="outline">
    <Link to="/rules/$id" params={{ id: `${row.original[idColumn as keyof RowType]}` }} className="text-primary hover:underline">{row.original.lineNumber}</Link>
  </Badge>,
  meta: {
    size: {
      min: 60,
      max: 80
    },
    align: 'center'
  }
});