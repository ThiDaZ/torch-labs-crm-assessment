import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Login Service
export const loginService = async (loginData: { email: string; password: string }) => {
	if (!loginData.email || !loginData.password) {
		throw new Error("Email and password are required");
	}

	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, loginData.email))
		.limit(1);

	if (!user) {
		throw new Error("Invalid email or password");
	}

	const isMatch = await bcrypt.compare(loginData.password, user.passwordHash);

	if (!isMatch) {
		throw new Error("Invalid email or password");
	}

	const secret = process.env.JWT_SECRET;
	if (!secret) {
		console.error("Warning: JWT_SECRET is not defined in environment variables.");
		throw new Error("Internal server configuration error");
	}
	const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: "1d" });
	return token;
};
