import { connectToDB } from "@/utils/database";
import Gallery from "@/models/gallery";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);

  try {
    await connectToDB();

    const galleryProjects = await Gallery.find({});

    return new Response(JSON.stringify(galleryProjects), {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch all gallery Projects", {
      status: 500,
    });
  }
};
