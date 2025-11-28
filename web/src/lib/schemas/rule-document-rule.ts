import z from "zod";

const title = `RuleDocumentRule`;

const common = {
  ruleDocumentId: z
    .number(`${title}.ruleDocumentId must be a number`)
    .int(`${title}.ruleDocumentId must be an integer`)
    .positive(`${title}.ruleDocumentId must be a positive number`),
  ruleId: z
    .number(`${title}.ruleId must be a number`)
    .int(`${title}.ruleId must be an integer`)
    .positive(`${title}.ruleId must be a positive number`),
  isEnabled: z
    .boolean(`${title}.isEnabled must be a boolean`)
    .default(true),
  priorityOverride: z
    .number(`${title}.priorityOverride must be a number`)
    .int(`${title}.priorityOverride must be an integer`)
    .nonnegative(`${title}.priorityOverride must be a non-negative number`)
    .max(100, `${title}.priorityOverride must be less than or equal to 100`)
    .nullable()
    .default(null),
  updatedAt: z
    .date(`${title}.updatedAt must be a date`)
    .default(() => new Date()),
};

export const RuleDocumentRuleUpdateSchema = z.object({
  ruleDocumentId: common.ruleDocumentId,
  ruleId: common.ruleId,
  isEnabled: common.isEnabled,
  priorityOverride: common.priorityOverride,
});

export const RuleDocumentRuleCreateSchema = z.object({
  ruleDocumentId: common.ruleDocumentId,
  ruleId: common.ruleId,
});

export const RuleDocumentRuleSchema = z.object({
  ruleDocumentId: common.ruleDocumentId,
  ruleId: common.ruleId,
  isEnabled: common.isEnabled,
  priorityOverride: common.priorityOverride,
  updatedAt: common.updatedAt,
});