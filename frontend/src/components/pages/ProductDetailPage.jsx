import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../helpers/http-client";

export default function ProductDetail() {
  const { id } = useParams(); // ambil ID dari URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // Fetch product detail saat halaman di-load
  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        console.log(res.data, "<<< detail product");
        setProduct(res.data.product)}
      )
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch product");
      });
  }, [id]);

  // Hapus product
  const handleDelete = async () => {
    if (!window.confirm("Are you sure want to delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      alert("Product deleted!");
      navigate("/"); // kembali ke homepage
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/products/${product.id}/edit`)}
          className="bg-yellow-500 text-white py-2 px-4 rounded"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
