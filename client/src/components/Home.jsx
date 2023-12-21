import React from "react";
import Chat from './Chat'
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
      .delete(`http://localhost:8080/users/${name}`)
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
    <div>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleDelete}>Delete Account</button>
      <Chat/>
    </div>
  );
};

export default Home;
