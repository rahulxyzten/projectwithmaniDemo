import React from "react";
import Image from "next/image";

interface GalleryCardProps {
  title: string;
  username: string;
  image: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  title,
  username,
  image,
}) => {
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
      </div>
    </div>
  );
};

export default GalleryCard;
