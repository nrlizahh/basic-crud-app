import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar({ onCreate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthClick = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      localStorage.removeItem("access_token");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const handleCreateClick = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please login first to create a product",
        confirmButtonColor: "#1d4ed8",
      });
    } else {
      onCreate(); // buka modal
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/" || path === "/products") return "Product List";
    if (path.startsWith("/products/")) return "Detail Product";
    return "My Product";
  };

  return (
    <nav className="bg-blue-200 text-black sticky top-0 z-50 shadow-lg px-6 py-4 flex justify-between items-center">
      <div
        className="text-xl font-extrabold tracking-wider cursor-pointer"
        onClick={() => navigate("/")}
      >
        {getPageTitle()}
      </div>

      <div className="flex items-center gap-4 mt-2">
        {/* Tombol Create selalu muncul */}
        <span
          onClick={handleCreateClick}
          className="hover:underline cursor-pointer"
        >
          Create Product
        </span>

        <div className="h-6 border-l border-gray-400"></div>

        <span
          onClick={handleAuthClick}
          className="hover:underline cursor-pointer"
        >
          {localStorage.getItem("access_token") ? "Logout" : "Login"}
        </span>
      </div>
    </nav>
  );
}
