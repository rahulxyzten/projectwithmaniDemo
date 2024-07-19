import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  categoryName: {
    type: String,
    unique: [true, "Category already exists!"],
    required: [true, "Category is required!"],
  },
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
