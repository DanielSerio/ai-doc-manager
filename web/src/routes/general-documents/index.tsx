import { GeneralDocumentsTable } from '@/components/general-documents/GeneralDocumentsTable';
import { Button } from '@/components/ui/button';
import { useGeneralDocumentsTable, useGeneralDocumentsTableColumns } from '@/hooks/general-documents';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/general-documents/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [{ isLoading, error, rows, visibilityState, sorting }, methods] = useGeneralDocumentsTable();
  const columns = useGeneralDocumentsTableColumns();
  return (
    <>
      <div className="p-4">
        <Button asChild size="sm">
          <Link to="/general-documents/$id" params={{ id: 'new' }}>
            <span>Add Document</span>
            <Plus />
          </Link>
        </Button>
      </div>
      <GeneralDocumentsTable
        isLoading={isLoading}
        error={error}
        columns={columns}
        rows={rows}
        visibilityState={visibilityState}
        sorting={sorting}
        methods={methods}
      />
    </>
  );
}
