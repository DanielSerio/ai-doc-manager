import type { DTColumnDef, DTRowData } from "@/components/table/DataTable";

export function getDataTableGrid<RowData extends DTRowData, TValue>(columns: DTColumnDef<RowData, TValue>[]) {
  const { totalMin, totalMax } = columns.reduce((acc, column) => ({
    totalMin: acc.totalMin + column.meta!.size.min,
    totalMax: acc.totalMax + column.meta!.size.max
  }), { totalMin: 0, totalMax: 0 });

  const getGridTemplateColumns = () => {
    return columns.map(column => {
      const min = column.meta!.size.min;
      const max = column.meta!.size.max;

      // Calculate the percentage based on the column's min size relative to total min
      const percentage = (min / totalMin) * 100;

      // Use minmax with clamp for min constraint and percentage with max constraint
      // This ensures: min <= actual size <= max, with percentage as the preferred size
      return `minmax(${min}px, min(${percentage}%, ${max}px))`;
    }).join(' ');
  };

  return {
    gridTemplateColumns: getGridTemplateColumns(),
    minWidth: totalMin,
    maxWidth: totalMax
  };
}