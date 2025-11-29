import type { RowData } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { DTRowData } from "@/components/table/DataTable";

export interface UseDataTableRowsProps<RowType extends RowData> {
  data?: RowType[] | null;
}

function attachLineNumbers<RowType extends RowData>(row: RowType, lineNumber: number): DTRowData & RowType {
  return {
    ...(row as object),
    lineNumber
  } as DTRowData & RowType;
}

function attachLineNumbersToRows<RowType extends RowData>(rows: RowType[]): (DTRowData & RowType)[] {
  return rows.map((row, index) => attachLineNumbers(row, index + 1));
}

const STABLE = [] as unknown[];

export function useDataTableRows<RowType extends RowData>({ data }: UseDataTableRowsProps<RowType>) {
  const [rows, setRows] = useState<(DTRowData & RowType)[]>(data ? attachLineNumbersToRows(data) : STABLE as (DTRowData & RowType)[]);
  /**
   * Update rows when data changes
   */
  useEffect(() => {
    if (!data) return;
    setRows(attachLineNumbersToRows(data));
  }, [data]);

  return rows;
}