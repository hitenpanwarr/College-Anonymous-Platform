import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";

import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import SigninModal from "../components/SigninModal";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [signinModal, setSigninModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/getallposts`
        );
        if (response.status === 200) {
          setLoading(false);
          const foundPost = response.data.posts.find(
            (p) => p.slug === postSlug
          );
          setPost(foundPost);
          setLikesCount(foundPost.likes.length);

          setLiked(foundPost.likes.includes(currentUser._id));
        }
      } catch (error) {}
    };
    fetchPosts();
  }, [postSlug]);

  const likeHandler = async (e) => {
    try {
      if (!currentUser) {
        setSigninModal(true);
        return;
      }

      e.stopPropagation();
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/post/likepost/${post._id}/${
          currentUser._id
        }`
      );
      if (response.status === 200) {
        // console.log(response);
        if (response.data.likes.includes(currentUser._id)) {
          setLiked(true);
          setLikesCount(likesCount + 1);
        } else {
          setLiked(false);
          setLikesCount(likesCount - 1);
        }
      }
    } catch (error) {}
  };

  const closeModal = () => {
    setSigninModal(false);
  };

  return (
    <div className="w-full min-h-screen pt-[5rem] pb-2 flex justify-center text-gray-200">
      {signinModal && <SigninModal onClose={closeModal} />}
      {loading ? (
        <div className="flex justify-center items-center">
          <span class="loader"></span>
        </div>
      ) : (
        <div className="w-full flex flex-col rounded-lg py-2 px-2 mb-10 max-w-[900px] ">
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
            <div className="flex gap-3 mb-2 items-center">
              <span>{post?.author}</span>
              <span className="text-sm text-gray-400">
                {moment(post?.createdAt).fromNow()}
              </span>
            </div>

            <h1 className="font-semibold text-white text-2xl mb-5">{post?.title}</h1>
            {post?.image && (
              <img
                src={post?.image}
                className="mb-2 w-full md:w-[600px] rounded-md border border-gray-700"
              ></img>
            )}
            <p className="mb-2 text-gray-300 md:text-base text-sm">{post?.content}</p>
            <div className="h-[1px] bg-gray-700 my-3 w-full"></div>
            <div className="flex gap-3 items-center mb-1">
              <div
                onClick={likeHandler}
                className="flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all px-2 gap-1 py-1 rounded-full"
              >
                {liked ? (
                  <FaThumbsUp
                    className={`
               text-md transition-all`}
                  />
                ) : (
                  <FaRegThumbsUp className={` text-md transition-all  `} />
                )}
                <span className="text-xs">{likesCount}</span>
              </div>

              {/* <div className="flex items-center justify-center cursor-pointer hover:bg-gray-700 px-2 py-1 gap-1  rounded-full">
                <FaRegCommentAlt className=" text-sm " />
                <span className="text-xs">20</span>
              </div> */}
            </div>
          </div>

          <Comments post={post} />
        </div>
      )}
    </div>
  );
}
