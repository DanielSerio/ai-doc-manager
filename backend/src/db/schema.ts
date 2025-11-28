import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import z from 'zod';

export const rulesTable = sqliteTable('rules', {
  id: integer('id').primaryKey(),
  rawContent: text('raw_content').notNull(),
  priority: integer('priority').notNull().default(50),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const rulesSelectSchema = createSelectSchema(rulesTable);
export const rulesCreateSchema = createInsertSchema(rulesTable);
export const rulesUpdateSchema = createUpdateSchema(rulesTable);

export const ruleDocumentsTable = sqliteTable('rule_documents', {
  id: integer('id').primaryKey(),
  path: text('path').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const ruleDocumentsSelectSchema = createSelectSchema(ruleDocumentsTable);
export const ruleDocumentsCreateSchema = createInsertSchema(ruleDocumentsTable);
export const ruleDocumentsUpdateSchema = createUpdateSchema(ruleDocumentsTable);

export const ruleDocumentRulesTable = sqliteTable('rule_document_rules', {
  ruleDocumentId: integer('rule_document_id').notNull().references(() => ruleDocumentsTable.id),
  ruleId: integer('rule_id').notNull().references(() => rulesTable.id),
  isEnabled: integer('is_enabled').notNull().default(1),
  priorityOverride: integer('priority_override').notNull().default(50),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
}, (table) => [
  primaryKey({ columns: [table.ruleDocumentId, table.ruleId] }),
]);

export const ruleDocumentRulesSelectSchema = createSelectSchema(ruleDocumentRulesTable);
export const ruleDocumentRulesCreateSchema = createInsertSchema(ruleDocumentRulesTable);
export const ruleDocumentRulesUpdateSchema = createUpdateSchema(ruleDocumentRulesTable).extend({ ruleId: z.number().int().positive() });

export const generalDocumentsTable = sqliteTable('general_documents', {
  id: integer('id').primaryKey(),
  path: text('path').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  rawContent: text('raw_content').notNull(),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const generalDocumentsSelectSchema = createSelectSchema(generalDocumentsTable);
export const generalDocumentsCreateSchema = createInsertSchema(generalDocumentsTable);
export const generalDocumentsUpdateSchema = createUpdateSchema(generalDocumentsTable);
