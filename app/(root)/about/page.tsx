import React from "react";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";

const page = () => {
  return (
    <section className="pt-[130px] flex w-full flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-white-800 pb-7">
        About us 
      </h1>

      <div className="flex flex-col items-center ">
        <Image
          src="/mani.jpg"
          className="rounded-full !bg-transparent object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
          width={350}
          height={350}
          alt="Kotini Mani Kanta"
        />
        <h2 className="text-2xl font-semibold text-center text-gradient_blue-purple mt-4">
          Kotini Mani Kanta
        </h2>
      </div>

      <p className="mt-4 max-w-3xl text-center text-white px-4">
        I am an electronics enthusiast with a B.Tech in Electronics and
        Communication Engineering. Driven by my passion for technology, I share
        my knowledge and experiences through my YouTube channel. Regardless of
        the outcome, I am committed to consistently creating valuable content on
        YouTube. Additionally, I offer readymade projects for students tailored
        to their requirements at affordable and competitive prices.
      </p>

      <p className="mt-4 max-w-3xl text-center text-white px-4">
        Connect with me:
      </p>

      <div className="flex mt-6 space-x-4">
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-500"
        >
          <FaTwitter size={30} />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-700"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-600"
        >
          <FaYoutube size={30} />
        </a>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-700"
        >
          <FaGithub size={30} />
        </a>
      </div>

      <div className="py-12"></div>
    </section>
  );
};

export default page;
