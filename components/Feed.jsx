"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
  visibleCount,
  cardVariants,
}) => {
  return (
    <div className="mt-4 sm:mt-18 prompt_layout">
      {data.slice(0, visibleCount).map((post, index) => (
        <motion.div
          key={post._id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        </motion.div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [postVisibleCount, setPostVisibleCount] = useState(9);
  const [searchVisibleCount, setSearchVisibleCount] = useState(9);

  //Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data.reverse());
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  //Why the clearTiemout and setTimeout is used
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchVisibleCount(9);
    setPostVisibleCount(9);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchVisibleCount(9);
    setPostVisibleCount(9);
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleLoadMorePost = () => {
    setPostVisibleCount((prevCount) => prevCount + 6);
  };
  const handleLoadMoreSearch = () => {
    setSearchVisibleCount((prevCount) => prevCount + 6);
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  return (
    <>
      <motion.h1
        className="head_text text-center"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        transition={{ duration: 0.5 }}
      >
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient"> AI-Powered Prompts</span>
      </motion.h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        {/* All Prompts */}
        {searchText ? (
          <>
            {" "}
            <PromptCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
              visibleCount={searchVisibleCount}
              cardVariants={cardVariants}
            />
            {searchVisibleCount < searchedResults.length && (
              <button
                onClick={handleLoadMoreSearch}
                className="mb-16 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
              >
                Load More
              </button>
            )}
          </>
        ) : (
          <>
            <PromptCardList
              data={posts}
              handleTagClick={handleTagClick}
              visibleCount={postVisibleCount}
              cardVariants={cardVariants}
            />
            {postVisibleCount < posts.length && (
              <button
                onClick={handleLoadMorePost}
                className="mb-16 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
              >
                Load More
              </button>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Feed;
