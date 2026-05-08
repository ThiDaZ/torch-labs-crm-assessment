import type { AuthRequest } from "../middlewares/requireAuth.ts";
import {
	changeLeadStatusService,
	createLeadService,
	deleteLeadService,
	getLeadByIdService,
	getLeadsService,
	searchLeadsService,
	updateLeadService,
} from "../services/leads.service.ts";
import type { Response } from "express";
import { SearchSchema } from "../schema/index.ts";

// Create new Lead API
export const createLead = async (req: AuthRequest, res: Response) => {
	try {
		const leadData = req.body;

		if (!leadData) {
			res.status(400).json({ message: "Request body is empty" });
			return;
		}

		const result = await createLeadService(leadData);
		res.status(201).json({ message: "Lead created successfully", lead: result });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: "Error creating lead" });
		}
	}
};
 
// Get all leads API
export const getLeads = async (req: AuthRequest, res: Response) => {
	try {
		const leads = await getLeadsService();
		res.status(200).json({ leads });
	} catch (error) {
		res.status(500).json({ message: "Error fetching leads" });
	}
};

// Get lead by ID API
export const getLeadById = async (req: AuthRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (isNaN(id)) {
			res.status(400).json({ message: "Invalid lead ID" });
			return;
		}

		const lead = await getLeadByIdService(id);
		if (!lead || lead.length === 0) {
			res.status(404).json({ message: "Lead not found" });
			return;
		}
		res.status(200).json({ lead: lead[0] });
	} catch (error) {
		res.status(500).json({ message: "Error fetching lead" });
	}
};

// Update lead API
export const updateLead = async (req: AuthRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (isNaN(id)) {
			res.status(400).json({ message: "Invalid lead ID" });
			return;
		}

		const leadData = req.body;
		const result = await updateLeadService(id, leadData);
		res.status(200).json({ message: "Lead updated successfully", lead: result[0] });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: "Error updating lead" });
		}
	}
};

// Delete lead API
export const deleteLead = async (req: AuthRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (isNaN(id)) {
			res.status(400).json({ message: "Invalid lead ID" });
			return;
		}

		await deleteLeadService(id);
		res.status(200).json({ message: "Lead deleted successfully" });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: "Error deleting lead" });
		}
	}
};

// Change lead status API
export const changeLeadStatus = async (req: AuthRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (isNaN(id)) {
			res.status(400).json({ message: "Invalid lead ID" });
			return;
		}

		const { status } = req.body;
		if (!status) {
			res.status(400).json({ message: "Status is required" });
			return;
		}

		const validStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];
		if (!validStatuses.includes(status)) {
			res.status(400).json({ message: "Invalid status value" });
			return;
		}

		const result = await changeLeadStatusService(id, status);
		res.status(200).json({ message: "Lead status updated successfully", lead: result[0] });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: "Error updating lead status" });
		}
	}
};

// Search leads API
export const searchLeads = async (req: AuthRequest, res: Response) => {
  console.log("Search query parameters:", req.query); 
	try{
		const result = SearchSchema.safeParse(req.query);
		if (!result.success) {
			res.status(400).json({ message: "Invalid query parameters", errors: result.error });
			return;
		}
		const { query, status, source, salePerson, order } = result.data;

		const leads = await searchLeadsService(query, status, source, salePerson, order);
		res.status(200).json({ leads });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: "Error searching leads" });
		}
	}
};
