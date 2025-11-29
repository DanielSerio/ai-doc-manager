import type { AppRouter, AppRouterOutputs } from "../../../backend/src/router";

export type ApiRouter = AppRouter;

export type Rule = AppRouterOutputs['rules']['getMany']['data'][number];
