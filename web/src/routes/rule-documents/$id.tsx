import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rule-documents/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <>{id}</>;
}
