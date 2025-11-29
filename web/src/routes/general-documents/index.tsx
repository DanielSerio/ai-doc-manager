import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/general-documents/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/general-documents/"!</div>;
}
