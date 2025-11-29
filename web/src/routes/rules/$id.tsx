import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/rules/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  return (
    <Drawer open={true} onClose={() => navigate({ to: '/rules' })}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Rule Details: {id}</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
