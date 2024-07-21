"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut, useSession, getProviders } from "next-auth/react";
import { motion } from "framer-motion";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    // <div className="sticky inset-x-0 top-0 z-20 w-full transition-all">
    <div
      className={`sticky top-0 z-20 w-full transition-all ${
        isScrolled
          ? "border-b border-gray-200 bg-white/75 backdrop-blur-lg"
          : ""
      }`}
    >
      <div className="mx-auto w-full max-w-screen-xl pb-1">
        <div className="flex h-14 items-center justify-between pt-3">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex gap-2 flex-center">
              <Image
                src="/assets/images/logo.svg"
                alt="Promptopia Logo"
                width={30}
                height={30}
                className="object-contain"
              />
              {/* <p className="logo_text">Promptopia</p> */}
              <p className="logo_text">Promptix</p>
            </Link>
            <nav className="relative hidden lg:block">
              {/* <ul className="flex flex-row skew-x-2 p-4">
                <Link
                  id="nav-customers"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                  href="#"
                >
                  Customers
                </Link>
                <Link
                  id="nav-pricing"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                  href="#"
                >
                  Pricing
                </Link>
                <Link
                  id="nav-enterprise"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                  href="#"
                >
                  Enterprise
                </Link>
                <Link
                  id="nav-blog"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                  href="#"
                >
                  Blog
                </Link>
                <Link
                  id="nav-changelog"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                  href="#"
                >
                  Changelog
                </Link>
              </ul> */}
            </nav>
          </div>

          {/* Desktop Navigation */}
          <div className="sm:flex hidden">
            {session?.user ? (
              <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                  Create Post
                </Link>

                <button type="button" onClick={signOut} className="outline_btn">
                  Sign Out
                </button>

                <Link href="/profile">
                  <Image
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                  />
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                >
                  Log in
                </Link>
                <Link href="/register">
                  <button type="button" className="black_btn">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex relative">
            {session?.user ? (
              <div className="flex">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />
                {toggleDropdown && (
                  <motion.div
                    className="dropdown"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 0.7 }}
                  >
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className=" mt-2 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                >
                  Log in
                </Link>
                <Link href="/register">
                  <button type="button" className="black_btn">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
