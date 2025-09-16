import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../../helpers/http-client";
import illustration from "../../../public/hello.png"; 

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Username and password are required!",
        confirmButtonText: "Try Again",
        customClass: {
          confirmButton: "bg-red-600 hover:bg-red-700 text-white",
        },
      });
      return;
    }

    try {
      const res = await API.post("/users/login", { username, password });
      const { token } = res.data;
      localStorage.setItem("access_token", token);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2500,
        background: "#ffffff",
        color: "#15803d",
        iconColor: "#15803d",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Incorrect username or password!",
        confirmButtonText: "Try Again",
        customClass: {
          confirmButton: "bg-red-600 hover:bg-red-700 text-white",
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-4xl overflow-hidden">
        {/* Left illustration */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
          <img src={illustration} alt="Illustration" className="w-3/4 h-auto" />
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-shadow shadow-md"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
