"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

const PageContent = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [project, setProject] = useState({
    title: "",
    projectPrice: 0,
    projectDiscount: 0,
    razorpaylink: "",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();
      setProject({
        title: data.title,
        projectPrice: data.projectPrice,
        projectDiscount: data.projectDiscount,
        razorpaylink: data.razorpaylink,
      });
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const finalPrice = Math.floor(
    project.projectPrice -
      (project.projectPrice * project.projectDiscount) / 100
  );

  return (
    <section className="pt-[130px] flex w-full flex-col items-center px-6">
      <h1 className="text-3xl sm:text-4xl mb-4 font-bold text-center text-white-800 py-5">
        Purchase Your Project Now!
      </h1>
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gradient_purple-blue py-5 max-w-screen-xl">
        {project.title}
      </h1>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white-800 py-5">
        ₹{project.projectPrice}/-
      </h1>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white-800 py-5">
        {project.projectDiscount}%
      </h1>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white-800 py-5">
        ₹{finalPrice}/-
      </h1>

      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <Image
          src="/qr.jpg"
          className="!bg-transparent object-cover rounded-md"
          width={300}
          height={300}
          alt="QR Code for Payment"
        />
        <h2 className="text-2xl font-semibold text-center text-gradient_blue-purple mt-4">
          Scan to Pay - Kotini Mani Kanta
        </h2>
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className=" text-white font-bold mt-4">--or pay with--</p>
        <Link target="_blank" href={project.razorpaylink}>
          <button className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-4 rounded active:scale-95 flex items-center justify-center gap-2">
            <p>Razorpay</p>
            <SiRazorpay />
          </button>
        </Link>
      </div>

      <p className="mt-8 max-w-3xl text-center text-white-800 px-4">
        Your purchase supports continuous valuable content creation and
        innovation. Join our community and get access to quality projects that
        can help you succeed.
      </p>

      <p className="mt-4 max-w-3xl text-center text-white-800 px-4">
        Connect with me:
      </p>

      <div className="flex mt-4 space-x-4">
        <Link
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-500"
        >
          <FaTwitter size={30} />
        </Link>
        <Link
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-700"
        >
          <FaLinkedin size={30} />
        </Link>
        <Link
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-600"
        >
          <FaYoutube size={30} />
        </Link>
        <Link
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-700"
        >
          <FaGithub size={30} />
        </Link>
      </div>

      <div className="py-12"></div>
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
