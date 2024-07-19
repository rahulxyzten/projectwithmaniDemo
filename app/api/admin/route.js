import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

export const GET = async (request) => {
  try {
    await connectToDB();

    const admins = await Admin.find({});

    return new Response(JSON.stringify(admins), {
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
    return new Response("Failed to fetch all admins", { status: 500 });
  }
};
