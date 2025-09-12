import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
export default function Signup() {
  const [formData, setFormData] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData?.name || !formData?.password || !formData?.email) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/generateotp`,
        {
          email: formData.email,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("name", formData.name);
        sessionStorage.setItem("password", formData.password);
        navigate("/verify-otp");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          setError("Enter a valid Email");
        } else if (error.response.status == 409) {
          setError("User already registered");
        } else {
          setError("Internal server error");
        }
      }
    }
  };
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us today and get started</p>
        </div>
        
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <input
              onChange={changeHandler}
              id="name"
              type="text"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter Full Name"
            />
          </div>
          
          <div>
            <input
              onChange={changeHandler}
              id="email"
              type="email"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter GLA mail ID"
            />
          </div>
          
          <div className="relative">
            <input
              onChange={changeHandler}
              id="password"
              type={`${showPassword ? "text" : "password"}`}
              className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showPassword ? (
                <IoEyeOutline className="text-xl" />
              ) : (
                <FaRegEyeSlash className="text-xl" />
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3">
              <span className="text-red-400 text-sm">*{error}</span>
            </div>
          )}
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex justify-center">
                <ThreeDots
                  height="24"
                  width="48"
                  color="white"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              "Sign up"
            )}
          </button>
          
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <NavLink to="/sign-in" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200">
                Sign in
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
