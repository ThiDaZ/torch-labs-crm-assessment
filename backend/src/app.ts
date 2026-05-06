import express from "express";
import authRouter from "./routes/auth.routes.ts";

const app: express.Application = express();

app.use(express.json());

app.use("/api/auth", authRouter);


export default app;
