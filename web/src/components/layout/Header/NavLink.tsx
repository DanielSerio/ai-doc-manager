import { cn } from "@/lib/utils";
import { Link, type LinkProps } from "@tanstack/react-router";
import { type ReactNode } from "react";


export type NavLinkProps = Omit<LinkProps, 'children'> & {
  icon: ReactNode;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
};

export function NavLink({ icon, children, className, isActive, ...props }: NavLinkProps) {
  const classNames = cn(
    'flex items-center gap-x-1 px-1',
    isActive ? 'text-primary' : 'text-muted-foreground/80 hover:text-foreground',
    className
  );

  return (
    <Link className={classNames} {...props}>
      <span>
        {icon}
      </span>
      <span className="whitespace-nowrap">
        {children}
      </span>
    </Link>
  );
}