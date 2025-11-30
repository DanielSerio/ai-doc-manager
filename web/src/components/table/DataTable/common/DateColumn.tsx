import type { DTColumnDef, DTRowData } from "../DataTable.props";

export const getDateColumn = <RowType extends DTRowData & Record<'createdAt' | 'updatedAt', string>>(id: 'createdAt' | 'updatedAt'): DTColumnDef<RowType, Date> => ({
  id,
  header: id === 'createdAt' ? 'Created At' : 'Updated At',
  accessorKey: id,
  cell: ({ row }) => <div>{row.original[id]}</div>,
  meta: {
    size: {
      min: 140,
      max: 200
    }
  }
});