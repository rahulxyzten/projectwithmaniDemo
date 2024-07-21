"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { BiUpvote } from "react-icons/bi";
import PromptDetails from "./PromptDetails";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [upvoted, setUpvoted] = useState(false);
  const [voteCount, SetVoteCount] = useState(post.upvotes);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const checkUpvoteStatus = async () => {
      try {
        if (session?.user) {
          if (post.upvoters.includes(session.user.id)) {
            setUpvoted(true);
          }
        }
      } catch (error) {
        console.error("Failed to check upvote status", error);
      }
    };

    checkUpvoteStatus();
  }, [session, post._id]);

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleUpvote = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upvote: !upvoted,
          userid: session.user.id,
        }),
      });

      if (res.ok) {
        setUpvoted(!upvoted);
        const promptData = await res.json();
        SetVoteCount(promptData.upvotes);
      } else {
        console.error("Failed to upvote");
      }
    } catch (error) {
      console.error("Failed to upvote", error);
    }
  };

  // Format the date
  const formattedDate = new Date(post.dateCreated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="prompt_card cursor-pointer overflow-hidden">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
            <p className="font-inter text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </div>

      <p
        className="my-4 font-satoshi text-sm text-gray-700"
        onClick={() => setOpenModal(true)}
      >
        {post.prompt.slice(0, 85) + "...."}
        <span className="hover:underline text-blue-500">
          <span className="blue_gradient">(more)</span>
        </span>
      </p>
      <div className="flex justify-between items-center">
        <p
          className="font-inter text-sm blue_gradient"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>

        <div
          className={`px-3 py-1 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer ${
            upvoted ? "text-yellow-500" : ""
          } `}
          onClick={handleUpvote}
        >
          <BiUpvote className="size-4" />
          <p className="ml-0.5">{voteCount}</p>
        </div>
      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
      {openModal && (
        <PromptDetails
          openModal={openModal}
          setOpenModal={setOpenModal}
          post={post}
          handleProfileClick={handleProfileClick}
          handleCopy={handleCopy}
          handleUpvote={handleUpvote}
          handleTagClick={handleTagClick}
          upvoted={upvoted}
          voteCount={voteCount}
          copied={copied}
        />
      )}
    </div>
  );
};

export default PromptCard;
