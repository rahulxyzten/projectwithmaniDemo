import { connectToDB } from "@/utils/database";
import Project from "@/models/project";
import cloudinary from "@/utils/cloudinary";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const project = await Project.findById(params.id);
    if (!project) return new Response("project not found", { status: 404 });

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the project", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const {
    title,
    summary,
    content,
    category,
    projectPrice,
    thumbnail,
    youtubelink,
    sourceCodelink,
  } = await req.json();

  try {
    await connectToDB();

    const existingProject = await Project.findById(params.id);

    if (!existingProject) {
      return new Response("Project not found", { status: 404 });
    } else {
      existingProject.title = title;
      existingProject.summary = summary;
      existingProject.content = content;
      existingProject.category = category;
      existingProject.projectPrice = projectPrice;
      existingProject.youtubelink = youtubelink;
      existingProject.sourceCodelink = sourceCodelink;
    }

    if (thumbnail.public_id) {
      const imgId = existingProject.thumbnail.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
      existingProject.thumbnail.public_id = thumbnail.public_id;
      existingProject.thumbnail.url = thumbnail.url;
    }

    await existingProject.save();

    return new Response(JSON.stringify(existingProject), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const projectData = await Project.findById(params.id);

    // Deleting image from cloudinary
    const imgId = projectData.thumbnail.public_id;
    await cloudinary.uploader.destroy(imgId);

    // Deleting project data from databse
    await Project.deleteOne({ _id: params.id });

    return new Response("Project deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting project", { status: 500 });
  }
};
