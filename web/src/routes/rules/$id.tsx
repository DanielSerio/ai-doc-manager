import { CreateRuleForm } from '@/components/rules/forms';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/rules/$id')({
  component: RouteComponent,
});

function isValidPositiveInteger(id: string) {
  const parsed = parseInt(id);
  return !isNaN(parsed) && parsed > 0;
}

function isValidID(id: string) {
  return isValidPositiveInteger(id) || id === 'new';
}

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  if (!isValidID(id)) {
    navigate({ to: '/rules' });
    return;
  }

  const title = id === 'new' ? 'Create New Rule' : `Update Rule ${id}`;

  return (
    <Sheet defaultOpen={true} onOpenChange={() => navigate({ to: '/rules' })}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {id === 'new' ? <CreateRuleForm onSuccess={() => navigate({ to: '/rules' })} onError={(err) => console.error(err)} /> : <></>}
      </SheetContent>
    </Sheet>
  );
}
