import { connectToDB } from "@/utils/database";
import Project from "@/models/project";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("query");

  try {
    await connectToDB();

    const filter = {};
    if (category && category !== "all") filter.category = category;
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    const projects = await Project.find(filter);

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all projects", { status: 500 });
  }
};
