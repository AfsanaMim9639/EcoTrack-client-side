import express from "express";
import Challenge from "../models/Challenge.js";
import UserChallenge from "../models/UserChallenge.js"; // We'll define this soon
// import authMiddleware from "../middleware/authMiddleware.js"; // if you add authentication later

const router = express.Router();

/* -------------------------------------------------------
   🟢 1. GET /api/challenges — list all challenges (with optional filters)
-------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const challenges = await Challenge.find(filter);
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------------------------------------
   🟢 2. GET /api/challenges/:id — get details
-------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: "Challenge not found" });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------------------------------------
   🟢 3. POST /api/challenges — create new challenge (admin)
-------------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------------------------------------------------------
   🟢 4. PATCH /api/challenges/:id — update (admin/owner)
-------------------------------------------------------- */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Challenge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Challenge not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------------------------------------------------------
   🟢 5. DELETE /api/challenges/:id — delete (admin/owner)
-------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Challenge.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Challenge not found" });
    res.json({ message: "Challenge deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------------------------------------
   🟢 6. POST /api/challenges/join/:id — join challenge
-------------------------------------------------------- */
router.post("/join/:id", async (req, res) => {
  try {
    const { userId } = req.body; // frontend must send userId in body
    const challengeId = req.params.id;

    // Check if challenge exists
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return res.status(404).json({ message: "Challenge not found" });

    // Check if user already joined
    const existing = await UserChallenge.findOne({ userId, challengeId });
    if (existing) return res.status(400).json({ message: "Already joined" });

    // Add to UserChallenge collection
    const userChallenge = new UserChallenge({
      userId,
      challengeId,
      status: "Ongoing",
      progress: 0,
      joinDate: new Date(),
    });
    await userChallenge.save();

    // Increment participant count
    challenge.participants += 1;
    await challenge.save();

    res.status(201).json({
      message: "Joined challenge successfully!",
      userChallenge,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
