import { initTRPC } from '@trpc/server';
import { rulesRouter } from './rules';
import { generalDocumentsRouter } from './general-documents';
import { ruleDocumentsRouter } from './rule-documents';

export const t = initTRPC.create();

export const appRouter = t.router({
  rules: rulesRouter,
  generalDocuments: generalDocumentsRouter,
  ruleDocuments: ruleDocumentsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;