import { z } from "zod";

export const createUsageSchema = z.object({
    userId: z.number().int().positive(),
    action: z.string().trim().min(1),
    usedUnits: z.number().int().positive()
}).strict();

export type CreateUsageDto = z.infer<typeof createUsageSchema>;

export const userIdParamSchema = z.object({
    id: z.coerce.number().int().positive()
}).strict();