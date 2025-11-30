import { CreateRuleForm, UpdateRuleForm } from '@/components/rules/forms';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useRule } from '@/hooks/rules';
import { useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const ruleQuery = useRule(+id);


  const invalidate = () => queryClient.invalidateQueries({
    queryKey: ['rules'],
  });

  if (!isValidID(id)) {
    navigate({ to: '/rules' });
    return;
  }

  const onSuccess = () => {
    invalidate();
    navigate({ to: '/rules' });
  };

  const title = id === 'new' ? 'Create New Rule' : `Update Rule ${id}`;

  return (
    <Sheet defaultOpen={true} onOpenChange={() => navigate({ to: '/rules' })}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {id === 'new' ?
          <CreateRuleForm onSuccess={onSuccess} onError={(err) => console.error(err)} /> :
          <UpdateRuleForm ruleQuery={ruleQuery} onSuccess={onSuccess} onError={(err) => console.error(err)} />
        }
      </SheetContent>
    </Sheet>
  );
}
