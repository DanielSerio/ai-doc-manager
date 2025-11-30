import { useCreateRuleMutation } from "@/hooks/rules";
import { useCreateRuleForm } from "@/hooks/rules/useRuleForm";
import type z from "zod";
import type { RuleCreateSchema } from "@/lib/schemas";
import { PriorityField } from "./subcomponents/PriorityField";
import { CategoryField } from "./subcomponents/CategoryField";
import { RawContentField } from "./subcomponents/RawContentField";
import { AsyncButton } from "@/components/ui/async-button";
import { FormProvider } from "react-hook-form";
import { MdRenderer } from "@/components/ui/md-renderer";
import { Save } from "lucide-react";

export interface CreateRuleFormProps {
  onSuccess: () => void;
  onError: (err: Error) => void;
}

export type CreateRuleFormType = ReturnType<typeof useCreateRuleForm>['form'];

export function CreateRuleForm({ onSuccess, onError }: CreateRuleFormProps) {
  const mutation = useCreateRuleMutation({
    onSuccess,
    onError
  });
  const { form } = useCreateRuleForm();

  const { isValid } = form.formState;

  const onSubmit = (data: z.infer<typeof RuleCreateSchema>) => {
    mutation.mutate(data);
  };

  const markdownRendered = form.watch("rawContent");

  return (
    <FormProvider {...form}>
      <form className="p-4 h-full flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex-1">
          <div className="flex gap-4 mb-2">
            <CategoryField />
            <PriorityField />
          </div>
          <div className="flex flex-col gap-y-2">
            <RawContentField />
            <MdRenderer content={markdownRendered} />
          </div>
        </div>
        <footer className="pt-5 border-t">
          <AsyncButton icon={<Save />} isBusy={mutation.isPending} disabled={!isValid} className="w-full" type="submit">Save</AsyncButton>
        </footer>
      </form>
    </FormProvider>
  );
}