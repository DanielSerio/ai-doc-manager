import { useTRPCClient } from "@/lib/api/trpc";
import { useQuery } from "@tanstack/react-query";

function isValidID(id: number | string) {
  if (typeof id === 'string') {
    return !isNaN(Number(id));
  }

  return id !== null && id !== undefined;
}

export function useGeneralDocument(id: number | string) {
  const trpc = useTRPCClient();

  const queryFn = trpc.generalDocuments.getOne.query;

  return useQuery({
    enabled: isValidID(id),
    queryKey: ["general-documents", id],
    queryFn: async () => {
      const data = await queryFn({ id: Number(id) });

      return data;
    }
  });
}