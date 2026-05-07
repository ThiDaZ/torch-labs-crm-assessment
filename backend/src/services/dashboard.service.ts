import { count } from "drizzle-orm";
import { db } from "../db/index.ts";
import { leadsTable } from "../db/schema.ts";

export const getTotalLeadsService = async () => {
	const result = await db.select({ count: count() }).from(leadsTable);
	return result;
};
