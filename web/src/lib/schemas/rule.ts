import { z } from "zod";


const title = 'Rule';

const common = {
  id: z
    .number(`${title}.id must be a number`)
    .int(`${title}.id must be an integer`)
    .positive(`${title}.id must be a positive number`),
  rawContent: z
    .string(`${title}.rawContent must be a string`)
    .trim()
    .min(1, `${title}.rawContent must not be empty`)
    .max(512, `${title}.rawContent must not be longer than 512 characters`),
  priority: z
    .number(`${title}.priority must be a number`)
    .int(`${title}.priority must be an integer`)
    .nonnegative(`${title}.priority must be a non-negative number`)
    .max(100, `${title}.priority must be less than or equal to 100`),
  createdAt: z
    .date(`${title}.createdAt must be a date`)
    .default(() => new Date()),
  updatedAt: z
    .date(`${title}.updatedAt must be a date`)
    .default(() => new Date()),
};

export const RuleUpdateSchema = z.object({
  id: common.id,
  rawContent: common.rawContent,
  priority: common.priority,
});

export const RuleCreateSchema = z.object({
  rawContent: common.rawContent,
  priority: common.priority,
});

export const RuleSchema = z.object({
  id: common.id,
  rawContent: common.rawContent,
  priority: common.priority,
  createdAt: common.createdAt,
  updatedAt: common.updatedAt,
});
