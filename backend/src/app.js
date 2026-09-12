import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import learningPathRoutes from "./routes/learningPathRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/contacts", contactRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/learning-paths", learningPathRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/instructors", instructorRoutes);

export default app;