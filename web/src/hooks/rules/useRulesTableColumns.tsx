import type { DTColumnDef } from "@/components/table/DataTable";
import { getDateColumn, getTypedLineNumberColumn } from "@/components/table/DataTable/common";
import type { Rule } from "@/types";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

type DTRule = Rule & {
  lineNumber: number;
};

export function useRulesTableColumns() {
  return useMemo(() => {
    return [
      getTypedLineNumberColumn<DTRule, number>(),
      {
        id: 'category',
        header: 'Category',
        cell: ({ row }) => <div>{row.original.category}</div>,
        meta: {
          size: {
            min: 120,
            max: 200
          }
        }
      },
      {
        id: 'priority',
        header: 'Priority',
        cell: ({ row }) => <div>{row.original.priority}</div>,
        meta: {
          size: {
            min: 120,
            max: 140
          }
        }
      },
      {
        id: 'rawContent',
        header: 'Content',
        cell: ({ row }) => <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          <Link to="/rules/$id" params={{ id: `${row.original.id}` }}>{row.original.rawContent}</Link>
        </div>,
        meta: {
          size: {
            min: 200,
            max: 400
          }
        }
      },
      getDateColumn<DTRule>('createdAt'),
      getDateColumn<DTRule>('updatedAt'),
    ] as DTColumnDef<DTRule, unknown>[];
  }, []);
}