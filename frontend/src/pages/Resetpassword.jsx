import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const { token } = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords not matching");
      return;
    }
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resetpassword`,
        {
          token,
          password,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 401) {
          setError("You can not set old password as your new Password!");
          return;
        } else if (error.response.status === 400) {
          setError("Reset password link expired please generate a new Link");
          return;
        } else {
          setError("Something went wrong");
          return;
        }
      }
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center text-gray-200">
      <div className="flex mx-2 flex-col gap-8 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-md max-w-[400px] py-10 px-8 w-full">
        <span className="text-2xl font-semibold  bg-indigo-800  dark:text-gray-300 size-10 flex justify-center items-center  self-center text-gray-200 rounded-full px-[0.5rem]">
          Λ
        </span>
        {success && (
          <p className="text-gray-200 text-center text-xl">
            Password reset successfully
          </p>
        )}
        <h1
          className={` text-2xl text-center text-gray-200 font-semibold ${
            success && "hidden"
          }`}
        >
          {" "}
          Reset Password
        </h1>
        <form
          onSubmit={submitHandler}
          className={`flex flex-col gap-4 text-gray-200 ${
            success && "hidden"
          }`}
        >
          <div className="relative w-full">
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md text-sm w-full p-3 bg-transparent border-2 border-gray-700 focus:outline-none focus:border-indigo-600 placeholder:text-gray-400"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter new password"
            />
            {showPassword ? (
              <IoEyeOutline
                onClick={toggleShowPassword}
                className="absolute top-3 text-lg right-2 text-gray-500 "
              />
            ) : (
              <FaRegEyeSlash
                onClick={toggleShowPassword}
                className="absolute top-3 text-lg right-2 text-gray-500 "
              />
            )}
          </div>
          <div className="w-full relative">
            <input
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-md text-sm w-full p-3 bg-transparent border-2 border-gray-700 focus:outline-none focus:border-indigo-600 placeholder:text-gray-400"
              type={`${showPasswordConfirm ? "text" : "password"}`}
              placeholder="Confirm password"
            />
            {showPasswordConfirm ? (
              <IoEyeOutline
                onClick={toggleShowPasswordConfirm}
                className="absolute top-3  text-lg right-2 text-gray-500 "
              />
            ) : (
              <FaRegEyeSlash
                onClick={toggleShowPasswordConfirm}
                className="absolute top-3  text-lg right-2 text-gray-500 "
              />
            )}
          </div>

          {error && (
            <p className="text-red-400 text-sm tracking-normal">{error}</p>
          )}
          <button
            className={`text-sm ${loading && "pointer-events-none"} ${
              success && "hidden"
            } transition-all flex justify-center items-center font-medium bg-gradient-to-r from-indigo-600 to-purple-600 py-2 rounded-md text-white`}
          >
            {loading ? (
              <ThreeDots
                height="25"
                width="45"
                wrapperClass
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
