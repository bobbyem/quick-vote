import express, { application } from "express";
import {
  addVote,
  createPoll,
  getAllPolls,
  getPoll,
} from "../controllers/pollController";
const router = express.Router();

router.get("/", getAllPolls);
router.get("/:id", getPoll);
router.post("/create", createPoll);
router.put("/vote/:id", addVote);

export default router;
