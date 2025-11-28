import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { ApiRouter } from '@/types/trpc';

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<ApiRouter>();