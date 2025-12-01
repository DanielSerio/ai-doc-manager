import { Button } from "../ui/button";

export function MdDocumentPreview({ markdown, onCancel }: { markdown: string; onCancel: () => void; }) {
  return <div>
    <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
  </div>;
}