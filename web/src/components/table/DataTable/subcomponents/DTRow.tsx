import { TableRow } from "@/components/ui/table";
import type { DTRowProps } from "../DataTable.props";
import { cn } from "@/lib/utils";

export function DTRow({ gridTemplateColumns, children, className, style, ...props }: DTRowProps) {
  const classNames = cn(
    'grid p-0 h-8 items-center',
    className
  );

  return (
    <TableRow className={classNames} style={{ ...style, gridTemplateColumns }} {...props}>
      {children}
    </TableRow>
  );
}