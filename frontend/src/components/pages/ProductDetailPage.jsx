import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../../helpers/http-client";
import Navbar from "../molecules/Navbar";
import AddEditProductModal from "../pages/AddProductPage"; // import modal

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // state modal
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  // Fetch product
  const fetchProduct = () => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch product", "error");
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please login first to delete a product",
        confirmButtonColor: "#1d4ed8",
      });
      return;
    }

    try {
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to delete",
        "error"
      );
    }
  };

  const handleEdit = () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please login first to edit a product",
        confirmButtonColor: "#1d4ed8",
      });
      return;
    }
    setModalOpen(true); // buka modal edit
  };

  if (!product) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div>
      <Navbar />

      <div className="max-w-md mx-auto p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-xl shadow-[0_4px_15px_0_rgba(59,130,246,0.5)] overflow-hidden">
          {/* Gambar produk */}
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 sm:h-72 md:h-96 object-cover"
          />

          {/* Nama & deskripsi */}
          <div className="p-4 sm:p-6 flex flex-col items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">
              {product.name}
            </h1>
            <p className="text-gray-700 sm:text-base md:text-lg mt-2 text-center">
              {product.description}
            </p>

            {/* Tombol edit/delete selalu muncul */}
            <div className="w-full flex justify-between mt-6 px-2">
              <button
                onClick={handleDelete}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal edit product */}
      {modalOpen && (
        <AddEditProductModal
          product={product} // kirim data lama ke modal
          onClose={() => setModalOpen(false)}
          onSuccess={fetchProduct} // refresh setelah edit
        />
      )}
    </div>
  );
}
