import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LoginSVG from "./LoginSVG";
import LoginAlert from "./LoginAlert";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedStatus = localStorage.getItem("status");
    if (storedStatus) {
      setStatus(storedStatus);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users/login", { name, password })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setStatus("Log in successful, Redirecting!");
          localStorage.clear();
          localStorage.setItem("name", name);
          localStorage.setItem("password", password);
          localStorage.removeItem("status");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else if (res.status === 401) {
          setStatus("Invalid username or password.");
        } else {
          setStatus("Server error. Please try again.");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setStatus("Invalid username or password.");
          } else {
            setStatus("Server error. Please try again.");
          }
        } else if (error.request) {
          setStatus("No response from server. Please try again.");
        } else {
          setStatus("Request failed. Please try again later.");
        }
        console.error(error);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <LoginSVG />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Login
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Sign in to your account to start chatting!{" "}
          </h1>
          <LoginAlert status={status} />

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
                value={name}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Don't have an account? </p>
            <div href="#" className="text-black hover:underline">
              <Link to="/register">Sign up here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
