import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
	user?: {
		userId: number;
		email: string;
	};
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {

	const token = req.cookies.token;

	if (!token || token === "undefined") {
		return res.status(401).json({ error: "Unauthorized" });
	}

	if (!JWT_SECRET) {
		console.error("Warning: JWT_SECRET is not defined in environment variables.");
		return res.status(500).json({ error: "Internal server error" });
	}

	// Verify token and extract user info
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: number; email: string };
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Unauthorized" });
	}
};
