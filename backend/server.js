import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, MONGO_URI } from "./config.js";

// Import your route files
import challengeRoutes from "./routes/challengeRoutes.js";
import userChallengeRoutes from "./routes/userChallengeRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Use API routes
app.use("/api/challenges", challengeRoutes);
app.use("/api/userChallenges", userChallengeRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
