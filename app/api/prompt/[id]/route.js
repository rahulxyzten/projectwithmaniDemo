import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
  const { searchParams } = new URL(request.url);
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompts", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { searchParams } = new URL(request.url);
  const { prompt, description, tag, upvote, userid } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    if (upvote !== undefined) {
      if (upvote) {
        if (!existingPrompt.upvoters.includes(userid)) {
          existingPrompt.upvoters.push(userid);
          existingPrompt.upvotes += 1;
        }
      } else {
        const index = existingPrompt.upvoters.indexOf(userid);
        if (index !== -1) {
          existingPrompt.upvoters.splice(index, 1);
          existingPrompt.upvotes -= 1;
        }
      }
    } else {
      existingPrompt.prompt = prompt;
      existingPrompt.description = description;
      existingPrompt.tag = tag;
    }

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
