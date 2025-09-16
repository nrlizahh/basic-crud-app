import React, { useState, useEffect } from 'react';
import {API} from '../../../helpers/http-client';
import ProductList from '../organism/ProductList';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import Navbar from '../molecules/Navbar';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await API.get(`/products/?page=${page}&limit=10`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="max-w-xl mx-auto">

      <Navbar />
      
      <h1 className="text-2xl mb-4">Products</h1>
      <Button onClick={() => navigate('/add')}>Add Product</Button>
      <ProductList
        products={products}
        onDetail={(id) => navigate(`/detail/${id}`)}
        onEdit={(id) => navigate(`/edit/${id}`)}
        onDelete={handleDelete}
      />
      <div className="flex gap-2 mt-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
