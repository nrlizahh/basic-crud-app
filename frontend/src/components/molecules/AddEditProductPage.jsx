import { useState } from "react";
import Swal from "sweetalert2";
import { API } from "../../../helpers/http-client";

export default function AddEditProductModal({ product, onClose, onSuccess }) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        // EDIT
        await API.put(
          `/products/${product.id}`,
          { name, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Product updated successfully",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          color: "#1d4ed8",
          iconColor: "#1d4ed8",
        });
      } else {
        // ADD
        await API.post(
          "/products",
          { name, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Product added successfully",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          color: "#1d4ed8",
          iconColor: "#1d4ed8",
        });
      }

      onSuccess(); 
      onClose();   
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-blue-200 rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-2xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {product ? "Edit Product" : "Create Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-shadow shadow-md"
          >
            {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
