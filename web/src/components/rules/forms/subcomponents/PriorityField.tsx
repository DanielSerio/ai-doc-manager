import { Slider } from "@/components/ui/slider";
import { FieldWrap } from "./FieldWrap";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { CreateRuleFormType } from "../CreateRuleForm";

export function PriorityField() {
  const { control } = useFormContext<CreateRuleFormType>();

  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FieldWrap>
          <FormItem>
            <FormLabel>Priority</FormLabel>
            <div className="flex gap-x-1 items-center h-9">
              <Slider
                step={5}
                min={0}
                max={100}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                onBlur={field.onBlur}
              />
              <span className="text-xs font-semibold border rounded-full px-2">{field.value}</span>
            </div>
          </FormItem>
        </FieldWrap>
      )}
    />
  );
}