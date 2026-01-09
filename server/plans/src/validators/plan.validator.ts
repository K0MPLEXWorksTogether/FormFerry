import z from "zod";

export const createPlanValidator = z.object({
  id: z.uuid(),
  name: z.string(),
  quota: z.int(),
  price: z.int(),
  interval: z.enum(["month", "year"]),
  currency: z.string().optional(),
});

export const updatePlanValidator = z.object({
  name: z.string().optional(),
  quota: z.int().optional(),
  price: z.int().optional(),
  interval: z.enum(["month", "year"]).optional(),
  currency: z.string().optional(),
});
