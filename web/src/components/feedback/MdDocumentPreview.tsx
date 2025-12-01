import { Button } from "../ui/button";
import { MdRenderer } from "../ui/md-renderer";

export function MdDocumentPreview({ markdown, onCancel }: { markdown: string; onCancel: () => void; }) {
  return <div>
    <div className="flex items-center justify-end">
      <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
    </div>
    <div className="mt-4">
      <MdRenderer content={markdown} />
    </div>
  </div>;
}