import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rule-documents/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/rule-documents/"!</div>;
}
