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
import { NameField } from "./subcomponents/NameField";
import { PathField } from "./subcomponents/PathField";
import { DescriptionField } from "./subcomponents/DescriptionField";
import { RawContentField } from "./subcomponents/RawContentField";

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
    <div className="flex flex-col p-4">
      {isPreviewMode && (
        <MdDocumentPreview
          onCancel={onDocumentPreviewCancel}
          markdown={markdownRendered}
        />
      )}
      <div className={cn(isPreviewMode ? "hidden" : "w-full max-w-[640px] mx-auto")}>
        <FormProvider {...form}>
          <div className="py-2 flex items-center justify-end gap-x-2">
            <Button size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button size="sm" variant="outline" onClick={onPreviewClick}>Preview</Button>
          </div>
          <form className="mb-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-x-2 mb-4">
              <NameField />
              <PathField />
            </div>
            <DescriptionField className="mb-4" />
            <RawContentField />
          </form>
          <footer className="pt-5 border-t">
            <AsyncButton icon={<Save />} isBusy={mutation.isPending} disabled={!isValid} className="w-full" type="submit">Save</AsyncButton>
          </footer>
        </FormProvider>
      </div>
    </div>
  );
}