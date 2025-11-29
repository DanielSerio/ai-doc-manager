import { cn } from "@/lib/utils";
import type { AreaHTMLAttributes } from "react";

export interface MainProps extends Omit<AreaHTMLAttributes<HTMLAreaElement>, 'id'> { }

export function Main({ children, className, ...props }: MainProps) {
  const classNames = cn(
    'relative flex-1', // layout/position
    className
  );

  return <main id="main" data-main className={classNames} {...props}>{children}</main>;
}