
import { useFormContext } from "react-hook-form";
import type { CreateGeneralDocumentFormType } from "../CreateGeneralDocumentForm";
import { FieldWrap } from "./FieldWrap";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function DescriptionField({ className }: { className?: string; }) {
  const { control } = useFormContext<CreateGeneralDocumentFormType>();

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FieldWrap className={className}>
          <FormItem>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Description of the `/docs/ABOUT.md` file" {...field} />
          </FormItem>
        </FieldWrap>
      )}
    />
  );
}