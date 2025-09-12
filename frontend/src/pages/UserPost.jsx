import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SinglePost from "../components/SinglePost";

export default function UserPost() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/getallposts`);
        if (response.status === 200) {
          setLoading(false);
          const filteredPosts = response.data.posts.filter(
            (post) => post.userId === currentUser._id
          );
          const sortedPosts = filteredPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setAllPosts(sortedPosts);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser]);

  const onDelete = async (postId) => {
    const updatedPosts = allPosts.filter((post) => post._id !== postId);
    setAllPosts(updatedPosts);
  };
  return (
    <div className="w-full flex justify-center min-h-screen text-gray-200">
      <div className="w-full max-w-[900px] flex pt-20 pb-24 ">
        {loading ? (
          <div className="flex w-full justify-center items-center ">
            <span class="loader "></span>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-3">
            {allPosts.length === 0 ? (
              <p className="text-gray-300 text-center font-semibold ">
                No post created Yet
              </p>
            ) : (
              <h1 className="md:text-2xl text-xl text-white font-medium text-center">
                All posts
              </h1>
            )}

            {allPosts.map((post) => (
              <SinglePost post={post} onDelete={onDelete} key={post._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
