import type { Request, Response } from "express";
import { loginService } from "../services/auth.service.ts";

export const login = async (req: Request, res: Response) => {
	try {
		const token = await loginService(req.body);
		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		if (error instanceof Error) {
			res.status(401).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};
