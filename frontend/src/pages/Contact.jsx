import axios from "axios";
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/feedback/createfeedback`,
        formData
      );
      if (response.status === 200) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        setSuccessMessage("Message sent successfully");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="w-full text-gray-200">
      <div className="max-w-[500px] mx-auto px-2 flex flex-col gap-5 min-h-screen pt-24 w-full">
        <h1 className="text-2xl font-medium text-center">
          Contact me{" "}
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            required
            value={formData.name}
            onChange={changeHandler}
            id="name"
            type="text"
            className="rounded-md py-3 px-3 text-gray-200 border border-gray-700 bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter name"
          />
          <input
            required
            value={formData.email}
            onChange={changeHandler}
            id="email"
            type="email"
            className="rounded-md py-3 px-3 text-gray-200 border border-gray-700 bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter Mail"
          />
          <textarea
            required
            value={formData.message}
            onChange={changeHandler}
            rows={6}
            id="message"
            type="text"
            className="rounded-md py-3 px-3 text-gray-200 border border-gray-700 bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your message"
          />
          {successMessage && (
            <p className="bg-green-600/80 border border-green-700 rounded-md py-2 text-gray-100 text-center font-medium">
              {successMessage}
            </p>
          )}

          <button className="text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md py-3 hover:from-indigo-700 hover:to-purple-700 transition-colors">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
