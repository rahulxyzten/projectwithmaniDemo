"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PostForm from "@/components/PostForm";

interface Post {
  title: string;
  username: string;
  cover: File;
}

interface Props {
  type: string;
  post: Post;
  setPost: (post: Post) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    username: "",
    cover: {} as File,
  });

  useEffect(() => {
    // Redirect if not an admin
    if (!session?.user?.isAdmin) {
      router.push("/");
      return;
    }
  }, [session, router]);

  const createPost = async (e: FormEvent) => {
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
      data.append("file", post.cover);
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

        const response = await fetch("/api/gallery/new", {
          method: "POST",
          body: JSON.stringify({
            title: post.title,
            username: post.username,
            cover: {
              public_id: imagePublicId,
              url: imageUrl,
            },
          }),
        });

        if (response.ok) {
          router.push("/gallery");
          router.refresh();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PostForm
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default page;
