import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.ts";
import leadsRouter from "./routes/leads.routes.ts";
import noteRouter from "./routes/note.routes.ts";
import dashboardRouter from "./routes/dashboard.routes.ts";

const app: express.Application = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	}),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/note", noteRouter);
app.use("/api/dashboard", dashboardRouter);

export default app;
