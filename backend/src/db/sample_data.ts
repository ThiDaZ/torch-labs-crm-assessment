import { db } from "./index.ts";
import { leadsTable, notesTable } from "./schema.ts";

type LeadSeed = {
	leadName: string;
	companyName: string | null;
	email: string;
	phoneNumber: string;
	leadSource: "Website" | "LinkedIn" | "Referral" | "Cold Email";
	status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
	dealValue: string;
	assignedSalespersonId: number;
};

type NoteSeed = {
	leadEmail: string;
	content: string;
	createdBy: number;
};

const leadSeeds: LeadSeed[] = [

	{
		leadName: "Maya Fernando",
		companyName: "Northstar Retail",
		email: "maya.fernando@northstarretail.com",
		phoneNumber: "+94 77 245 8891",
		leadSource: "Website",
		status: "New",
		dealValue: "85000.00",
		assignedSalespersonId: 1,
	},
	{
		leadName: "Daniel Perera",
		companyName: "BluePeak Logistics",
		email: "daniel@bluepeaklogistics.io",
		phoneNumber: "+94 71 408 2210",
		leadSource: "LinkedIn",
		status: "Contacted",
		dealValue: "132500.00",
		assignedSalespersonId: 1,
	},
	{
		leadName: "Ayesha Ali",
		companyName: "Summit Health Group",
		email: "ayesha@summithealth.lk",
		phoneNumber: "+94 76 554 1902",
		leadSource: "Referral",
		status: "Qualified",
		dealValue: "210000.00",
		assignedSalespersonId: 1,
	},
	{
		leadName: "Kavindu Silva",
		companyName: "BrightByte Studios",
		email: "kavindu@brightbytestudios.com",
		phoneNumber: "+94 70 918 4430",
		leadSource: "Cold Email",
		status: "Proposal Sent",
		dealValue: "64000.00",
		assignedSalespersonId: 1,
	},
	{
		leadName: "Nina Joseph",
		companyName: "Harbor Financial",
		email: "nina.joseph@harborfinancial.com",
		phoneNumber: "+94 75 663 7774",
		leadSource: "Website",
		status: "Won",
		dealValue: "175000.00",
		assignedSalespersonId: 1,
	},
	{
		leadName: "Imran Hassan",
		companyName: "GreenLine Manufacturing",
		email: "imran@greenline.lk",
		phoneNumber: "+94 74 229 6508",
		leadSource: "LinkedIn",
		status: "Lost",
		dealValue: "99000.00",
		assignedSalespersonId: 1,
	},
	{
		leadName: "Rashmi De Silva",
		companyName: "Crestwave Analytics",
		email: "rashmi@crestwave.io",
		phoneNumber: "+94 77 612 3408",
		leadSource: "Website",
		status: "New",
		dealValue: "118000.00",
		assignedSalespersonId: 1,
	},
	{
		leadName: "Tuan Rahman",
		companyName: "OrbitEdge Consulting",
		email: "tuan@orbitedge.com",
		phoneNumber: "+94 71 884 1195",
		leadSource: "Referral",
		status: "Contacted",
		dealValue: "94000.00",
		assignedSalespersonId: 1,
	},
	{
		leadName: "Sahana Raj",
		companyName: "CloudBridge Labs",
		email: "sahana@cloudbridgelabs.com",
		phoneNumber: "+94 76 331 7750",
		leadSource: "Cold Email",
		status: "Qualified",
		dealValue: "156500.00",
		assignedSalespersonId: 1,
	},
];

const noteSeeds: NoteSeed[] = [

	{
		leadEmail: "maya.fernando@northstarretail.com",
		content: "Interested in a demo next week. Follow up with pricing details and onboarding timeline.",
		createdBy: 1,
	},
	{
		leadEmail: "maya.fernando@northstarretail.com",
		content: "Shared a product deck and case study. Waiting for internal approval to move forward.",
		createdBy: 1,
	},
	{
		leadEmail: "daniel@bluepeaklogistics.io",
		content: "Confirmed budget range and requested a proposal for 50 users.",
		createdBy: 1,
	},
	{
		leadEmail: "ayesha@summithealth.lk",
		content: "Decision maker included in the next call. Procurement process should start after that.",
		createdBy: 1,
	},
	{
		leadEmail: "kavindu@brightbytestudios.com",
		content: "Proposal sent and follow-up scheduled for Friday afternoon.",
		createdBy: 1,
	},
	{
		leadEmail: "nina.joseph@harborfinancial.com",
		content: "Contract signed after legal review. Prepare handoff notes for onboarding.",
		createdBy: 1,
	},
	{
		leadEmail: "rashmi@crestwave.io",
		content: "Discovery call completed. Waiting on feedback from the finance team before sending a proposal.",
		createdBy: 1,
	},
	{
		leadEmail: "tuan@orbitedge.com",
		content: "Need to confirm implementation timeline and integration requirements.",
		createdBy: 1,
	},
	{
		leadEmail: "sahana@cloudbridgelabs.com",
		content: "Proposal shared today. Follow up next week with a simplified pricing summary.",
		createdBy: 1,
	},
];

async function seedSampleData() {
	await db.delete(notesTable);
	await db.delete(leadsTable);

	const insertedLeads = await db.insert(leadsTable).values(leadSeeds).returning({
		id: leadsTable.id,
		email: leadsTable.email,
	});

	const leadIdByEmail = new Map(insertedLeads.map((lead) => [lead.email, lead.id]));

	const notesToInsert = noteSeeds.map((note) => ({
		leadId: leadIdByEmail.get(note.leadEmail)!,
		content: note.content,
		createdBy: note.createdBy,
	}));

	await db.insert(notesTable).values(notesToInsert);

	console.log(`Inserted ${insertedLeads.length} leads and ${notesToInsert.length} notes.`);
}

seedSampleData().catch((error) => {
	console.error("Failed to seed sample lead and note data:", error);
	process.exitCode = 1;
});