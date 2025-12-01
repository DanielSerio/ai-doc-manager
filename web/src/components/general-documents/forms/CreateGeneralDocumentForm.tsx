import { MdDocumentPreview } from "@/components/feedback";
import { AsyncButton } from "@/components/ui/async-button";
import { Button } from "@/components/ui/button";
import { useCreateGeneralDocumentForm } from "@/hooks/general-documents";
import { useCreateGeneralDocumentMutation } from "@/hooks/general-documents/mutations";
import type { GeneralDocumentCreateSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { z } from 'zod';

export interface CreateGeneralDocumentFormProps {
  isPreviewMode?: boolean;
  onDocumentPreviewCancel: () => void;
  onPreviewClick: () => void;
  onSuccess: ({ id }: { id: number; }) => Promise<void>;
  onError: (err: Error) => void;
  onCancel: () => void;
}

export type CreateGeneralDocumentFormType = ReturnType<typeof useCreateGeneralDocumentForm>['form'];

export function CreateGeneralDocumentForm({
  isPreviewMode,
  onDocumentPreviewCancel,
  onPreviewClick,
  onSuccess,
  onError,
  onCancel
}: CreateGeneralDocumentFormProps) {
  const mutation = useCreateGeneralDocumentMutation({
    onSuccess,
    onError
  });
  const { form } = useCreateGeneralDocumentForm();

  const { isValid } = form.formState;

  const onSubmit = (data: z.infer<typeof GeneralDocumentCreateSchema>) => {
    mutation.mutate(data);
  };

  const markdownRendered = form.watch("rawContent");


  return (
    <div>
      {isPreviewMode && (
        <MdDocumentPreview
          onCancel={onDocumentPreviewCancel}
          markdown={markdownRendered}
        />
      )}
      <div className={cn(isPreviewMode ? "hidden" : "")}>
        <FormProvider {...form}>
          <div className="px-4 py-2 flex items-center justify-end gap-x-2">
            <Button size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button size="sm" variant="outline" onClick={onPreviewClick}>Preview</Button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>Create General Document</div>
          </form>
          <footer className="pt-5 border-t">
            <AsyncButton icon={<Save />} isBusy={mutation.isPending} disabled={!isValid} className="w-full" type="submit">Save</AsyncButton>
          </footer>
        </FormProvider>
      </div>
    </div>
  );
}