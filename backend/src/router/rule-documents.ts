import z from "zod";
import { publicProcedure, t } from "./init";
import { db } from "..";
import { ruleDocumentRulesSelectSchema, ruleDocumentRulesTable, ruleDocumentRulesUpdateSchema, ruleDocumentsCreateSchema, ruleDocumentsSelectSchema, ruleDocumentsTable, ruleDocumentsUpdateSchema, rulesTable } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export const ruleDocumentsRouter = t.router({
  create: publicProcedure
    .input(ruleDocumentsCreateSchema)
    .output(ruleDocumentsSelectSchema)
    .mutation(async ({ input }) => {
      const { ...rest } = input;

      const result = await db.insert(ruleDocumentsTable).values(rest);

      const createdId = result.lastInsertRowid;

      if (!createdId) {
        throw new Error('Failed to create rule document');
      }

      const created = await db.select().from(ruleDocumentsTable).where(eq(ruleDocumentsTable.id, Number(createdId))).get();
      // create rule document rules. there should be a record for each rule
      const allRuleIds = await db.select({
        id: rulesTable.id,
      }).from(rulesTable);

      await db.transaction(async (tx) => {
        await tx.insert(ruleDocumentRulesTable).values(allRuleIds.map((rule) => ({ ruleDocumentId: Number(createdId), ruleId: rule.id })));
      });

      if (!created) {
        throw new Error('Failed to create rule document');
      }

      return created;
    }),
  update: publicProcedure
    .input(ruleDocumentsUpdateSchema
      .extend({
        id: z.number().int().positive(),
        rules: z.array(ruleDocumentRulesUpdateSchema.omit({ ruleDocumentId: true }))
      }))
    .output(ruleDocumentsSelectSchema
      .extend({
        rules: z.array(ruleDocumentRulesSelectSchema)
      }))
    .mutation(async ({ input }) => {
      const { id, rules, ...rest } = input;

      // update rule document
      await db.update(ruleDocumentsTable).set(rest).where(eq(ruleDocumentsTable.id, id));

      //update rule document rules
      await db.transaction(async (tx) => {
        await tx.delete(ruleDocumentRulesTable).where(eq(ruleDocumentRulesTable.ruleDocumentId, id));
        await tx.insert(ruleDocumentRulesTable).values(rules.map((rule) => ({ ...rule, ruleDocumentId: id })));
      });

      const updated = await db.select().from(ruleDocumentsTable).where(eq(ruleDocumentsTable.id, id)).get();
      const updatedRules = await db.select().from(ruleDocumentRulesTable).where(eq(ruleDocumentRulesTable.ruleDocumentId, id));

      if (!updated) {
        throw new Error('Failed to update rule document');
      }

      return {
        ...updated,
        rules: updatedRules,
      };
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .output(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      await db.delete(ruleDocumentsTable).where(eq(ruleDocumentsTable.id, id));

      return { id };
    }),
  getMany: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      sorting: z.partialRecord(z.enum(['asc', 'desc']), z.array(z.string())).optional()
    }))
    .output(z.object({
      data: z.array(ruleDocumentsSelectSchema),
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
      }).from(ruleDocumentsTable).get() ?? { count: 0 };

      const totalPages = Math.ceil(totalRecords / (limit ?? 10));
      const results = await db.query.ruleDocumentsTable.findMany({
        limit: limit ?? 10,
        offset: offset ?? 0,
        orderBy: (ruleDocumentsTable, { desc }) => [desc(ruleDocumentsTable.createdAt)],
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
    .output(ruleDocumentsSelectSchema)
    .query(async ({ input }) => {
      const { id } = input;

      const result = await db.select().from(ruleDocumentsTable).where(eq(ruleDocumentsTable.id, id)).get();
      const rules = await db.select().from(ruleDocumentRulesTable).where(eq(ruleDocumentRulesTable.ruleDocumentId, id));

      if (!result) {
        throw new Error('Failed to get rule document');
      }

      return {
        ...result,
        rules,
      };
    }),
});