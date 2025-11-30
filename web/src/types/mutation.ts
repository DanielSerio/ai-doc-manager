interface MutationPropsBase {
  onError: (err: Error) => void;
}

interface VoidMutationProps extends MutationPropsBase {
  onSuccess: () => void;
}

interface ParamsMutationProps<Type> extends MutationPropsBase {
  onSuccess: (data: Type) => void;
}

export type MutationProps<Type = void> = Type extends void ? VoidMutationProps : ParamsMutationProps<Type>;