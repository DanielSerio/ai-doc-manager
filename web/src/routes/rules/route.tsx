import { PageHeader } from '@/components/layout';
import { RulesTable } from '@/components/rules';
import { Button } from '@/components/ui/button';
import { useRulesTable } from '@/hooks/rules';
import { useRulesTableColumns } from '@/hooks/rules/useRulesTableColumns';
import { PAGE_DATA } from '@/lib/const';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/rules')({
  beforeLoad: ({ params }) => {
    const { id } = params as { id?: string; };

    if (!id) {
      return PAGE_DATA['/rules/'];
    }

    return PAGE_DATA[`/rules/$id`];
  },
  loader({ context }) {
    const pageData = context;

    return pageData;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const pageData = Route.useRouteContext();
  const [{ isLoading, error, rows, visibilityState, sorting }, methods] = useRulesTable();
  const columns = useRulesTableColumns();


  return (
    <>
      <PageHeader {...pageData} />
      <div className="p-4">
        <Button asChild size="sm">
          <Link to="/rules/$id" params={{ id: 'new' }}>
            <span>Add Rule</span>
            <Plus />
          </Link>
        </Button>
      </div>
      <RulesTable
        isLoading={isLoading}
        error={error}
        rows={rows}
        methods={methods}
        columns={columns}
        visibilityState={visibilityState}
        sorting={sorting}
      />
      <Outlet />
    </>
  );
}
