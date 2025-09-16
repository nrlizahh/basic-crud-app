import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../../helpers/http-client";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text: "Username and password are required!",
      });
      return;
    }

    try {
      const res = await API.post("/register", { username, password });

      Swal.fire({
        icon: "success",
        title: "Register Successful",
        text: "You can now login!",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-green-600 hover:bg-green-700 text-white",
        },
      });

      navigate("/login"); // redirect ke login
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text:
          err.response?.data?.message ||
          "Username already exists or something went wrong",
        confirmButtonText: "Try Again",
        customClass: {
          confirmButton: "bg-red-600 hover:bg-red-700 text-white",
        },
      });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="w-full max-w-md bg-opacity-80 p-8 rounded-lg shadow-2xl border-2 border-gray-300"
        style={{ backgroundColor: "#1a1b1e" }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-white bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-white bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
