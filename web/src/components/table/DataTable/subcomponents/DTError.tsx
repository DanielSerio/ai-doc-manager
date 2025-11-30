import { TableBody } from "@/components/ui/table";
import { DTRow } from "./DTRow";
import { DTCell } from "./DTCell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DTError({ error }: { error: Error; }) {
  const errorTitle = `Error: ${error.name}`;
  const errorDescription = error.message;
  return (
    <TableBody>
      <DTRow gridTemplateColumns="1fr">
        <DTCell>
          <Alert variant="destructive" className="text-center rounded-none border-none bg-destructive/3">
            <AlertTitle>{errorTitle}</AlertTitle>
            <AlertDescription className="justify-items-center">
              {errorDescription}
            </AlertDescription>
          </Alert>
        </DTCell>
      </DTRow>
    </TableBody>
  );
}