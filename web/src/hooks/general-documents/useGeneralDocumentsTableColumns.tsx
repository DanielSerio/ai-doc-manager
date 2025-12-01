import { useMemo } from "react";
import type { DTColumnDef } from "@/components/table/DataTable";
import type { GeneralDocument } from "@/types";
import { getDateColumn, getTypedLineNumberColumn } from "@/components/table/DataTable/common";
import { Link } from "@tanstack/react-router";

type GeneralDocumentRowType = GeneralDocument & { lineNumber: number; };

export function useGeneralDocumentsTableColumns() {
  return useMemo(() => [
    getTypedLineNumberColumn<GeneralDocumentRowType, 'lineNumber'>('id') as DTColumnDef<GeneralDocumentRowType, unknown>,
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => (
        <Link to="/general-documents/$id" params={{ id: `${row.original.id}` }} className="text-primary hover:underline">{row.original.name}</Link>
      ),
      meta: {
        size: {
          min: 100,
          max: 200
        }
      }
    },
    {
      id: 'path',
      header: 'Path',
      accessorKey: 'path',
      cell: ({ row }) => <code>{row.original.path}</code>,
      meta: {
        size: {
          min: 100,
          max: 200
        }
      }
    },
    getDateColumn('createdAt') as DTColumnDef<GeneralDocumentRowType, unknown>,
    getDateColumn('updatedAt') as DTColumnDef<GeneralDocumentRowType, unknown>
  ] satisfies (DTColumnDef<GeneralDocumentRowType, unknown>)[], []);
}