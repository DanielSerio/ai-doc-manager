import { GeneralDocumentPage, NewGeneralDocumentPage } from '@/components/general-documents';
import { useGeneralDocument } from '@/hooks/general-documents';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/general-documents/$id')({
  component: RouteComponent,
});

export type GeneralDocumentSearchParams = ReturnType<typeof Route.useSearch>;

function RouteComponent() {
  const { id } = Route.useParams();
  const searchParams = Route.useSearch();
  const query = useGeneralDocument(id);

  if (id === 'new') {
    return <NewGeneralDocumentPage searchParams={searchParams} />;
  }

  return <GeneralDocumentPage query={query} searchParams={searchParams} />;
}
