import { useTRPCClient } from "@/lib/api/trpc";
import { invertSorting } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import { useState } from "react";

export const useRules = ({ limit, offset }: { limit: number; offset: number; }) => {
  const trpc = useTRPCClient();
  const [totalRecords, setTotalRecords] = useState<number | null>(null);
  const [paging, setPaging] = useState<{ limit: number; offset: number; }>({
    limit,
    offset
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'priority',
      desc: false
    },
    {
      id: 'createdAt',
      desc: true
    }
  ]);

  const query = useQuery({
    queryKey: ["rules", JSON.stringify(paging), JSON.stringify(sorting)],
    queryFn: async () => {
      const data = await trpc.rules.getMany.query({
        ...paging,
        sorting: invertSorting(sorting)
      });

      setTotalRecords(data.paging.total.records);

      return data.data;
    }
  });

  const goToFirstPage = () => setPaging({
    limit: paging.limit,
    offset: 0
  });

  const goToLastPage = () => setPaging({
    limit: paging.limit,
    offset: Math.ceil(totalRecords! / paging.limit) - 1
  });

  const goToPreviousPage = () => setPaging({
    limit: paging.limit,
    offset: paging.offset - paging.limit
  });

  const goToNextPage = () => setPaging({
    limit: paging.limit,
    offset: paging.offset + paging.limit
  });


  const state = {
    query,
    sorting,
    paging: {
      limit: paging.limit,
      offset: paging.offset,
      total: {
        records: totalRecords,
        pages: totalRecords ? Math.ceil(totalRecords / paging.limit) : 0
      }
    }
  } as const;

  const methods = {
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
    setSorting
  } as const;

  return [state, methods] as const;
};