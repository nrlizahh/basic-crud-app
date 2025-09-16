import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../../helpers/http-client";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await API.post("/login", { username, password });

      // Ambil token dari response
      const { token } = res.data;
      localStorage.setItem("access_token", token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      navigate("/"); // atau route home setelah login
    } catch (err) {
      console.error(err);
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
          Login
        </h2>
        <form onSubmit={handleLogin}>
          {/* Username  */}
          <div className="mb-4">
            <label
              htmlFor="login-username"
              className="block text-white font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="login-username"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-white bg-transparent"
              value={username} // ganti state dari email ke username
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="login-password"
              className="block text-white font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-white bg-transparent"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
