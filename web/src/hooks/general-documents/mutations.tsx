import { useTRPCClient } from "@/lib/api/trpc";
import { useMutation } from "@tanstack/react-query";


export const useCreateGeneralDocumentMutation = () => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.generalDocuments.create.mutate;

  return useMutation({
    mutationKey: ["general-documents", "create"],
    mutationFn: async (input: Parameters<typeof mutationFn>[0]) => {
      const data = await mutationFn(input);

      return data;
    }
  });
};

export const useUpdateGeneralDocumentMutation = (id: number) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.generalDocuments.update.mutate;

  return useMutation({
    mutationKey: ["general-documents", "update", id],
    mutationFn: async (input: Parameters<typeof mutationFn>[0]) => {
      const data = await mutationFn(input);

      return data;
    }
  });
};

export const useDeleteGeneralDocumentMutation = (id: number) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.generalDocuments.delete.mutate;

  return useMutation({
    mutationKey: ["general-documents", "delete", id],
    mutationFn: async () => {
      const data = await mutationFn({ id });

      return data;
    }
  });
};
