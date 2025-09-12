import React from "react";

export default function About() {
  return (
    <div className="w-full text-gray-200">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-10 min-h-screen pt-24 w-full">
        <h1 className="text-2xl font-medium text-center">
          About{" "}
        </h1>
        <p className="text-base md:text-lg max-w=[800px] w-full px-2 mx-auto text-center text-gray-300">
          Welcome to Anonymous! I’m Kapil, the creator of this website.
          Anonymous allows you to post anonymously. This website is exclusively
          for GLA University students, and access is granted using your college
          email ID. We value your input and would love to hear your suggestions.
          Please use the feedback form to share your thoughts.
        </p>
      </div>
    </div>
  );
} 