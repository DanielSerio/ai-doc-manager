
import { useFormContext } from "react-hook-form";
import type { CreateGeneralDocumentFormType } from "../CreateGeneralDocumentForm";
import { FieldWrap } from "./FieldWrap";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function NameField() {
  const { control } = useFormContext<CreateGeneralDocumentFormType>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FieldWrap>
          <FormItem>
            <FormLabel>Name</FormLabel>
            <Input placeholder="ABOUT.md" {...field} />
          </FormItem>
        </FieldWrap>
      )}
    />
  );
}