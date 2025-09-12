import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signoutSuccess } from "../redux/user.slice";
import { setTheme } from "../redux/theme.slice";
import axios from "axios";
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoChatboxOutline } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL;

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [dropdown, setDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const modeClickhandler = () => {
    dispatch(setTheme(theme === "dark" ? "Light" : "dark"));
    setDropdown(false);
  };

  const profileClickHandler = () => {
    setDropdown(!dropdown);
  };

  const signoutHandler = async () => {
    setActiveTab("");
    try {
      const signoutResponse = await axios.post(`${API_URL}/api/auth/signout`);
      if (signoutResponse.status === 200) {
        dispatch(signoutSuccess());
        setDropdown(false);
        navigate("/sign-in");
      }
    } catch (error) {}
  };

  const myPostHandler = () => {
    navigate("/posts/userposts");
    setDropdown(false);
    setActiveTab("");
  };

  return (
    <div
      className={`w-screen ${
        location.pathname.startsWith("/reset-password") && "hidden"
      } flex justify-between items-center py-4 fixed z-10 sm:px-7 px-2 bg-gray-900/70 backdrop-blur-md border-b border-gray-800 text-gray-200 shadow-lg`}
    >
      {/* Logo */}
      <NavLink to="/">
        <h1 onClick={() => setActiveTab("")} className="text-xl font-semibold flex items-center gap-1">
          <span className="text-2xl bg-indigo-600 text-white rounded-full px-2 py-1">Λ</span>
          nonymous
        </h1>
      </NavLink>

      {/* Right Side */}
      <div className="flex items-center relative gap-3">
      <NavLink to="/chat">
          <div className="flex gap-1 items-center cursor-pointer font-medium text-gray-300 hover:text-white transition-colors">
            {" "}
            <IoChatboxOutline /> ChatRoom
          </div>
        </NavLink>
        

        {/* Navigation Links */}
        <NavLink to="/about">
          <button
            onClick={() => {
              setDropdown(false);
              setActiveTab("about");
            }}
            className={`${
              activeTab === "about" ? "text-indigo-300" : "text-gray-300"
            } font-medium hover:text-indigo-400 transition-colors text-xs sm:text-sm`}
          >
            About
          </button>
        </NavLink>

        <NavLink to="/contact">
          <button
            onClick={() => {
              setDropdown(false);
              setActiveTab("feedback");
            }}
            className={`${
              activeTab === "feedback" ? "text-indigo-300" : "text-gray-300"
            } font-medium hover:text-indigo-400 transition-colors text-xs sm:text-sm`}
          >
            Feedback
          </button>
        </NavLink>


        {/* User Profile */}
        {currentUser ? (
          <h2
            onClick={profileClickHandler}
            className={`text-2xl bg-indigo-600/90 text-white px-2 rounded-full cursor-pointer transition-transform ${
              dropdown ? "rotate-180" : ""
            } font-semibold shadow-md hover:bg-indigo-600`}
            title="Account"
          >
            Λ
          </h2>
        ) : (
          <NavLink to="/sign-in">
            <button className="md:px-3 md:py-2 py-1 px-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-sm rounded-md font-medium text-white hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-md">
              Login
            </button>
          </NavLink>
        )}

        {/* Dropdown Menu */}
        <div
          className={`absolute top-14 right-0 bg-gray-900/95 border border-gray-800 rounded-md p-2 flex flex-col gap-2 shadow-2xl transition-transform transform ${
            dropdown ? "scale-100" : "scale-0"
          } origin-top`}
        >
          <h1 className="text-sm text-gray-300">@{currentUser?.username}</h1>
          <div className="h-[1px] w-full bg-gray-800"></div>

          <p onClick={myPostHandler} className="text-sm font-medium text-gray-300 hover:text-indigo-400 cursor-pointer">
            My Posts
          </p>

          <div className="h-[1px] w-full bg-gray-800"></div>

          <button
            onClick={signoutHandler}
            className="px-2 py-2 bg-indigo-600 text-sm rounded-md font-medium text-white hover:bg-indigo-700 transition-all"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
