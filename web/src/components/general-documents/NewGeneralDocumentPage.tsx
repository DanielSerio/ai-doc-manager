import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateGeneralDocumentForm } from "./forms/CreateGeneralDocumentForm";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useState } from "react";
import type { GeneralDocumentSearchParams } from "@/routes/general-documents/$id";

export function NewGeneralDocumentPage({ searchParams }: { searchParams: GeneralDocumentSearchParams; }) {
  const isPreviewValues = ['1', 'true'];
  const isPreviewMode = isPreviewValues.includes(searchParams['preview']);

  const navigate = useNavigate();
  const [confirmCancelIsOpen, setConfirmCancelIsOpen] = useState(false);

  const onPreviewClick = () => {
    navigate({
      to: `/general-documents/$id`,
      params: {
        id: 'new'
      },
      search: {
        preview: 'true'
      }
    });
  };

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

  const onDocumentPreviewCancel = () => {
    navigate({
      to: `/general-documents/$id`,
      params: {
        id: 'new'
      },
      search: {
        preview: 'false'
      }
    });
  };

  return (
    <>
      <Dialog open={confirmCancelIsOpen} onOpenChange={setConfirmCancelIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Creating General Document?</DialogTitle>
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
      <CreateGeneralDocumentForm
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