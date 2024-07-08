"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState("");
  const [contentDropdown, setContentDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, [session]);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setMenuAnimation("slideOut");
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setMenuAnimation("");
      }, 300); // duration of slideOut animation
    } else {
      setIsMobileMenuOpen(true);
      setMenuAnimation("slideIn");
    }
  };

  const handleLinkClick = () => {
    setMenuAnimation("slideOut");
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setMenuAnimation("");
    }, 300); // duration of slideOut animation
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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

  return (
    <nav
      className={`flex-center fixed top-0 z-50 w-full border-b-2 border-black-200 py-7 text-white ${
        isScrolled ? "bg-black-100 bg-opacity-95" : "bg-black-100"
      }`}
    >
      <div className="flex-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16">
        <Link href="/">
          <Image src="/PWM.png" alt="logo" width={55} height={40} />
        </Link>

        <div className="flex items-center justify-between">
          <ul className="flex-center gap-x-3 max-md:hidden md:gap-x-5">
            <li className="body-text !font-bold">
              <Link href="/tutorials">Tutorials</Link>
            </li>
            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="#">I</Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/gallery">Gallery</Link>
            </li>
            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="#">I</Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Desktop Navigation */}
        <ul className="flex-center gap-x-3 max-md:hidden relative">
          {session?.user ? (
            <>
              <li
                className="body-text text-gradient_blue-purple !font-bold cursor-pointer"
                onClick={() => signOut()}
              >
                Sign out
              </li>
              <li className="body-text text-gradient_blue-purple !font-bold cursor-pointer">
                <Image
                  src={session?.user.image || ""}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                  onClick={() => setContentDropdown((prev) => !prev)}
                />
              </li>
              {contentDropdown && (
                <div className="absolute right-0 top-full mt-2 w-full p-5 rounded-lg bg-black-100 min-w-[210px] flex flex-col gap-2 justify-center items-center shadow-sm border border-black-400">
                  <li className="body-text text-center text-white-800 !font-bold">
                    <p>{session?.user?.name}</p>
                  </li>
                  {session.user.isAdmin && (
                    <>
                      <li className="body-text text-gradient_blue-purple !font-bold">
                        <Link
                          href="/create-project"
                          onClick={() => setContentDropdown((prev) => !prev)}
                        >
                          Create Project
                        </Link>
                      </li>
                      <li className="body-text text-gradient_blue-purple !font-bold">
                        <Link
                          href="/create-post"
                          onClick={() => setContentDropdown((prev) => !prev)}
                        >
                          Create Post
                        </Link>
                      </li>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <li className="body-text text-gradient_blue-purple !font-bold">
                <Link href="/login">Login/Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <button
        onClick={toggleMobileMenu}
        className="block md:hidden absolute top-10 right-8 focus:outline-none"
      >
        <Image
          src="/hamburger-menu.svg"
          width={30}
          height={30}
          alt="Hamburger Menu"
        />
      </button>
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black-100 bg-opacity-99 text-center animate-${menuAnimation}`}
        >
          <button
            onClick={toggleMobileMenu}
            className="absolute top-10 right-8 focus:outline-none text-white"
          >
            <Image src="/close.svg" width={30} height={30} alt="Close Menu" />
          </button>
          <ul className="flex flex-col gap-y-6">
            <li className="body-text !font-bold">
              <Link href="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>

            <li className="body-text !font-bold">
              <Link href="/tutorials" onClick={handleLinkClick}>
                Tutorials
              </Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/gallery" onClick={handleLinkClick}>
                Gallery
              </Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/about" onClick={handleLinkClick}>
                About
              </Link>
            </li>
            {session?.user ? (
              <>
                {session.user.isAdmin && (
                  <>
                    <li className="body-text text-gradient_blue-purple !font-bold">
                      <Link href="/create-project" onClick={handleLinkClick}>
                        Create Project
                      </Link>
                    </li>
                    <li className="body-text text-gradient_blue-purple !font-bold">
                      <Link href="/create-post" onClick={handleLinkClick}>
                        Create Post
                      </Link>
                    </li>
                  </>
                )}
                <li
                  className="body-text text-gradient_blue-purple !font-bold cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sign out
                </li>
              </>
            ) : (
              <>
                <li className="body-text text-gradient_blue-purple !font-bold">
                  <Link href="/login" onClick={handleLinkClick}>
                    Login/Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
