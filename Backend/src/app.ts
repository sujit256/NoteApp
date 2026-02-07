import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import notesRoutes from "./routes/notesRoutes";
import globalErrorHandler from "./middlewares/errorMiddleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

//routes
app.use("/api/notes", notesRoutes);

//globalerrorhandler
app.use(globalErrorHandler);

export default app;
