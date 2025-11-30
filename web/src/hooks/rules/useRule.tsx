import { useTRPCClient } from "@/lib/api/trpc";
import { useQuery } from "@tanstack/react-query";

export function useRule(id: number) {
  const trpc = useTRPCClient();

  return useQuery({
    enabled: !!id && typeof id === 'number' && id > 0,
    queryKey: ['rules', id],
    queryFn: () => trpc.rules.getOne.query({ id })
  });
}
