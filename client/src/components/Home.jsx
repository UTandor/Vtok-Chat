import React from "react";
import Chat from "./Chat";
import axios from "axios";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("password");
    window.location.replace("/login");
  };

  const handleDelete = () => {
    const name = localStorage.getItem("name");
    axios
      .delete(
        `https://vtokback.netlify.app/.netlify/functions/server/users/${name}`
      )
      .then((response) => {
        console.log("User successfully deleted:", response.data);
        localStorage.removeItem("name");
        localStorage.removeItem("password");
        window.location.replace("/login");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen w-full flex-col">
      <div className="flex flex-row items-center justify-between w-screen px-[5%]">
        <button
          onClick={handleLogout}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 duration-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Log out
        </button>
        <button
          onClick={handleDelete}
          className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 duration-100 flex items-center justify-center gap-1"
        >
          Delete Account
        </button>
      </div>
      <div className="">
        <Chat />
      </div>
    </div>
  );
  a;
};

export default Home;
