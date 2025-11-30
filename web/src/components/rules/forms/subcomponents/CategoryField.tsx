import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { CreateRuleFormType } from "../CreateRuleForm";
import { FieldWrap } from "./FieldWrap";


export function CategoryField() {
  const { control } = useFormContext<CreateRuleFormType>();

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FieldWrap>
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Input placeholder="Typescript" {...field} />
          </FormItem>
        </FieldWrap>
      )}
    />
  );
}