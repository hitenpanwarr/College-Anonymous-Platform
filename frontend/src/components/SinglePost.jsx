import React, { useEffect, useState } from "react";
import moment from "moment";

import { FaRegCommentAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa6";
import Modal from "./postModal";
import { FaRegThumbsUp } from "react-icons/fa6";
import SigninModal from "./SigninModal";

export default function SinglePost({ post, onDelete }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [commentCount, setCommentsCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [signinModal, setSigninModal] = useState(false);

  const [liked, setLiked] = useState(false);
  const postClickHandler = () => {
    navigate(`/post/${post?.slug}`);
  };

  useEffect(() => {
    if (currentUser) {
      setLiked(post.likes.includes(currentUser._id));
    }
  }, [currentUser, post.likes]);

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comment/getcomments/${post._id}`);
      if (response.status === 200) {
        setCommentsCount(response.data?.length);
      }
    };
    getComments();
  }, []);

  const likeHandler = async (e) => {
    try {
      if (!currentUser) {
        e.stopPropagation();
        setSigninModal(true);
        return;
      }
      e.stopPropagation();
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/post/likepost/${post._id}/${currentUser._id}`
      );
      if (response.status === 200) {
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
  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/post/deletepost/${post._id}`
      );
      if (response.status === 200) {
        setModal(false);
        onDelete(response.data._id);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const showModal = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const closeModal = () => {
    setSigninModal(false);
    setModal(false);
  };
  return (
    <div
      onClick={postClickHandler}
      className="p-4 bg-gray-800/60 backdrop-blur-sm text-gray-200 cursor-pointer border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
    >
      {signinModal && <SigninModal onClose={closeModal}></SigninModal>}
      {modal && <Modal onClose={closeModal} deleteHandler={deleteHandler} />}
      <div className="flex items-center gap-10  md:gap-4  ">
        <p className="md:text-base text-sm font-medium">@{post.author}</p>
        <p className=" text-sm w-full">{moment(post.createdAt).fromNow()}</p>
      </div>

      <h1 className="font-semibold mb-3 tracking-normal text-white text-lg">
        {post.title}
      </h1>
      {post.image && (
        <img
          src={post?.image}
          className=" mb-3 rounded-md w-[200px] md:w-[300px] border border-gray-700"
          alt=""
        />
      )}
      <div className="flex mb-3">
        <p className="text-sm text-gray-300 line-clamp-1 ">
          {post.content}
        </p>
      </div>

      <div className="flex   justify-between  items-center  ">
        <div className="flex items-center ">
          <div
            onClick={likeHandler}
            className="flex items-center justify-center px-2 gap-1 py-1 md:dark:hover:bg-gray-600 md:hover:bg-gray-400 transition-all rounded-full"
          >
            {liked ? (
              <FaThumbsUp
                className={`
               text-md transition-all`}
              />
            ) : (
              <FaRegThumbsUp className={` text-md transition-all  `} />
            )}

            <span className="text-xs pt-[1.3px]">{likesCount}</span>
          </div>

          <div className="flex items-center justify-center md:dark:hover:bg-gray-600 md:hover:bg-gray-400 transition-all   px-2 py-1 gap-1  rounded-full">
            <FaRegCommentAlt className=" text-md  " />
            <span className="text-xs">{commentCount}</span>
          </div>
        </div>

        {currentUser?._id === post.userId && (
          <button
            onClick={showModal}
            className="bg-indigo-700 rounded-md px-2 py-1 text-sm text-white font-semibold hover:bg-indigo-800 transition-all  "
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
