import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

export const POST = async (req) => {
  const { email } = await req.json();

  try {
    await connectToDB();
    const newAdmin = new Admin({
      email: email,
    });
    await newAdmin.save();

    return new Response(JSON.stringify(newAdmin), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new admin", { status: 500 });
  }
};
