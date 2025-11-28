import { useTRPCClient } from "@/lib/api/trpc";
import { invertSorting } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useGeneralDocuments() {
  const trpc = useTRPCClient();
  const [totalRecords, setTotalRecords] = useState<number | null>(null);
  const [paging, setPaging] = useState<{ limit: number; offset: number; }>({
    limit: 10,
    offset: 0
  });
  const [sorting, setSorting] = useState<Record<string, 'asc' | 'desc'>>({
    priority: 'asc',
    createdAt: 'desc'
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

  const changeColumnSorting = (column: string) => setSorting((prevSorting) => {
    if (prevSorting[column] === 'asc') {
      return {
        ...prevSorting,
        [column]: 'desc'
      };
    } else if (prevSorting[column] === 'desc') {
      return {
        ...prevSorting,
        [column]: 'asc'
      };
    } else {
      delete prevSorting[column];
      return prevSorting;
    }
  });

  const query = useQuery({
    queryKey: ["general-documents", JSON.stringify(paging), JSON.stringify(sorting)],
    queryFn: async () => {
      const data = await trpc.generalDocuments.getMany.query({
        ...paging,
        sorting: invertSorting(sorting)
      });

      setTotalRecords(data.paging.total.records);

      return data;
    }
  });

  const state = {
    query,
    paging: {
      limit: paging.limit,
      offset: paging.offset,
      total: {
        records: totalRecords,
        pages: totalRecords ? Math.ceil(totalRecords / paging.limit) : 0
      }
    }
  };

  const methods = {
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
    changeColumnSorting
  };

  return [state, methods] as const;
}