"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";
import { signIn, getProviders } from "next-auth/react";

const testimonials = [
  {
    imgLink: "/assets/images/chatgpt.svg",
    name: "chat gpt",
    title: "chat GPt",
  },
  {
    imgLink: "/assets/images/bing.svg",
    name: "bing",
    title: "bing AI",
  },
  {
    imgLink: "/assets/images/gemini.svg",
    name: "gemini",
    title: "gemini AI",
  },
  {
    imgLink: "/assets/images/perplexity.svg",
    name: "perplexity",
    title: "perplexity AI",
  },
];

const Register = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  const handleSignUp = async (provider) => {
    try {
      const result = await signIn(provider.id, {
        callbackUrl: "/", // Redirect to home page after login
      });

      if (result.error) {
        // Handle login errors (optional)
        console.error("Login error:", result.error);
      }
    } catch (error) {
      console.log("Unexpected error: ", error);
    }
  };

  return (
    <div className="relative z-10 flex h-screen w-screen justify-center">
      <div className="grid w-full grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 flex items-center justify-center md:col-span-2">
          <div className="w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
            <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
              <Link href="/">
                <Image
                  src="/assets/images/logo.svg"
                  alt="Promptopia Logo"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </Link>
              <h3 className="text-xl font-semibold">
                Create your promptopia.io account
              </h3>
              <p className="text-sm text-gray-500">
                Get Started for free. No credit card required.
              </p>
            </div>
            <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => handleSignUp(provider)}
                    className="group flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                  >
                    <FcGoogle className="mr-1.5 size-5" /> Continue with Google
                  </button>
                ))}
              <button
                type="button"
                className="group flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all border-black bg-black text-white hover:bg-white hover:text-black"
              >
                <FaGithub className="mr-1.5 size-5" />
                Continue with GitHub
              </button>
              <p className="text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  className="font-semibold text-gray-500 transition-colors hover:text-black"
                  href="/login"
                >
                  {" "}
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden h-full pt-32 flex-col justify-center overflow-hidden border-l border-gray-200 bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur md:flex">
          <div className="ml-12 h-1/2 w-[150%] rounded-xl border border-gray-200 bg-white/90 p-4 shadow-xl">
            <Image
              src="/assets/images/geodata.webp"
              alt="Promptopia Logo"
              width={990}
              height={1735}
              className="blur-0 h-full rounded-xl border border-gray-200 object-cover shadow-md"
            />
          </div>
          <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="left"
              speed="normal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
