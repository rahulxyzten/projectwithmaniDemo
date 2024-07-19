import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  _id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  projectPrice: string;
  thumbnail: {
    url: string;
  };
  youtubelink: string;
  sourceCodelink: string;
}

interface RelatedProjectProps {
  relatedProjects: Project[];
  projectId: string | null;
}

const RelatedProject: React.FC<RelatedProjectProps> = ({
  relatedProjects,
  projectId,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(3);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <>
      <div className="flex 2xl:hidden mx-5 flex-col justify-start mb-4">
        <h2 className="text-xl sm:ml-11 md:ml-16 xl:ml-36 sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
          Related Projects:-
        </h2>
        <div className="flex mt-6 flex-col items-center justify-center gap-2">
          <Carousel
            setApi={setApi}
            orientation="horizontal"
            className="max-w-md sm:max-w-lg lg:max-w-4xl"
          >
            <CarouselContent>
              {relatedProjects?.length > 1 ? (
                relatedProjects
                  .filter(
                    (relatedProject: any) => relatedProject._id !== projectId
                  )
                  .slice(0, 3)
                  .map((project: any) => (
                    <CarouselItem className="lg:basis-1/2 flex items-center justify-center">
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
                    </CarouselItem>
                  ))
              ) : (
                <CarouselItem>
                  <p className="body-regular text-white-400">
                    No related projects found
                  </p>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="text-white" />
            <CarouselNext className="text-white" />
          </Carousel>
          <div className="py-2 lg:hidden text-white text-center text-sm">
            project {current} of {count}
          </div>
        </div>
      </div>

      <div className="hidden 2xl:block mx-5 flex-col justify-start mb-4">
        <h2 className="text-xl sm:ml-11 md:ml-16 xl:ml-36 sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
          Related Projects:-
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {relatedProjects?.length > 1 ? (
            relatedProjects
              .filter((relatedProject: any) => relatedProject._id !== projectId)
              .slice(0, 3)
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
            <p className="body-regular text-white-400">
              No related projects found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RelatedProject;
