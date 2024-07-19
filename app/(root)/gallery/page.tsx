"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GalleryCard from "@/components/GalleryCard";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const page = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const fetchProjects = async () => {
    const response = await fetch("api/gallery", {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    const data = await response.json();
    setPosts(data.reverse());
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const handlePostDelete = async (id: string) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/gallery/${id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast("😔 Post deleted successfully");
          const filteredPosts = posts.filter((p) => p._id !== id);
          setPosts(filteredPosts);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
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
            <motion.div
              key={post._id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <GalleryCard
                key={index}
                id={post._id}
                title={post.title}
                username={post.username}
                image={post.cover.url}
                handlePostDelete={() => handlePostDelete(post._id)}
              />
            </motion.div>
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
