import type { useGeneralDocument } from "@/hooks/general-documents";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { UpdateGeneralDocumentForm } from "./forms/UpdateGeneralDocumentForm";
import { Skeleton } from "../ui/skeleton";

type QueryType = ReturnType<typeof useGeneralDocument>;

export function GeneralDocumentPage({ query, searchParams }: { query: QueryType; searchParams?: Record<string, string>; }) {
  const isPreviewValues = ['1', 'true'];
  const isPreviewMode = isPreviewValues.includes((searchParams ?? {})?.['preview']);

  const navigate = useNavigate();
  const [confirmCancelIsOpen, setConfirmCancelIsOpen] = useState(false);

  const onPreviewClick = useCallback(() => {
    if (!query.data) {
      return;
    }

    navigate({
      to: `/general-documents/$id`,
      params: {
        id: query.data.id.toString()
      },
      search: {
        preview: 'true'
      }
    });
  }, [navigate, query.data?.id]);

  const onSuccess = async ({ id }: { id: number; }) => {
    navigate({ to: `/general-documents/${id}` });
  };

  const onCancel = () => {
    setConfirmCancelIsOpen(true);
  };

  const onConfirmCancel = () => {
    navigate({ to: `/general-documents` });
    setConfirmCancelIsOpen(false);
  };

  const onDocumentPreviewCancel = useCallback(() => {
    if (!query.data) {
      return;
    }

    navigate({
      to: `/general-documents/$id`,
      params: {
        id: query.data.id.toString()
      },
      search: {
        preview: 'false'
      }
    });
  }, [navigate, query.data?.id]);

  if (query.isLoading) {
    return <Skeleton className="h-[calc(50vh-4rem)]" />;
  }

  if (query.isError || !query.data) {
    return <div>Error loading general document</div>;
  }

  return (
    <>
      <Dialog open={confirmCancelIsOpen} onOpenChange={setConfirmCancelIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Updating General Document?</DialogTitle>
            <DialogDescription>
              Are you sure you want to go back to the general documents list? Your changes will not be saved.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmCancelIsOpen(false)}>Nevermind</Button>
            <Button variant="destructive" onClick={onConfirmCancel}>Yes, I'm sure</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <UpdateGeneralDocumentForm
        defaultValues={{
          id: query.data.id,
          name: query.data.name,
          path: query.data.path,
          description: query.data.description,
          rawContent: query.data.rawContent
        }}
        isPreviewMode={isPreviewMode}
        onDocumentPreviewCancel={onDocumentPreviewCancel}
        onPreviewClick={onPreviewClick}
        onSuccess={onSuccess}
        onError={() => { }}
        onCancel={onCancel}
      />
    </>
  );
}