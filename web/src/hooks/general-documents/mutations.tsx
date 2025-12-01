import { useTRPCClient } from "@/lib/api/trpc";
import type { GeneralDocument } from "@/types";
import type { MutationProps } from "@/types/mutation";
import { useMutation } from "@tanstack/react-query";


export const useCreateGeneralDocumentMutation = ({ onSuccess, onError }: MutationProps<{ id: number; }>) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.generalDocuments.create.mutate;

  return useMutation({
    mutationKey: ["general-documents", "create"],
    mutationFn: async (input: Parameters<typeof mutationFn>[0]) => {
      const data = await mutationFn(input);

      return { id: data.id };
    },
    onSuccess,
    onError
  });
};

type UpdateGeneralDocumentMutationProps = MutationProps<GeneralDocument> & { id: number; };

export const useUpdateGeneralDocumentMutation = ({ id, onSuccess, onError }: UpdateGeneralDocumentMutationProps) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.generalDocuments.update.mutate;

  return useMutation({
    mutationKey: ["general-documents", "update", id],
    mutationFn: async (input: Parameters<typeof mutationFn>[0]) => {
      const data = await mutationFn(input);

      return data;
    },
    onSuccess,
    onError
  });
};

type DeleteGeneralDocumentMutationProps = MutationProps<void> & { id: number; };

export const useDeleteGeneralDocumentMutation = ({ id, onSuccess, onError }: DeleteGeneralDocumentMutationProps) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.generalDocuments.delete.mutate;

  return useMutation({
    mutationKey: ["general-documents", "delete", id],
    mutationFn: async () => {
      const data = await mutationFn({ id });

      return data;
    },
    onSuccess,
    onError
  });
};
