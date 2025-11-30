import { TableBody } from "@/components/ui/table";
import { DTRow } from "./DTRow";
import { DTCell } from "./DTCell";
import { Empty, EmptyDescription } from "@/components/ui/empty";

export function DTEmpty() {
  return (
    <TableBody>
      <DTRow gridTemplateColumns="1fr">
        <DTCell>
          <Empty>
            <EmptyDescription>No results.</EmptyDescription>
          </Empty>
        </DTCell>
      </DTRow>
    </TableBody>
  );
}