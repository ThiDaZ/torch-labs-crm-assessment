import type { Response } from "express";
import type { AuthRequest } from "../middlewares/requireAuth.ts";
import { getAllUsersService } from "../services/user.service.ts";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
	const users = await getAllUsersService();

	if (!users || users.length === 0) {
		return res.status(404).json({ message: "No users found" });
	}

	res.status(200).json(users);
};
