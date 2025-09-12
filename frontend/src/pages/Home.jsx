import React from "react";
import { PopularPosts } from "../components/PopularPosts";
import { AllPosts } from "../components/AllPosts";


export default function Home() {
  return (
    <div className="w-full min-h-screen pt-20 pb-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      <div className="w-full flex md:flex-row flex-col min-h-screen pt-0 gap-4 px-2">
        <PopularPosts />
        <AllPosts />
      </div>
    </div>
  );
}