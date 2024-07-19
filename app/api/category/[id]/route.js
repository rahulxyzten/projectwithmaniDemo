import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Deleting project data from databse
    await Category.deleteOne({ _id: params.id });

    return new Response("Category deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting category", { status: 500 });
  }
};
