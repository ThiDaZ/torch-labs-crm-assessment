import { z } from "zod";

export const SearchSchema = z.object({
  query: z.string().min(3).optional(),
  status: z.enum(["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"]).optional(),
  source: z.enum(["Website", "LinkedIn", "Referral", "Cold Email"]).optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
  salePerson: z.coerce.number().optional()
});
