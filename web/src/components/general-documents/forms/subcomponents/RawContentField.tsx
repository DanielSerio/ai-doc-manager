import { MdTextarea } from "@/components/ui/md-textarea";
import { FieldWrap } from "./FieldWrap";
import { useFormContext } from "react-hook-form";
import type { CreateGeneralDocumentFormType } from "../CreateGeneralDocumentForm";
import { FormLabel, FormField, FormItem } from "@/components/ui/form";

export function RawContentField() {
  const { control } = useFormContext<CreateGeneralDocumentFormType>();

  return (
    <FormField
      control={control}
      name="rawContent"
      render={({ field }) => (
        <FieldWrap>
          <FormItem>
            <FormLabel>Content</FormLabel>
            <MdTextarea {...field} />
          </FormItem>
        </FieldWrap>
      )}
    />
  );
}