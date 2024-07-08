"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GalleryCard from "@/components/GalleryCard";

const page = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("api/gallery");
      const data = await response.json();
      setPosts(data.reverse());
    };

    fetchProjects();
  }, []);

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

export default page;
