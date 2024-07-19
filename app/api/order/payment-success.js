import { getSession } from "next-auth/react";
import { db } from "@/utils/database";
import { Youtube } from "lucide-react";
import { finished } from "stream";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST" && session) {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, projectId } = req.body;

    // Verify payment and then fetch the Google Drive link
    const driveLink = await fetchDriveLink(projectId);

    // Optionally save payment details to database
    // await db.collection('payments').insertOne({ razorpay_payment_id, razorpay_order_id, razorpay_signature, driveLink, user: session.user.email });

    res.status(200).json({ driveLink });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

async function fetchDriveLink(projectId) {
  // Fetch the Google Drive link from your database or any storage service
  const project = await db.collection('projects').findOne({ _id: projectId });
  return project.sourceCodelink;
}