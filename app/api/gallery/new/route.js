import { connectToDB } from "@/utils/database";
import Gallery from "@/models/gallery";

export const POST = async (req) => {
  const { title, username, cover } = await req.json();

  try {
    await connectToDB();
    const newPost = new Gallery({
      title,
      username,
      cover: {
        public_id: cover.public_id,
        url: cover.url,
      },
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {
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
    return new Response("Failed to create a new project", { status: 500 });
  }
};
