import { connectToDB } from "@/utils/database";
import Gallery from "@/models/gallery";
import cloudinary from "@/utils/cloudinary";

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const postData = await Gallery.findById(params.id);

    // Deleting image from cloudinary
    const imgId = postData.cover.public_id;
    await cloudinary.uploader.destroy(imgId);

    // Deleting project data from databse
    await Gallery.deleteOne({ _id: params.id });

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting post", { status: 500 });
  }
};
