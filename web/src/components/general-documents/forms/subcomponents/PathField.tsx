
import { useFormContext } from "react-hook-form";
import type { CreateGeneralDocumentFormType } from "../CreateGeneralDocumentForm";
import { FieldWrap } from "./FieldWrap";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function PathField() {
  const { control } = useFormContext<CreateGeneralDocumentFormType>();

  return (
    <FormField
      control={control}
      name="path"
      render={({ field }) => (
        <FieldWrap>
          <FormItem>
            <FormLabel>Path</FormLabel>
            <Input placeholder="/docs" {...field} />
          </FormItem>
        </FieldWrap>
      )}
    />
  );
}