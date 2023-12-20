import React from "react";
import axios from "axios";

const Home = () => {
  const name = localStorage.getItem("name");
  const password = localStorage.getItem("password");

  const handleLogout = () => {
    localStorage.removeItem(name)
    localStorage.removeItem(password)

  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/users/${name}`)
      .then((response) => {
        console.log("User successfully deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default Home;
