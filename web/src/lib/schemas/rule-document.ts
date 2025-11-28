import z from "zod";
import { RuleDocumentRuleSchema, RuleDocumentRuleUpdateSchema } from "./rule-document-rule";

const title = 'RuleDocument';

const common = {
  id: z
    .number(`${title}.id must be a number`)
    .int(`${title}.id must be an integer`)
    .positive(`${title}.id must be a positive number`),
  path: z
    .string(`${title}.path must be a string`)
    .trim()
    .min(1, `${title}.path must not be empty`)
    .regex(/^\/[/.a-zA-Z0-9-]+$/, `${title}.path must be a valid url path`),
  name: z
    .string(`${title}.name must be a string`)
    .trim()
    .min(1, `${title}.name must not be empty`)
    .max(64, `${title}.name must not be longer than 64 characters`),
  description: z
    .string(`${title}.description must be a string`)
    .trim()
    .min(1, `${title}.description must not be empty`)
    .max(512, `${title}.description must not be longer than 512 characters`),
  createdAt: z
    .date(`${title}.createdAt must be a date`)
    .default(() => new Date()),
  updatedAt: z
    .date(`${title}.updatedAt must be a date`)
    .default(() => new Date()),
};

export const RuleDocumentUpdateSchema = z.object({
  id: common.id,
  path: common.path,
  name: common.name,
  description: common.description,
  rules: z.array(RuleDocumentRuleUpdateSchema),
});

export const RuleDocumentCreateSchema = z.object({
  path: common.path,
  name: common.name,
  description: common.description,
});

export const RuleDocumentSchema = z.object({
  id: common.id,
  path: common.path,
  name: common.name,
  description: common.description,
  createdAt: common.createdAt,
  updatedAt: common.updatedAt,
});

export const RuleDocumentExtendedSchema = RuleDocumentSchema.extend({
  rules: z.array(RuleDocumentRuleSchema),
});