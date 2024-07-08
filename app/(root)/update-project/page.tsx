"use client";

import React, { useState, useEffect, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [project, setProject] = useState({
    title: "",
    summary: "",
    category: "",
    projectPrice: 0,
    content: "",
    thumbnail: {} as File,
    youtubelink: "",
    sourceCodelink: "",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();
      setProject({
        title: data.title,
        summary: data.summary,
        category: data.category,
        projectPrice: data.projectPrice,
        content: data.content,
        thumbnail: {} as File,
        youtubelink: data.youtubelink,
        sourceCodelink: data.sourceCodelink,
      });
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const updateProject = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    let imagePublicId = "";
    let imageUrl = "";

    try {
      if (project.thumbnail && (project.thumbnail as File).size > 0) {
        const presetKey = process.env.NEXT_PUBLIC_PRESET_KEY;
        const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

        if (!presetKey || !cloudName) {
          console.error("Cloudinary configuration is missing.");
          setSubmitting(false);
          return;
        }
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

          imagePublicId = resData.public_id;
          imageUrl = resData.secure_url;
        }
      }

      const response = await fetch(`/api/project/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: project.title,
          summary: project.summary,
          content: project.content,
          category: project.category,
          projectPrice: project.projectPrice,
          thumbnail: {
            public_id: imagePublicId,
            url: imageUrl,
          },
          youtubelink: project.youtubelink,
          sourceCodelink: project.sourceCodelink,
        }),
      });

      if (response.ok) {
        router.push(`/blog?id=${projectId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="update"
      project={project}
      setProject={setProject}
      submitting={submitting}
      handleSubmit={updateProject}
    />
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default page;
