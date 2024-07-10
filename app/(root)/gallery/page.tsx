"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import GalleryCard from "@/components/GalleryCard";

interface Post {
  title: string;
  username: string;
  cover: {
    url: string;
    public_id: string;
  };
}

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("api/gallery");
      const data = await response.json();
      console.log(data);
      setPosts(data.reverse());
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const newPostTitle = searchParams.get("newPostTitle") || "";
    const newPostUsername = searchParams.get("newPostUsername") || "";
    const newPostImageUrl = searchParams.get("newPostImageUrl") || "";
    const newPostImagePublicId = searchParams.get("newPostImagePublicId") || "";

    if (
      newPostTitle &&
      newPostUsername &&
      newPostImageUrl &&
      newPostImagePublicId
    ) {
      const newPost: Post = {
        title: newPostTitle,
        username: newPostUsername,
        cover: {
          url: newPostImageUrl,
          public_id: newPostImagePublicId,
        },
      };

      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [searchParams]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <section className=" flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <div className=" pt-[50px] w-full flex flex-col items-center bg-black-100 text-white-800 min-h-screen">
        <h1 className="text-4xl font-bold my-8 text-center">
          This projects are made by creators who learnt from my Tutorials
        </h1>
        <Link href="https://forms.gle/your-google-form-link" passHref>
          <button className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-4 rounded mb-8 active:scale-95">
            Upload your Project Image
          </button>
        </Link>
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          {posts.slice(0, visibleCount).map((post, index) => (
            <GalleryCard
              key={index}
              title={post.title}
              username={post.username}
              image={post.cover.url}
            />
          ))}
        </div>
        {visibleCount < posts.length && (
          <button
            onClick={handleLoadMore}
            className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-4 rounded my-8 active:scale-95"
          >
            Load More
          </button>
        )}
      </div>
    </section>
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
