import { cn } from "@/lib/utils";
import type { AreaHTMLAttributes } from "react";

export interface LayoutProps extends Omit<AreaHTMLAttributes<HTMLDivElement>, 'id'> { }

export function Layout({ children, className, ...props }: LayoutProps) {
  const classNames = cn(
    'flex flex-col h-screen w-full z-0', // layout/position
    'bg-background text-foreground', // colors
    className
  );
  return <div id="layout" data-layout className={classNames} {...props}>{children}</div>;
}