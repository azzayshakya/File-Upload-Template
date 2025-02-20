import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", uploadRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

