import { cn } from "@/lib/utils";
import type { DTCellProps } from "../DataTable.props";
import { TableHead } from "@/components/ui/table";
import { COLUMN_ALIGN_CLASS_NAME_MAP } from "@/lib/const/data-table";

export function DTHead({ align, children, className, ...props }: DTCellProps) {
  const classNames = cn(
    'flex h-8 items-center gap-x-2',
    align ? COLUMN_ALIGN_CLASS_NAME_MAP[align] : null,
    className
  );

  return (
    <TableHead className={classNames} {...props}>
      {children}
    </TableHead>
  );
}
