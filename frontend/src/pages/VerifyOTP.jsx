import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
export default function VerifyOTP() {
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("name");
    const password = sessionStorage.getItem("password");

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verifyotp`,
        { email, otp }
      );
      // console.log(response);
      if (response.status === 200) {
        setLoading(false);
        const signupResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/signup`,
          {
            email,
            name,
            password,
          }
        );
        if (signupResponse.status === 200) {
          // console.log(signupResponse)

          navigate("/sign-in");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404 || error.response.status === 401) {
          setError("Invalid OTP");
        } else {
          setError("Internal server error");
        }
      }
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center px-2 text-gray-200">
      <div
        className={`sm:max-w-[400px] rounded-md flex flex-col gap-5 py-6 px-4 mt-[12rem] w-full bg-gray-800/60 backdrop-blur-sm border border-gray-700 shadow-xl`}
      >
        <h1 className="text-2xl font-semibold">Verify OTP</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            onChange={changeHandler}
            type="text"
            className="rounded-md py-3 px-3 bg-gray-900/50 border border-gray-700 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter OTP"
          />
          <span className="text-gray-400 text-sm">OTP will expire in {timeLeft} seconds</span>

          {error && <span className="text-red-400 text-sm">*{error}</span>}
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md text-white py-3 hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium">
            {loading ? (
              <ThreeDots height="30" width="60" color="white" ariaLabel="loading" />
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
