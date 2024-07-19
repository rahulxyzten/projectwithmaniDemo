import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

export const POST = async (req) => {
  const { categoryName } = await req.json();

  try {
    await connectToDB();
    const newCategory = new Category({
      categoryName: categoryName,
    });
    await newCategory.save();

    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new category", { status: 500 });
  }
};
