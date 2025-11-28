import { useTRPCClient } from "@/lib/api/trpc";
import { useMutation } from "@tanstack/react-query";


export const useCreateRuleMutation = () => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.rules.create.mutate;

  return useMutation({
    mutationKey: ["rules", "create"],
    mutationFn: async (input: Parameters<typeof mutationFn>[0]) => {
      const data = await mutationFn(input);

      return data;
    }
  });
};

export const useUpdateRuleMutation = (id: number) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.rules.update.mutate;

  return useMutation({
    mutationKey: ["rules", "update", id],
    mutationFn: async (input: Parameters<typeof mutationFn>[0]) => {
      const data = await mutationFn(input);

      return data;
    }
  });
};

export const useDeleteRuleMutation = (id: number) => {
  const trpc = useTRPCClient();

  const mutationFn = trpc.rules.delete.mutate;

  return useMutation({
    mutationKey: ["rules", "delete", id],
    mutationFn: async () => {
      const data = await mutationFn({ id });

      return data;
    }
  });
};
