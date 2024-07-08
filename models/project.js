import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  summary: {
    type: String,
    required: [true, "Summary is required."],
  },
  content: {
    type: String,
    required: [true, "Content is required."],
  },
  category: {
    type: String,
    required: [true, "Category is required."],
  },
  projectPrice: {
    type: String,
    required: [true, "Category is required."],
  },
  thumbnail: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  youtubelink: {
    type: String,
    required: [true, "Youtube Link is required."],
  },
  sourceCodelink: {
    type: String,
    required: [true, "Youtube Link is required."],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
