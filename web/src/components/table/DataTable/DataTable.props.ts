import type { Pretty } from "@/types";
import type { ReactNode, TableHTMLAttributes } from "react";
import type { ColumnDef, RowData, Table } from "@tanstack/react-table";

/**
 * Row Data Types
 */
export type DTRowData = (RowData & object) & {
  lineNumber: number;
};

/**
 * Column Definition Types
 */

/* `DataTable` column alignment */
export type ColumnAlign = 'left' | 'center' | 'right';

/* `DataTable` column alignment class name map. Used to get the class name for the column alignment */
export type ColumnAlignClassNameMap = {
  left: 'justify-start';
  center: 'justify-center';
  right: 'justify-end';
};

/* `DataTable` column size. used for calculating and applying grid-template-columns for table rows, as well as provides min and max widths for the entire table */
export type ColumnSize = {
  min: number;
  max: number;
};

export type DataTableColumnFilterType = 'select' | 'multi-select' | 'text-contains' | 'text-equals' | 'text-starts-with' | 'text-ends-with';

interface DataTableColumnFilterBase {
  type: DataTableColumnFilterType;
  options?: { value: string; label: string; }[];
}

interface DataTableSelectFilterBase extends DataTableColumnFilterBase {
  type: 'select' | 'multi-select';
  options: { value: string; label: string; }[];
}

export type DataTableSelectFilter = Pretty<DataTableSelectFilterBase & {
  type: 'select';
}>;

export type DataTableMultiSelectFilter = Pretty<DataTableSelectFilterBase & {
  type: 'multi-select';
}>;

interface DataTableTextFilterBase extends DataTableColumnFilterBase {
  type: 'text-contains' | 'text-equals' | 'text-starts-with' | 'text-ends-with';
  options?: never;
}

export type DataTableTextFilter = Pretty<DataTableTextFilterBase & {
  type: 'text-contains' | 'text-equals' | 'text-starts-with' | 'text-ends-with';
}>;

export type DataTableColumnFilter = DataTableSelectFilter | DataTableMultiSelectFilter | DataTableTextFilter;

export interface DTColumnMeta {
  /** Column alignment */
  align?: ColumnAlign;
  /** Column size */
  size: ColumnSize;
  /** Column filter */
  filter?: DataTableColumnFilter;
}

/**
 * Main `ColumnDef` type that should be used for column definitions. Contains overrides for `@tanstack/react-table` `ColumnDef` type
 */
export type DTColumnDef<TData extends DTRowData, TValue> = ColumnDef<TData, TValue> & {
  id: string;
  header: string | ReactNode;
  meta: DTColumnMeta;
};


/**
 * Table Section types
 */

interface DTSectionProps<TData extends DTRowData> {
  table: Table<TData>;
}

interface DTTableSectionProps<TData extends DTRowData> extends DTSectionProps<TData> {
  gridTemplateColumns: string;
}

export interface DTHeaderProps<TData extends DTRowData, TValue> extends DTSectionProps<TData> {
  columnDefs: DTColumnDef<TData, TValue>[];
}

export interface DTTableHeaderProps<TData extends DTRowData, TValue> extends DTHeaderProps<TData, TValue> {
  gridTemplateColumns: string;
}

export interface DTTableBodyProps<TData extends DTRowData> extends DTTableSectionProps<TData> {
  isLoading?: boolean | null;
  error?: Error | null;
}

export interface DTRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  gridTemplateColumns: string;
}

export interface DTCellProps extends TableHTMLAttributes<HTMLTableCellElement> {
  align?: ColumnAlign;
}

export interface DataTableProps<TData extends DTRowData, TValue> {
  id: string;
  columns: DTColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean | null;
  error?: Error | null;
  pagingMethods: {
    goToFirstPage: () => void;
    goToLastPage: () => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
  };
  sortingMethods: {
    changeColumnSorting: (column: string) => void;
  };
}