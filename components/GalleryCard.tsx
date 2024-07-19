import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface GalleryCardProps {
  id: string;
  title: string;
  username: string;
  image: string;
  handlePostDelete: (id: string) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  id,
  title,
  username,
  image,
  handlePostDelete,
}) => {
  const { data: session } = useSession();

  return (
    <div className="w-ful p-3 sm:w-[310px] sm:p-5">
      <div className="flex flex-col">
        <div className="relative overflow-hidden h-[150px] w-full rounded-md hover:drop-shadow-3xl">
          <Image
            src={image}
            className="rounded-t-lg !bg-transparent object-cover transition-transform duration-1000 ease-in-out transform hover:scale-105 "
            width={400}
            height={400}
            alt="thumbnail"
          />
        </div>
        <div className="flex-col justify-center items-center">
          <h3 className="text-2xl text-center font-semibold leading-none tracking-tight body-semibold line-clamp-2 w-full pt-2 text-white">
            {title}
          </h3>
          <p className="text-center text-gradient_purple-blue body-semibold gap-1.5">
            Made by: {username}
          </p>
        </div>
        {session?.user.isAdmin && (
          <div className="pt-2 flex flex-col justify-center items-center">
            <button
              onClick={() => handlePostDelete(id)}
              className="delete-button"
            >
              <svg className="delete-svgIcon" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryCard;
