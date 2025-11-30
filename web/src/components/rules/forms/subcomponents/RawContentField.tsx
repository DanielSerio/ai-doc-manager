import { MdTextarea } from "@/components/ui/md-textarea";
import { FieldWrap } from "./FieldWrap";
import { useFormContext } from "react-hook-form";
import type { CreateRuleFormType } from "../CreateRuleForm";
import { FormLabel, FormField, FormItem } from "@/components/ui/form";

export function RawContentField() {
  const { control } = useFormContext<CreateRuleFormType>();

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