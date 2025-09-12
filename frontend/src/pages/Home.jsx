import React from "react";
import { PopularPosts } from "../components/PopularPosts";
import { AllPosts } from "../components/AllPosts";


export default function Home() {
  return (
    <div>
      <div className="w-full flex md:flex-row flex-col min-h-screen pt-20 gap-4 px-2">
        <PopularPosts />
        <AllPosts />
      </div>
    </div>
  );
}