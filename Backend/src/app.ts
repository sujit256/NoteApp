import express from "express";
import dotenv from "dotenv";

dotenv.config();

import notesRoutes from "./routes/notesRoutes";

const app = express();

app.use(express.json());

//routes
app.use("/api/notes", notesRoutes);

export default app;
