"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchForm from "@/components/SearchForm";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const AllProjectsFeed = () => {
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);


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

  useEffect(() => {
    const fetchProjects = async () => {
      const category = searchParams.get("category") || "all";
      const query = searchParams.get("query") || "";
      const response = await fetch(
        `/api/project?category=${category}&query=${query}`
      );
      const data = await response.json();
      setProjects(data.reverse());
    };

    fetchProjects();
  }, [searchParams]);

  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "all";

  
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <section className=" flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <div className=" pt-[50px] w-full flex flex-col items-center bg-black-100 text-white-800 min-h-screen">
        <h1 className="text-xl font-bold my-7 text-center">
          {/* All Projects ✨ */}
        </h1>
        <SearchForm />
        <Filters />

        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
          {query === "" && category === "all" ? (
            <Header query={query} category="all" />
          ) : (
            <Header query={query} category={category} />
          )}
          <div className="mt-12 flex w-full flex-wrap justify-center gap-10 sm:gap-6">
            {projects?.length > 0 ? (

              projects.slice(0, visibleCount).map((project: any, index: number) => (
                <motion.div
                  key={project._id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <ProjectCard
                    key={project._id}
                    id={project._id}
                    title={project.title}
                    summary={project.summary}
                    content={project.content}
                    category={project.category}
                    imgUrl={project.thumbnail?.url}
                    youtubeLink={project.youtubelink}
                  />
                </motion.div>
              ))
            ) : (
              <p className="body-regular text-white-400">No projects found</p>
            )}
          </div>
          {visibleCount < projects.length && (
          <button
            onClick={handleLoadMore}
            className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-4 rounded my-8 active:scale-95"
          >
            Load More
          </button>
        )}
        </section>
      </div>
    </section>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllProjectsFeed />
    </Suspense>
  );
};

export default page;
