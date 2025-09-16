import React from "react";
import Button from "../atoms/Button";

export default function ProductCard({ product, onDetail, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5 mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h3>
      {product.description && (
        <p className="text-gray-600 mb-4">{product.description}</p>
      )}
      <div className="flex gap-3">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          onClick={() => onDetail(product.id)}
        >
          Detail
        </Button>
        <Button
          className="bg-green-500 text-white hover:bg-green-600 transition-colors"
          onClick={() => onEdit(product.id)}
        >
          Edit
        </Button>
        <Button
          className="bg-red-500 text-white hover:bg-red-600 transition-colors"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
