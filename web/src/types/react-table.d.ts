import type { DTColumnMeta } from '@/components/table/DataTable';
import '@tanstack/react-table'; // or '@tanstack/table-core'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> extends DTColumnMeta { }
}