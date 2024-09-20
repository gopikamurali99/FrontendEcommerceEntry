// src/Pages/ViewApprovedProducts.js

import React from 'react';
import Navbar from '../../Components/Navbar';

const ViewApprovedProducts = () => {
  // Sample approved products data
  const approvedProducts = [
    { id: 1, name: 'Women Dress', price: 29.99 },
    { id: 2, name: 'Women Top', price: 19.99 },
  ];

  return (
    <div>
      <Navbar/>
      <h2 className="text-2xl font-bold mb-4">Approved Products</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {approvedProducts.map(product => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">${product.price.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApprovedProducts;