import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  upvoters: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
