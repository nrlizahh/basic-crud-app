import React from 'react';

export default function Button({ children, onClick, type='button', disabled }) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
