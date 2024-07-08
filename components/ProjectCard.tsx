import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imgUrl: string;
  youtubeLink: string;
}

const ProjectCard = ({
  id,
  title,
  summary,
  content,
  category,
  imgUrl,
  youtubeLink,
}: Props) => {
  const router = useRouter();

  const handleBlog = async () => {
    router.push(`/blog?id=${id}`);
  };

  return (
    <div className="text-slate-950 shadow-sm w-full rounded-[10px] border border-black-400 bg-black-200/80 p-3 shadow-video-card sm:w-[410px] sm:p-5 hover:drop-shadow-3xl">
      <div className="flex flex-col space-y-1.5 p-0 cursor-pointer">
        <div className="relative h-[170px] w-full rounded-md xs:h-[220px] sm:h-[205px] overflow-hidden">
          <Image
            onClick={handleBlog}
            src={imgUrl}
            className="rounded-t-lg !bg-transparent object-cover transition-transform duration-1000 ease-in-out transform hover:scale-105"
            width={400}
            height={400}
            alt="thumbnail"
          />
        </div>
        <h3
          onClick={handleBlog}
          className="text-2xl font-semibold leading-none tracking-tight body-semibold line-clamp-2 w-full pt-5 text-left text-white"
        >
          {title}
        </h3>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 p-0">
        <p className="body-medium capitalize text-white-500">{category}</p>
        <p
          onClick={handleBlog}
          className="flex-center cursor-pointer text-gradient_purple-blue body-semibold gap-1.5"
        >
          Read More
          <Image
            src="/arrow-blue.svg"
            className="rounded-t-lg !bg-transparent object-cover"
            width={13}
            height={0}
            alt="arrow"
          />
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
