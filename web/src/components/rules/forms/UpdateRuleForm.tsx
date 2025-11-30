import { useDeleteRuleMutation, useRule, useUpdateRuleMutation } from "@/hooks/rules";
import { useUpdateRuleForm } from "@/hooks/rules/useRuleForm";
import type z from "zod";
import type { RuleUpdateSchema } from "@/lib/schemas";
import { PriorityField } from "./subcomponents/PriorityField";
import { CategoryField } from "./subcomponents/CategoryField";
import { RawContentField } from "./subcomponents/RawContentField";
import { AsyncButton } from "@/components/ui/async-button";
import { FormProvider } from "react-hook-form";
import { MdRenderer } from "@/components/ui/md-renderer";
import { Save, Trash } from "lucide-react";
import type { Rule } from "@/types";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface UpdateRuleFormProps {
  ruleQuery: ReturnType<typeof useRule>;
  onSuccess: () => void;
  onError: (err: Error) => void;
}

interface FormInnerProps {
  rule: Rule;
  onSuccess: () => void;
  onError: (err: Error) => void;
}

export type UpdateRuleFormType = ReturnType<typeof useUpdateRuleForm>['form'];

function FormInner({ rule, onSuccess, onError }: FormInnerProps) {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const { form } = useUpdateRuleForm({
    id: rule.id,
    category: rule.category,
    priority: rule.priority,
    rawContent: rule.rawContent
  });

  const { isValid } = form.formState;

  const mutation = useUpdateRuleMutation({
    id: rule.id,
    onSuccess,
    onError
  });
  const deleteMutation = useDeleteRuleMutation({
    id: rule.id,
    onSuccess,
    onError
  });

  const onSubmit = (data: z.infer<typeof RuleUpdateSchema>) => {
    mutation.mutate({
      id: data.id,
      category: data.category,
      priority: data.priority,
      rawContent: data.rawContent
    });
  };

  const markdownRendered = form.watch("rawContent");

  return (
    <>
      <Dialog open={isConfirmDeleteModalOpen} onOpenChange={setIsConfirmDeleteModalOpen}>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this rule?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => deleteMutation.mutate()}>Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          <footer className="pt-5 border-t flex flex-col gap-y-2">
            <AsyncButton icon={<Save />} isBusy={mutation.isPending} className="w-full" type="submit" disabled={!isValid}>Save</AsyncButton>
            <AsyncButton icon={<Trash />} isBusy={deleteMutation.isPending} className="w-full" variant="destructive" type="button" onClick={() => setIsConfirmDeleteModalOpen(true)}>Delete</AsyncButton>
          </footer>
        </form>
      </FormProvider>
    </>
  );
}

export function UpdateRuleForm({ ruleQuery, onSuccess, onError }: UpdateRuleFormProps) {

  const rule = ruleQuery.data;
  const isLoading = ruleQuery.isLoading;

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
      </div>
    );
  }

  if (!rule || ruleQuery.isError) {
    return <div>Error loading rule</div>;
  }

  return <FormInner rule={rule} onSuccess={onSuccess} onError={onError} />;
}