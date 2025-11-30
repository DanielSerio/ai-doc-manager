import { RuleCreateSchema, RuleUpdateSchema } from '@/lib/schemas';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from "react-hook-form";
import type z from 'zod';

type RuleCreate = z.infer<typeof RuleCreateSchema>;

type RuleUpdate = RuleCreate & {
  id: number;
};

const fallbackValues = {
  category: '',
  rawContent: '',
  priority: 50,
};


export function useCreateRuleForm(defaultValues?: RuleCreate) {
  const form = useForm({
    defaultValues: defaultValues ?? fallbackValues,
    resolver: standardSchemaResolver(RuleCreateSchema)
  });

  return {
    form
  };
}

export function useUpdateRuleForm(defaultValues?: RuleUpdate) {
  const form = useForm({
    defaultValues: {
      ...fallbackValues,
      ...defaultValues,
      id: defaultValues?.id ?? -1
    },
    resolver: standardSchemaResolver(RuleUpdateSchema)
  });

  return {
    form
  };
}