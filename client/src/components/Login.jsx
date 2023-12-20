import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users/login", { name, password })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("name", name);
          localStorage.setItem("password", password);
          setName("");
          setPassword("");
          navigate("/home");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
