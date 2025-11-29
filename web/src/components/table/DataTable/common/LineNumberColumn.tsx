import { Badge } from "@/components/ui/badge";
import type { Row } from "@tanstack/react-table";
import type { DTColumnDef, DTRowData } from "../DataTable.props";

export const getTypedLineNumberColumn = <RowType extends DTRowData, TValue>(): DTColumnDef<RowType, TValue> => ({
  id: 'lineNumber',
  header: '#',
  cell: ({ row }: { row: Row<RowType>; }) => <Badge>{row.original.lineNumber}</Badge>,
  meta: {
    size: {
      min: 60,
      max: 80
    },
    align: 'center'
  }
});