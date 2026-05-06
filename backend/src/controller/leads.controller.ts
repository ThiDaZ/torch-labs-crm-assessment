import type { AuthRequest } from "../middlewares/requireAuth.ts";
import {
	createLeadService,
	deleteLeadService,
	getLeadByIdService,
	getLeadsService,
	updateLeadService,
} from "../services/leads.service.ts";
import type { Response } from "express";

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

export const getLeads = async (req: AuthRequest, res: Response) => {
	try {
		const leads = await getLeadsService();
		res.status(200).json({ leads });
	} catch (error) {
		res.status(500).json({ message: "Error fetching leads" });
	}
};

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
