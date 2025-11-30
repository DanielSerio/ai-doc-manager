import type { DTColumnDef, DTRowData } from "../DataTable.props";
import { formatDistance } from 'date-fns';

export const getDateColumn = <RowType extends DTRowData & Record<'createdAt' | 'updatedAt', string>>(id: 'createdAt' | 'updatedAt'): DTColumnDef<RowType, Date> => ({
  id,
  header: id === 'createdAt' ? 'Created At' : 'Updated At',
  accessorKey: id,
  cell: ({ row }) => <div className="text-xs text-muted-foreground">
    {formatDistance(new Date(row.original[id]), new Date(), { addSuffix: true })}
  </div>,
  meta: {
    size: {
      min: 140,
      max: 200
    }
  }
});