import { RuleCreateSchema } from '@/lib/schemas';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import type z from 'zod';

type RuleCreate = z.infer<typeof RuleCreateSchema>;

type RuleData = RuleCreate & {
  id: number | null;
};

const fallbackValues = {
  category: '',
  rawContent: '',
  priority: 50,
};


export function useRuleForm(defaultValues?: RuleData) {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (defaultValues?.id) {
      setId(defaultValues.id);
    }
  }, [defaultValues]);

  const form = useForm({
    defaultValues: defaultValues ?? fallbackValues,
    resolver: standardSchemaResolver(RuleCreateSchema)
  });

  return {
    id,
    form
  };
}