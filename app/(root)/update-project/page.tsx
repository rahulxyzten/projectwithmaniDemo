"use client";

import React, { useState, useEffect, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";

const PageContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
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

    const getProjectDetails = async () => {
      try {
        const response = await fetch(`/api/project/${projectId}`);
        const data = await response.json();
        const savedProject = JSON.parse(
          localStorage.getItem(`project_${projectId}`) || "{}"
        );

        setProject({
          title: savedProject.title || data.title,
          summary: savedProject.summary || data.summary,
          category: savedProject.category || data.category,
          content: savedProject.content || data.content,
          projectPrice: savedProject.projectPrice || data.projectPrice,
          projectDiscount: savedProject.projectDiscount || data.projectDiscount,
          razorpaylink: savedProject.razorpaylink || data.razorpaylink,
          thumbnail: {} as File,
          youtubelink: savedProject.youtubelink || data.youtubelink,
          sourceCodelink: savedProject.sourceCodelink || data.sourceCodelink,
        });
        setLoading(false); // Set loading to false after data is set
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    if (projectId) {
      getProjectDetails();
    }
  }, [projectId, session, router]);

  useEffect(() => {
    if (projectId) {
      localStorage.setItem(`project_${projectId}`, JSON.stringify(project));
    }
  }, [project, projectId]);

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
        router.push(`/blog?id=${projectId}`);
        localStorage.removeItem(`project_${projectId}`);
      }
    } catch (error) {
      console.log("Update project error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while fetching data
  }

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
