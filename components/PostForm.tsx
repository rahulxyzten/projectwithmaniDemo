"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { motion } from "framer-motion";

interface Post {
  title: string;
  username: string;
  cover: File;
}

interface Props {
  type: string;
  post: Post;
  setPost: (project: Post) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PostForm = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPost({ ...post, cover: file });
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <form
      className="flex-center paddings mx-auto max-w-screen-xl flex-col"
      onSubmit={handleSubmit}
    >
      <div className="nav-padding w-full">
        <h1 className="mb-7 heading3 text-white-800">{type} gallery post ✨</h1>
        <motion.div
          className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5"
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ duration: 0.5 }}
        >
          <Input
            type="text"
            className="mb-5 "
            variant="underlined"
            label="Title :"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

          <Input
            type="text"
            className="mb-5 "
            variant="underlined"
            label="Username :"
            value={post.username}
            onChange={(e) => setPost({ ...post, username: e.target.value })}
          />

          <p className="mt-5 mb-2 ml-1 text-sm text-gray-200">
            Project picture :
          </p>
          <Input
            type="file"
            className="mb-5"
            variant="underlined"
            placeholder=" "
            onChange={handleImage}
          />

          <button
            type="submit"
            className="cursor-pointer w-full block bg-white-800 border-0 rounded px-2 py-2 mt-1 hover:bg-white-500"
            disabled={submitting}
          >
            {submitting ? `{Uploading}...` : type}
          </button>
        </motion.div>
      </div>
    </form>
  );
};

export default PostForm;
