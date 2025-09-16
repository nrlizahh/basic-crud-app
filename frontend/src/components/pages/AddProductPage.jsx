import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../../helpers/http-client";

export default function AddEditProductPage() {
  const { id } = useParams(); // kalau edit
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // ambil token setiap render
  const token = localStorage.getItem("access_token");
  if (!token) {
    Swal.fire("Unauthorized", "Please login first", "warning");
    navigate("/login");
  }

  // kalau edit → fetch data lama
  useEffect(() => {
    if (id) {
      API.get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const p = res.data.product;
          setName(p.name);
          setDescription(p.description);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Error", "Failed to load product", "error");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // EDIT
        await API.put(
          `/products/${id}`,
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire("Success", "Product updated successfully", "success");
      } else {
        // ADD
        await API.post(
          "/products",
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire("Success", "Product added successfully", "success");
      }

      navigate("/"); // kembali ke list
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl text-white mb-4">
        {id ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Description</label>
          <textarea
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          {loading ? "Saving..." : id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
