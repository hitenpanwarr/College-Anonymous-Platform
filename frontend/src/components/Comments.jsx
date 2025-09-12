import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import { ThreeDots } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function Comments({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setcomments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/comment/getcomments/${post._id}`
        );
        if (response.status === 200) {
          setLoading(false);
          const sortedComments = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setcomments(sortedComments);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchComments();
  }, [post]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment) {
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/comment/createcomment`,
        {
          content: comment,
          userId: currentUser._id,
          postId: post._id,
        }
      );
      if (response.status === 200) {
        setComment("");
        setcomments([response.data, ...comments]);
      }
    } catch (error) {}
  };

  const filterComments = async (commentId) => {
    const filteredComments = comments.filter(
      (comment) => comment._id !== commentId
    );
    setcomments(filteredComments);
  };

  const onEdit = async (comment, content) => {
    comments.map((c) => (c._id === comment._id ? { ...c, content } : c));
  };

  return (
    <div className="w-full flex flex-col mb-20 mt-6 text-gray-200">
      {!currentUser && (
        <p className="text-center font-medium text-indigo-300 border-b border-gray-800 pb-4">
          {" "}
          <NavLink to="/sign-in">Signin</NavLink>{" "}
          <span className="text-gray-400"> to comment</span>{" "}
        </p>
      )}
      <form
        onSubmit={submitHandler}
        className={`w-full flex flex-col ${!currentUser && "hidden"} `}
      >
        <div className="flex md:flex-row flex-col  gap-2 md:gap-3 items-center">
          <span className="dark:text-gray-300 text-textColor self-start font-semibold text-sm">
            {currentUser?.username}
          </span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={1}
            type="text"
            placeholder="Add Comment"
            className="w-full focus:outline-none placeholder:text-sm bg-transparent border-b border-gray-700 placeholder:text-gray-400 focus:border-b-indigo-500 focus:border-b-2 text-gray-200 text-sm"
          />
        </div>
        <button
          className={` text-white py-1 px-3 rounded-full text-xs ${
            !comment
              ? "pointer-events-none text-gray-400 bg-gray-700"
              : " pointer-events-auto bg-indigo-600 hover:bg-indigo-500"
          } transition-all self-end mt-2 font-medium `}
        >
          Comment
        </button>
      </form>
      {loading ? (
        <div className="flex justify-center items-center">
          <ThreeDots
            height="40"
            width="60"
            wrapperClass
            color="white"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <div className="flex flex-col mt-2 gap-2">
          {comments.length === 0 && (
            <p className="text-center">No comments yet</p>
          )}
          {comments?.map((comment) => (
            <SingleComment
              comment={comment}
              onEdit={onEdit}
              filterComments={filterComments}
              key={comment._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
