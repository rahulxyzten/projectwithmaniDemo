import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

export const GET = async (request) => {
  try {
    await connectToDB();

    const admins = await Admin.find({});

    return new Response(JSON.stringify(admins), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all admins", { status: 500 });
  }
};
