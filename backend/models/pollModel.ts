import mongoose, { Schema } from "mongoose";

const pollSchema = new Schema(
  {
    pollInfo: {
      question: String,
      options: [String],
    },
    votes: [Number],
  },
  { timestamps: true, expireAfterSeconds: 86400 }
);

export const Poll = mongoose.model("Poll", pollSchema);
