import { useTRPCClient } from "@/lib/api/trpc";
import { useQuery } from "@tanstack/react-query";

export function useRuleDocument(id: number) {
  const trpc = useTRPCClient();

  const query = useQuery({
    queryKey: ["rule-documents", id],
    queryFn: async () => {
      const data = await trpc.ruleDocuments.getOne.query({ id });

      return data;
    }
  });

  return query;
}