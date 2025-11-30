import { useTRPCClient } from "@/lib/api/trpc";
import type { Rule } from "@/types";
import type { MutationProps } from "@/types/mutation";
import { useMutation } from "@tanstack/react-query";


export const useCreateRuleMutation = ({ onSuccess, onError }: MutationProps<Rule>) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.rules.create.mutate;

  return useMutation({
    mutationKey: ["rules", "create"],
    mutationFn: async (input: Parameters<typeof mutationFn>[0]) => {
      const data = await mutationFn(input);

      return data;
    },
    onSuccess,
    onError
  });
};

interface UpdateMutationProps extends MutationProps<Rule> {
  id: number;
}

export const useUpdateRuleMutation = ({ id, onSuccess, onError }: UpdateMutationProps) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.rules.update.mutate;

  return useMutation({
    mutationKey: ["rules", "update", id],
    mutationFn: async (input: Parameters<typeof mutationFn>[0]) => {
      const data = await mutationFn(input);

      return data;
    },
    onSuccess,
    onError
  });
};

interface DeleteMutationProps extends MutationProps<{ id: number; }> {
  id: number;
}

export const useDeleteRuleMutation = ({ id, onSuccess, onError }: DeleteMutationProps) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.rules.delete.mutate;

  return useMutation({
    mutationKey: ["rules", "delete", id],
    mutationFn: async () => {
      const data = await mutationFn({ id });

      return data;
    },
    onSuccess,
    onError
  });
};
