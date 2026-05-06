import express from "express";
import authRouter from "./routes/auth.routes.ts";
import leadsRouter from "./routes/leads.routes.ts";

const app: express.Application = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);


export default app;
