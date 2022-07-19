import asyncHandler from "express-async-handler";
import { Poll } from "../models/pollModel";

//@desc Get all Polls
//@route GET /api/polls
//@access Public
const getAllPolls = asyncHandler(async (req, res) => {
  const polls = await Poll.find();
  res.status(200).json(polls);
});

//@desc Get Poll by Id
//@route GET /api/poll
//@access Public
const getPoll = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Missing ID" });
    return;
  }
  const poll = await Poll.findById(req.params.id);
  res.status(200).json(poll);
});

//@desc Create Pool
//@route GET /api/polls/create
//@access Public
const createPoll = asyncHandler(async (req, res) => {
  if (!req.body.creator || !req.body.pollInfo) {
    res.status(400).json({ message: "MISSING DATA" });
    return;
  }
  const poll = await Poll.create({
    creator: req.body.creator,
    pollInfo: req.body.pollInfo,
    votes: [],
  });
  res.status(200).json(poll);
});

//@desc Add a Pool vote
//@route GET /api/polls/vote
//@access Public
const addVote = asyncHandler(async (req, res) => {
  console.log(req.params);

  if (!req.params.id || !req.body.vote) {
    res.status(400).json({ message: "MISSING DATA" });
    return;
  }
  const poll = await Poll.findByIdAndUpdate(req.params.id, {
    $push: { votes: req.body.vote },
  });
  res.status(200).json({ message: "Your vote was added" });
});

export { getAllPolls, getPoll, createPoll, addVote };