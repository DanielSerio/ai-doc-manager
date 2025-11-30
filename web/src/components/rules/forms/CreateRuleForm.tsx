import { useCreateRuleMutation } from "@/hooks/rules";
import { Form } from "../../ui/form";
import { useRuleForm } from "@/hooks/rules/useRuleForm";
import type z from "zod";
import type { RuleCreateSchema } from "@/lib/schemas";
import { PriorityField } from "./subcomponents/PriorityField";
import { CategoryField } from "./subcomponents/CategoryField";
import { RawContentField } from "./subcomponents/RawContentField";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { MdRenderer } from "@/components/ui/md-renderer";

export interface CreateRuleFormProps {
  onSuccess: () => void;
  onError: (err: Error) => void;
}

export type CreateRuleFormType = ReturnType<typeof useRuleForm>['form'];

export function CreateRuleForm({ onSuccess, onError }: CreateRuleFormProps) {
  const mutation = useCreateRuleMutation({
    onSuccess,
    onError
  });
  const { form } = useRuleForm();

  const onSubmit = (data: z.infer<typeof RuleCreateSchema>) => {
    mutation.mutate(data);
  };

  const markdownRendered = form.watch("rawContent");

  return (
    <FormProvider {...form}>
      <form className="p-4 h-full flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <CategoryField />
            <PriorityField />
          </div>
          <div className="flex flex-col gap-y-2">
            <RawContentField />
            <MdRenderer content={markdownRendered} />
          </div>
        </div>
        <footer className="pt-5 border-t">
          <Button className="w-full" type="submit">Save</Button>
        </footer>
      </form>
    </FormProvider>
  );
}