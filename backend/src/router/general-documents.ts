import z from "zod";
import { publicProcedure, t } from "./init";
import { db } from "..";
import { generalDocumentsCreateSchema, generalDocumentsSelectSchema, generalDocumentsTable, generalDocumentsUpdateSchema } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export const generalDocumentsRouter = t.router({
  create: publicProcedure
    .input(generalDocumentsCreateSchema)
    .output(generalDocumentsSelectSchema)
    .mutation(async ({ input }) => {
      const { ...rest } = input;

      const result = await db.insert(generalDocumentsTable).values(rest);

      const createdId = result.lastInsertRowid;

      if (!createdId) {
        throw new Error('Failed to create general document');
      }

      const created = await db.select().from(generalDocumentsTable).where(eq(generalDocumentsTable.id, Number(createdId))).get();

      if (!created) {
        throw new Error('Failed to create general document');
      }

      return created;
    }),
  update: publicProcedure
    .input(generalDocumentsUpdateSchema.extend({ id: z.number().int().positive() }))
    .output(generalDocumentsSelectSchema)
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;

      await db.update(generalDocumentsTable).set(rest).where(eq(generalDocumentsTable.id, id));

      const updated = await db.select().from(generalDocumentsTable).where(eq(generalDocumentsTable.id, id)).get();

      if (!updated) {
        throw new Error('Failed to update general document');
      }

      return updated;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .output(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      await db.delete(generalDocumentsTable).where(eq(generalDocumentsTable.id, id));

      return { id };
    }),
  getMany: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      sorting: z.partialRecord(z.enum(['asc', 'desc']), z.array(z.string())).optional()
    }))
    .output(z.object({
      data: z.array(generalDocumentsSelectSchema),
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
      }).from(generalDocumentsTable).get() ?? { count: 0 };

      const totalPages = Math.ceil(totalRecords / (limit ?? 10));
      const results = await db.query.generalDocumentsTable.findMany({
        limit: limit ?? 10,
        offset: offset ?? 0,
        orderBy: (generalDocumentsTable, { desc }) => [desc(generalDocumentsTable.createdAt)],
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

  getOne: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .output(generalDocumentsSelectSchema)
    .query(async ({ input }) => {
      const { id } = input;

      const result = await db.select().from(generalDocumentsTable).where(eq(generalDocumentsTable.id, id)).get();

      if (!result) {
        throw new Error('Failed to get general document');
      }

      return result;
    }),
});