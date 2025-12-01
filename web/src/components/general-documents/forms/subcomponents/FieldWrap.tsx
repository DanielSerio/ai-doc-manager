import { cn } from "@/lib/utils";

export function FieldWrap({ children, className }: { children: React.ReactNode; className?: string; }) {
  return <div className={cn("flex flex-col gap-2 w-full", className)}>
    {children}
  </div>;
}