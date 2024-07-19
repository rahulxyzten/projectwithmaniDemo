import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Deleting project data from databse
    await Admin.deleteOne({ _id: params.id });

    return new Response("Admin deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting admin", { status: 500 });
  }
};
