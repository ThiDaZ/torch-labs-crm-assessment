import type { Request, Response } from "express";
import { loginService } from "../services/auth.service.ts";
import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import type { AuthRequest } from "../middlewares/requireAuth.ts";

// Login Controller
export const login = async (req: Request, res: Response) => {
	try {
		const token = await loginService(req.body);

		res.cookie('token', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/',
			maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
		})

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		if (error instanceof Error) {
			res.status(401).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

// Get Current User Controller
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
	try {
		if (!req.user) return res.status(401).json({ error: "Unauthorized" });

		const userId = req.user.userId;
		const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1 as any);
		if (!user) return res.status(404).json({ error: "User not found" });

		res.status(200).json({ user: { id: user.id, name: user.name, email: user.email } });
	} catch (error) {
		res.status(500).json({ error: "Error fetching user" });
	}
};

// Logout Controller (clear the auth cookie)
export const logout = async (req: Request, res: Response) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			path: "/",
		});
		res.status(200).json({ message: "Logged out" });
	} catch (error) {
		res.status(500).json({ error: "Error during logout" });
	}
};
