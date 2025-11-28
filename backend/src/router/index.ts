import { rulesRouter } from './rules';
import { generalDocumentsRouter } from './general-documents';
import { ruleDocumentsRouter } from './rule-documents';
import { t, publicProcedure } from './init';

export { t, publicProcedure };

export const appRouter = t.router({
  rules: rulesRouter,
  generalDocuments: generalDocumentsRouter,
  ruleDocuments: ruleDocumentsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;