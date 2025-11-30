import type { useGeneralDocument } from "@/hooks/general-documents";

type QueryType = ReturnType<typeof useGeneralDocument>;

export function GeneralDocumentPage({ query }: { query: QueryType; }) {
  return <div>General Document</div>;
}