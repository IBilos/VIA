import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getCurrentUser } from "../utils/auth"; // Import functions

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isLoggedIn = await login(username, password);
    if (isLoggedIn) {
      const user = getCurrentUser(); // Get the current user from localStorage
      console.log("Postoji korisnik: ", user?.role);
      if (user?.role == "admin") {
        //Navigation for admin
        console.log("Usa u navigaciju za admina");
        navigate("/admin");
      } else {
        //Navigation for users
        navigate("/dashboard");
      }
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Logo */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md flex justify-center items-center">
        <img
          src="/logo.png" // Path to your logo in the public folder
          alt="VIA Logo"
          className="w-24 h-24 object-contain" // Customize size as needed
        />
      </div>
      {/* Login Form */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-left">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-500 rounded-md bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-500 rounded-md bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
