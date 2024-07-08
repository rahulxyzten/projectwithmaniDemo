import { Schema, model, models } from "mongoose";

const GallerySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  cover: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;
