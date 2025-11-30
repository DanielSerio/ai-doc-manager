import { initTRPC } from "@trpc/server";
import z, { ZodError } from "zod";

export const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    console.log(error.name);
    if (error.cause instanceof ZodError) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError: z.treeifyError(error.cause), // Flatten Zod error for detailed messages
        },
        message: 'Output validation failed. See details in data.zodError.',
      };
    }
    return shape;
  },
});

export const publicProcedure = t.procedure;