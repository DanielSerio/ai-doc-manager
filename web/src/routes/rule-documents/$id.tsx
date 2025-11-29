import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rule-documents/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/rule-documents/$id"!</div>;
}
