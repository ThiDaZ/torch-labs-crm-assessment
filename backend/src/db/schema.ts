import { pgTable, varchar, timestamp, serial, pgEnum, decimal, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	email: varchar("email").notNull().unique(),
	passwordHash: varchar("password_hash").notNull(),
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at"),
});

export const leadStatusEnum = pgEnum("lead_status", [
	"New",
	"Contacted",
	"Qualified",
	"Proposal Sent",
	"Won",
	"Lost",
]);

export const leadSourcesEnum = pgEnum("lead_sources", [
	"Website",
	"LinkedIn",
	"Referral",
	"Cold Email",
]);

export const leadsTable = pgTable("leads", {
	id: serial("id").primaryKey(),
	leadName: varchar("lead_name").notNull(),
	companyName: varchar("company_name").notNull(),
	email: varchar("email").notNull(),
	phoneNumber: varchar("phone_number").notNull(),
	leadSource: leadSourcesEnum("lead_source").notNull(),
	status: leadStatusEnum("status").notNull().default("New"),
	dealValue: decimal("deal_value", { precision: 10, scale: 2 }).notNull().default("0.00"),
	assignedSalespersonId: integer("assigned_salesperson_id").references(() => usersTable.id),
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at"),
});

export const notesTable = pgTable("notes", {
	id: serial("id").primaryKey(),
	leadId: integer("lead_id")
		.references(() => leadsTable.id)
		.notNull(),
	content: varchar("content").notNull(),
	createdBy: integer("created_by")
		.references(() => usersTable.id)
		.notNull(),
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at"),
});
