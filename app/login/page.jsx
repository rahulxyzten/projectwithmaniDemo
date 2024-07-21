"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";

const Login = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  const handleLogin = async (provider) => {
    try {
      const result = await signIn(provider.id, {
        callbackUrl: "/", // Redirect to home page after login
      });

      if (result.error) {
        console.error("Login error:", result.error);
      }
    } catch (error) {
      console.log("Unexpected error: ", error);
    }
  };

  return (
    <div className="relative z-10 flex h-screen w-screen justify-center">
      <div className="relative z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
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
          <h3 className="text-xl font-semibold">Sign in to promptopia.io</h3>
          <p className="text-sm text-gray-500">
            Start creating superpowers prompt
          </p>
        </div>
        <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
          <div className="flex space-x-2">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => handleLogin(provider)}
                  className="group flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                >
                  <FcGoogle className=" size-6" />
                </button>
              ))}
            <button
              type="button"
              className="group flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            >
              <FaGithub className=" size-6" />
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              className="font-semibold text-gray-500 transition-colors hover:text-black"
              href="/register"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
