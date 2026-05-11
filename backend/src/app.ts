import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.ts";
import leadsRouter from "./routes/leads.routes.ts";
import noteRouter from "./routes/note.routes.ts";
import dashboardRouter from "./routes/dashboard.routes.ts";
import userRouter from "./routes/user.routes.ts";
import 'dotenv/config'

const app: express.Application = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
    // CRITICAL: Must be true to allow Next.js proxy to read the JWT cookie
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	}),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/note", noteRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/users", userRouter);

export default app;
