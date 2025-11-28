import z from "zod";
import { publicProcedure, t } from "./init";
import { db } from "..";
import { rulesCreateSchema, rulesSelectSchema, rulesTable, rulesUpdateSchema } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export const rulesRouter = t.router({
  create: publicProcedure
    .input(rulesCreateSchema)
    .output(rulesSelectSchema)
    .mutation(async ({ input }) => {
      const { ...rest } = input;

      const result = await db.insert(rulesTable).values(rest);

      const createdId = result.lastInsertRowid;

      if (!createdId) {
        throw new Error('Failed to create rule');
      }

      const created = await db.select().from(rulesTable).where(eq(rulesTable.id, Number(createdId))).get();

      if (!created) {
        throw new Error('Failed to create rule');
      }

      return created;
    }),
  update: publicProcedure
    .input(rulesUpdateSchema.extend({ id: z.number().int().positive() }))
    .output(rulesSelectSchema)
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;

      await db.update(rulesTable).set(rest).where(eq(rulesTable.id, id));

      const updated = await db.select().from(rulesTable).where(eq(rulesTable.id, id)).get();

      if (!updated) {
        throw new Error('Failed to update rule');
      }

      return updated;
    }),
  delete: publicProcedure
    .input(z.object({
      id: z.number().int().positive(),
    }))
    .output(z.object({
      id: z.number().int().positive(),
    }))
    .mutation(async ({ input }) => {
      const { id } = input;

      await db.delete(rulesTable).where(eq(rulesTable.id, id));

      return { id };
    }),
  getMany: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      sorting: z.partialRecord(z.enum(['asc', 'desc']), z.array(z.string())).optional()
    }))
    .output(z.object({
      data: z.array(rulesSelectSchema),
      paging: z.object({
        limit: z.number().int().positive(),
        offset: z.number().int().nonnegative(),
        total: z.object({
          records: z.number().int().nonnegative(),
          pages: z.number().int().nonnegative(),
        }),
      }),
    }))
    .query(async ({ input }) => {
      const { limit, offset } = input;

      const { count: totalRecords } = await db.select({
        count: sql<number>`count(*)`,
      }).from(rulesTable).get() ?? { count: 0 };

      const totalPages = Math.ceil(totalRecords / (limit ?? 10));
      const results = await db.query.rulesTable.findMany({
        limit: limit ?? 10,
        offset: offset ?? 0,
        orderBy: (rulesTable, { desc }) => [desc(rulesTable.priority)],
      });

      const paging = {
        limit: limit ?? 10,
        offset: offset ?? 0,
        total: {
          records: totalRecords,
          pages: totalPages,
        }
      };

      return {
        data: results,
        paging,
      };
    }),
});