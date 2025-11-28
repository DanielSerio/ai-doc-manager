import z from "zod";

const title = 'GeneralDocument';

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
  rawContent: z
    .string(`${title}.rawContent must be a string`)
    .trim()
    .min(1, `${title}.rawContent must not be empty`),
  createdAt: z
    .date(`${title}.createdAt must be a date`)
    .default(() => new Date()),
  updatedAt: z
    .date(`${title}.updatedAt must be a date`)
    .default(() => new Date()),
};

export const GeneralDocumentUpdateSchema = z.object({
  id: common.id,
  path: common.path,
  name: common.name,
  description: common.description,
  rawContent: common.rawContent,
});

export const GeneralDocumentCreateSchema = z.object({
  path: common.path,
  name: common.name,
  description: common.description,
  rawContent: common.rawContent,
});

export const GeneralDocumentSchema = z.object({
  id: common.id,
  path: common.path,
  name: common.name,
  description: common.description,
  rawContent: common.rawContent,
  createdAt: common.createdAt,
  updatedAt: common.updatedAt,
});
