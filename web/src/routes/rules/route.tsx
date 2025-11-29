import { PageHeader } from '@/components/layout';
import { RulesTable } from '@/components/rules';
import { useRulesTable } from '@/hooks/rules';
import { PAGE_DATA } from '@/lib/const';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

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
  const [{ isLoading, error, rows }, methods] = useRulesTable();

  return (
    <>
      <PageHeader {...pageData} />
      <Link to="/rules/$id" params={{ id: 'new' }} className="text-primary underline">Add Rule</Link>
      <RulesTable
        isLoading={isLoading}
        error={error}
        rows={rows}
        methods={methods}
      />
      <Outlet />
    </>
  );
}
