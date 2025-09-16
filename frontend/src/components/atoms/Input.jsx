import React from 'react';

export default function Input({ type='text', value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded p-2 w-full mb-2"
    />
  );
}
