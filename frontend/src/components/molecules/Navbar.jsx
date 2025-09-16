import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // true jika ada token
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
      navigate("/login"); // arahkan ke login setelah logout
    } else {
      // Login
      navigate("/login");
    }
  };

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-wider">
        MyLogo
      </div>

      {/* Tombol Login/Logout */}
      <button
        onClick={handleAuthClick}
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
      >
        {isLoggedIn ? "Log Out" : "Sign In"}
      </button>
    </nav>
  );
}
