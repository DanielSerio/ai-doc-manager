import { cn } from "@/lib/utils";
import type { DTCellProps } from "../DataTable.props";
import { TableCell } from "@/components/ui/table";
import { COLUMN_ALIGN_CLASS_NAME_MAP } from "@/lib/const/data-table";

export function DTCell({ align, children, className, ...props }: DTCellProps) {
  const classNames = cn(
    'flex',
    align ? COLUMN_ALIGN_CLASS_NAME_MAP[align] : null,
    className
  );

  return (
    <TableCell className={classNames} {...props}>
      {children}
    </TableCell>
  );
}