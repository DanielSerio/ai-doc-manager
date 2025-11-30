import { GeneralDocumentPage, NewGeneralDocumentPage } from '@/components/general-documents';
import { useGeneralDocument } from '@/hooks/general-documents';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rule-documents/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const query = useGeneralDocument(id);

  if (id === 'new') {
    return <NewGeneralDocumentPage />;
  }

  return <GeneralDocumentPage query={query} />;
}
