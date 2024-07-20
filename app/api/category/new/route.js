import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

export const POST = async (req) => {
  const { searchParams } = new URL(req.url);
  const { categoryName } = await req.json();

  try {
    await connectToDB();
    const newCategory = new Category({
      categoryName: categoryName,
    });
    await newCategory.save();

    return new Response(JSON.stringify(newCategory), {
      status: 201,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response("Failed to create a new category", { status: 500 });
  }
};
