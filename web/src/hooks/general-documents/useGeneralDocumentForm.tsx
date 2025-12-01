import { GeneralDocumentCreateSchema, GeneralDocumentUpdateSchema } from "@/lib/schemas";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import type z from 'zod';

type GeneralDocumentUpdate = z.infer<typeof GeneralDocumentUpdateSchema>;

const fallbackValues = {
  path: '',
  name: '',
  description: '',
  rawContent: '',
};

export function useCreateGeneralDocumentForm() {
  const form = useForm({
    defaultValues: fallbackValues,
    resolver: standardSchemaResolver(GeneralDocumentCreateSchema)
  });

  return {
    form
  };
}

export function useUpdateGeneralDocumentForm(defaultValues?: GeneralDocumentUpdate) {
  const form = useForm({
    defaultValues: {
      ...fallbackValues,
      ...defaultValues,
      id: defaultValues?.id ?? -1
    },
    resolver: standardSchemaResolver(GeneralDocumentUpdateSchema)
  });

  return {
    form
  };
}
