import { motion } from "framer-motion";
import PromptCard from "./PromptCard";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  visibleCount,
  handleLoadMore,
}) => {
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
    <section className="w-full px-1.5 mt-1 sm:mt-8">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-4 sm:px-10 md:px-0 prompt_layout">
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
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center">
        {visibleCount < data.length && (
          <button
            onClick={handleLoadMore}
            className="mb-16 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default Profile;
