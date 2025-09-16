import React from 'react';
import ProductCard from '../molecules/ProductCard';

export default function ProductList({ products, onDetail, onEdit, onDelete }) {
  return (
    <div>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onDetail={onDetail}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
