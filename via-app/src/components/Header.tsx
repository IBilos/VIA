import React, { useState, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";
import { User } from "../types";

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = logout();
    if (isLogout) {
      alert("Uspješno ste se odjavili!");
      navigate("/login");
    } else {
      alert("Greška kod odjave");
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    //Header
    <div className="top-0 w-screen bg-blue-500 text-white p-2 flex justify-between items-center flex-row">
      {/* Toggle Button */}
      <div className="flex flex-row items-start">
        {/*Logo*/}
        <img src="/logo.png" alt="VIA-logo" className="h-10 w-auto mr-4" />
      </div>

      <div className="flex flex-row justify-center items-center">
        {/*Person icon*/}
        <BsPerson size={24} />
        {user && <span className="text-lg">{user.username}</span>}
        <button
          onClick={handleLogout}
          className="py-2 px-4  text-white rounded cursor-pointer hover:bg-blue-600 flex items-center transition-all duration-500 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
