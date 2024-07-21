import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  AvatarGroup,
  Tooltip,
} from "@nextui-org/react";
import { BiUpvote } from "react-icons/bi";

const PromptDetails = ({
  openModal,
  setOpenModal,
  post,
  handleTagClick,
  handleProfileClick,
  handleCopy,
  handleUpvote,
  upvoted,
  voteCount,
  copied,
}) => {
  useEffect(() => {
    if (openModal) {
      setOpenModal(true);
    }
  }, [openModal, setOpenModal]);
  // Ensure modal opens when openModal prop is true

  const handleModelClose = () => {
    setOpenModal(false); // Close the modal by updating the state
  };

  return (
    <Modal backdrop="opaque" isOpen={openModal} onClose={handleModelClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col">
          <div className="flex justify-between items-start gap-5">
            <div
              className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
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
              </div>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <p className="rounded-md text-xs font-medium orange_gradient">
              Descrption:
            </p>
            <p className="mb-4 mt-2 font-satoshi text-sm text-gray-700 paragraph-container">
              {post.description}
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center mr-3">
              <p className="rounded-md text-xs font-medium orange_gradient">
                Prompt:
              </p>
              <div className="copy_btn" onClick={handleCopy}>
                <Image
                  src={
                    copied === post.prompt
                      ? "/assets/icons/tick.svg"
                      : "/assets/icons/copy.svg"
                  }
                  alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                  width={12}
                  height={12}
                />
              </div>
            </div>
            <div className="mx-3 mb-4 mt-3 paragraph-container">
              <p className="font-satoshi text-sm text-gray-700 glassmorphism">
                {post.prompt}
              </p>
            </div>
          </div>
          <p className="rounded-md text-xs font-medium orange_gradient">
            Tags:
          </p>
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(post.tag)}
          >
            #{post.tag}
          </p>
        </ModalBody>
        <ModalFooter className="relative">
          <div
            className={` absolute bottom-1 left-0  m-5 px-3 py-1  rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer ${
              upvoted ? "text-yellow-500" : ""
            } `}
            onClick={handleUpvote}
          >
            <BiUpvote className="size-6" />
            <p className="ml-0.5">Up vote {voteCount}</p>
          </div>
          <AvatarGroup isBordered>
            <Tooltip color="default" content="chatgpt" className="capitalize">
              <Link target="_blank" href="https://chat.openai.com/">
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVYXQP47jop3QgfcGYAjrvIIMZzyu2VbR75qtJ2tNdIw&s" />
              </Link>
            </Tooltip>
            <Tooltip color="default" content="bing" className="capitalize">
              <Link target="_blank" href="https://copilot.microsoft.com/">
                <Avatar src="https://miro.medium.com/v2/resize:fit:1200/1*v9P9lqGeh1k6P_Vmzd4d6A.jpeg" />
              </Link>
            </Tooltip>
            <Tooltip
              color="default"
              content="perplexity"
              className="capitalize"
            >
              <Link target="_blank" href="https://www.perplexity.ai/">
                <Avatar src="https://play-lh.googleusercontent.com/6STp0lYx2ctvQ-JZpXA1LeAAZIlq6qN9gpy7swLPlRhmp-hfvZePcBxqwVkqN2BH1g" />
              </Link>
            </Tooltip>
            <Tooltip color="default" content="gemini" className="capitalize">
              <Link target="_blank" href="https://gemini.google.com/app">
                <Avatar src="https://wpwww-prod.s3.us-west-2.amazonaws.com/uploads/sites/42/2023/08/Google_Bard_logo-300x300.jpg" />
              </Link>
            </Tooltip>
          </AvatarGroup>
          {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
          {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PromptDetails;
