import { PageHeader } from '@/components/layout';
import { PAGE_DATA } from '@/lib/const';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/rule-documents')({
  beforeLoad: ({ params }) => {
    const { id } = params as { id?: string; };

    if (!id) {
      return PAGE_DATA['/rule-documents/'];
    }

    return PAGE_DATA[`/rule-documents/$id`];
  },
  loader({ context }) {
    const pageData = context;

    return pageData;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const pageData = Route.useRouteContext();

  return (
    <>
      <PageHeader {...pageData} />
      <Outlet />
    </>
  );
}
