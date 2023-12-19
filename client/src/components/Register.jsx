import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users/register", { name: username, password: password })
      .then((res) => {
        setUsername("");
        setPassword("");
        navigate('/login')
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Regsiter</button>
      </form>
    </div>
  );
};

export default Register;
