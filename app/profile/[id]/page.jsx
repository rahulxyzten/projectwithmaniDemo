"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data.reverse());
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
      visibleCount={visibleCount}
      handleLoadMore={handleLoadMore}
    />
  );
};

export default UserProfile;
