"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";

interface Project {
  title: string;
  summary: string;
  category: string;
  content: string;
  projectPrice: number;
  projectDiscount: number;
  razorpaylink: string;
  thumbnail: File;
  youtubelink: string;
  sourceCodelink: string;
}

interface Props {
  type: string;
  project: Project;
  setProject: (project: Project) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [project, setProject] = useState({
    title: "",
    summary: "",
    category: "",
    content: "",
    projectPrice: 0,
    projectDiscount: 0,
    razorpaylink: "",
    thumbnail: {} as File,
    youtubelink: "",
    sourceCodelink: "",
  });

  useEffect(() => {
    // Redirect if not an admin
    if (!session?.user?.isAdmin) {
      router.push("/");
      return;
    }
  }, [session, router]);

  const createProject = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const presetKey = process.env.NEXT_PUBLIC_PRESET_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    if (!presetKey || !cloudName) {
      console.error("Cloudinary configuration is missing.");
      setSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", project.thumbnail);
      data.append("upload_preset", presetKey);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (cloudRes) {
        const resData = await cloudRes.json();

        const imagePublicId = resData.public_id;
        const imageUrl = resData.secure_url;

        const response = await fetch("/api/project/new", {
          method: "POST",
          body: JSON.stringify({
            title: project.title,
            summary: project.summary,
            category: project.category,
            content: project.content,
            projectPrice: project.projectPrice,
            projectDiscount: project.projectDiscount,
            razorpaylink: project.razorpaylink,
            thumbnail: {
              public_id: imagePublicId,
              url: imageUrl,
            },
            youtubelink: project.youtubelink,
            sourceCodelink: project.sourceCodelink,
          }),
        });

        if (response.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      project={project}
      setProject={setProject}
      submitting={submitting}
      handleSubmit={createProject}
    />
  );
};

export default page;
