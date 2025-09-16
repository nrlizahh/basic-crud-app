import React, { useState, useEffect } from "react";
import { API } from "../../../helpers/http-client";
import ProductList from "../organism/ProductList";
import { useNavigate } from "react-router-dom";
import Navbar from "../organism/Navbar";
import AddEditProductModal from "../molecules/AddEditProductPage";

export default function ProductListPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // <-- state modal

  const PRODUCTS_PER_PAGE = 10;

  const fetchProducts = async (currentPage) => {
    setLoading(true);
    try {
      const res = await API.get(
        `/products/?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`
      );
      const currentProducts = res.data.products || res.data;
      setProducts(currentProducts);

      const nextRes = await API.get(
        `/products/?page=${currentPage + 1}&limit=${PRODUCTS_PER_PAGE}`
      );
      const nextProducts = nextRes.data.products || nextRes.data;
      setHasNext(nextProducts.length > 0);
    } catch (err) {
      console.error(err);
      setHasNext(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch setiap page berubah
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // Handler buka modal create
  const handleCreate = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <Navbar onCreate={handleCreate} /> {/* <-- pass function ke navbar */}
      <div className="bg-gray-200 min-h-screen flex flex-col items-center p-4">
        <ProductList
          products={products}
          onDetail={(id) => navigate(`products/${id}`)}
        />

        <div className="flex gap-4 mt-8 justify-center">
          {/* Tombol Back */}
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || loading}
            className={`px-4 py-2 rounded border border-indigo-400 text-indigo-600 font-medium transition-colors 
              ${
                page === 1 || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-50"
              }`}
          >
            ← Back
          </button>

          {/* Tombol Next */}
          <button
            onClick={() => setPage(page + 1)}
            disabled={loading || !hasNext}
            className={`px-4 py-2 rounded border border-indigo-400 text-indigo-600 font-medium transition-colors 
              ${
                loading || !hasNext
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-50"
              }`}
          >
            Next →
          </button>
        </div>

        {loading && <p className="mt-4 text-gray-600">Loading products...</p>}
      </div>
      {/* Modal Add Product */}
      {modalOpen && (
        <AddEditProductModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => fetchProducts(page)} // refresh list setelah add
        />
      )}
    </div>
  );
}
