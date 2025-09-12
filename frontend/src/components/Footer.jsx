import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { useLocation } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className={` mt-3 h-[5rem] ${
        location.pathname.startsWith("/reset-password") && "hidden"
      } border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm flex items-center flex-col gap-2 justify-center px-2 text-gray-300`}
    >
      <h1 className="text-center text-sm font-medium">
        Created by Kapil
      </h1>
      <div className="flex gap-3 text-lg">
        <a target="_blank" href="https://github.com/Mradul999" className="text-gray-400 hover:text-white transition-colors">
          <FaGithub className="cursor-pointer" />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mradul-verma-b74048254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaLinkedin className="cursor-pointer" />
        </a>
        <a target="_blank" href="https://www.instagram.com/catsaredramatic99/" className="text-gray-400 hover:text-white transition-colors">
          <FaInstagram className="cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
