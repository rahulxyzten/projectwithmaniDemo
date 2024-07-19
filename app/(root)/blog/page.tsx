"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaDownload } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import RelatedProject from "@/components/RelatedProject";
import { toast } from "react-toastify";

//payment gateway
// const handlePayment = async (amount, projectId) => {
//   const res = await fetch("/api/order/create-order", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ amount, currency: "INR" }),
//   });

//   const data = await res.json();

//   const options = {
//     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     amount: data.amount,
//     currency: data.currency,
//     name: "Project With Mani",
//     description: "Buy Code",
//     order_id: data.id,
//     handler: async (response) => {
//       // Handle successful payment here
//       console.log(response);
//       // Redirect to success page or show Google Drive link
//       const successResponse = await fetch(`/api/payment-success`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_signature: response.razorpay_signature,
//           projectId,
//         }),
//       });

//       const successData = await successResponse.json();
//       alert(`Your Google Drive link: ${successData.driveLink}`);
//     },
//     prefill: {
//       name: "Your Name",
//       email: "your.email@example.com",
//       contact: "9999999999",
//     },
//     theme: {
//       color: "#F37254",
//     },
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.open();
// };

const getYouTubeID = (url: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

interface Project {
  id: string;
  title: string;
  summary: string;
  category: string;
  content: string;
  projectPrice: number;
  projectDiscount: number;
  razorpaylink: string;
  thumbnailUrl: string;
  youtubelink: string;
  sourceCodelink: string;
}

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const { data: session } = useSession();

  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");
  const [project, setProject] = useState({
    id: "",
    title: "",
    summary: "",
    category: "",
    content: "",
    projectPrice: 0,
    projectDiscount: 0,
    razorpaylink: "",
    thumbnailUrl: "",
    youtubelink: "",
    sourceCodelink: "",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();
      setProject({
        id: data._id,
        title: data.title,
        summary: data.summary,
        category: data.category,
        content: data.content,
        projectPrice: data.projectPrice,
        projectDiscount: data.projectDiscount,
        razorpaylink: data.razorpaylink,
        thumbnailUrl: data.thumbnail.url,
        youtubelink: data.youtubelink,
        sourceCodelink: data.sourceCodelink || "",
      });
      setCategory(data.category);
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const finalPrice = Math.floor(
    project.projectPrice -
      (project.projectPrice * project.projectDiscount) / 100
  );

  useEffect(() => {
    const getRelatedProjects = async () => {
      if (category) {
        const response = await fetch(`/api/project?category=${category}`);
        const data = await response.json();
        setRelatedProjects(data.reverse());
      }
    };

    getRelatedProjects();
  }, [category]);

  const videoID = getYouTubeID(project.youtubelink);

  const handleEdit = async () => {
    router.push(`/update-project?id=${project.id}`);
  };

  const handleBuy = async () => {
    router.push(`/buy?id=${project.id}`);
  };

  const handleDelete = async (project: Project) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this project"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/project/${project.id.toString()}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast("Project deleted successfully");
          router.back();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="py-8 mx-auto w-full max-w-screen-2xl flex-col overflow-hidden ">
      <div className="mb-4 mt-24 px-4 sm:px-14 md:px-20 xl:px-40 2xl:px-56 w-full mx-auto relative">
        <div className="flex flex-col justify-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-semibold text-gradient_purple-blue leading-tight">
            {project.title}
          </h2>
          <div className="flex items-center justify-center mt-8">
            <Image
              src={project.thumbnailUrl}
              alt="project thumbnai"
              width={600}
              height={600}
              className="object-cover rounded"
            />
          </div>
          {session?.user.isAdmin && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={handleEdit}
                className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-6 rounded mt-8 active:scale-95"
              >
                Edit this project
              </button>
              <button
                onClick={() => handleDelete(project)}
                className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-6 rounded mt-8 active:scale-95"
              >
                Delete this project
              </button>
            </div>
          )}
        </div>

        <div className="flex-col justify-center mb-12">
          <h2 className="text-xl sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
            YouTube Tutorial:-
          </h2>
          <div className="flex justify-center mt-8 items-center rounded">
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${videoID}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flex-col justify-center mb-8">
          {/* <h2 className="text-xl sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
            Content:-
          </h2> */}
          <div
            className=" text-white blog-content"
            dangerouslySetInnerHTML={{ __html: project.content }}
          ></div>
        </div>

        <div className="flex-col justify-center items-center mb-8">
          <h2 className="text-xl sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
            Source Code:-
          </h2>
          <div className="flex flex-col justify-center items-center mt-4">
            <Link target="_blank" href={project.sourceCodelink}>
              <button className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-2 rounded active:scale-95 flex items-center justify-center gap-2">
                <p>G Drive Link</p>
                <FaDownload />
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-col justify-center items-center mb-8">
          <h2 className="text-xl sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
            Buy Complete Project:-
          </h2>
          <div className="flex flex-col justify-center items-center mt-4 sm:mt-6">
            <p className="text-white font-semibold">
              Project price: ₹ {project.projectPrice}
            </p>
            <p className="text-white font-semibold">
              Project discount: {project.projectDiscount}%
            </p>
            <p className="text-white font-semibold">
              Final Price: ₹ {finalPrice}
            </p>
            <button
              onClick={handleBuy}
              className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-4 rounded active:scale-95 flex items-center justify-center gap-2"
            >
              <p>Buy Now</p>
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>

      <RelatedProject relatedProjects={relatedProjects} projectId={projectId} />
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
