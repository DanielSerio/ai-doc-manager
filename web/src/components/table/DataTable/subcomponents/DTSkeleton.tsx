import { TableBody } from "@/components/ui/table";
import { DTRow } from "./DTRow";
import { DTCell } from "./DTCell";
import { Skeleton } from "@/components/ui/skeleton";

export interface DTSkeletonProps {
  skeletonRowCount: number;
  gridTemplateColumns: string;
}

export function DTSkeleton({ skeletonRowCount, gridTemplateColumns }: DTSkeletonProps) {
  const colCount = gridTemplateColumns.split(') minmax(').length;
  return (
    <TableBody>
      {Array.from({ length: skeletonRowCount }).map((__, index) => (
        <DTRow key={index} gridTemplateColumns={gridTemplateColumns}>
          {Array.from({ length: colCount }).map((_, cellIndex) => (
            <DTCell key={cellIndex}>

              <Skeleton className="h-6 m-1 w-full flex-1" />
            </DTCell>
          ))}
        </DTRow>
      ))}
    </TableBody>
  );
}