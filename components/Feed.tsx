"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "./SearchForm";
import Filters from "./Filters";
import Header from "./Header";
import ProjectCard from "./ProjectCard";

const Feed = () => {
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<any[]>([]);

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

  return (
    <>
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white">
            Projects With Mani
          </h1>
        </div>
        <SearchForm />
      </section>
      <Filters />

      <section className="flex-center mt-6 w-full flex-col sm:mt-20">
        {query === "" && category === "all" ? (
          <Header query={query} category="all" />
        ) : (
          <Header query={query} category={category} />
        )}
        <div className="mt-12 flex w-full flex-wrap justify-center gap-10 sm:justify-start">
          {projects?.length > 0 ? (
            projects
              .slice(0, 6)
              .map((project: any) => (
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
              ))
          ) : (
            <p className="body-regular text-white-400">No projects found</p>
          )}
        </div>
        {projects.length >= 6 && (
          <ul className="body-regular text-white-400 mt-6">
            <Link
              href={{ pathname: "/tutorials", query: { category: category } }}
            >
              Click her to view more Projects
            </Link>
          </ul>
        )}
        <div className="mt-12 flex flex-col items-center">
          <Image
            className="mb-4"
            src="/contact.png"
            alt="logo"
            width={500}
            height={500}
          />

          <a
            href="mailto:your-email@example.com"
            className="text-white hover:underline text-center text-lg"
          >
            Contact us via email for Any queries : email@gmail.com
          </a>
        </div>
      </section>
    </>
  );
};

export default Feed;
