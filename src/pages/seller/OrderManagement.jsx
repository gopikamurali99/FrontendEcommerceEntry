// src/Pages/OrderManagement.js

import React from 'react';
import Navbar from '../../Components/Navbar';

const OrderManagement = () => {
  // Sample orders data
  const orders = [
    { id: 1, user: 'John Doe', total: 49.99, status: 'Shipped' },
    { id: 2, user: 'Jane Smith', total: 19.99, status: 'Pending' },
  ];

  return (
    <div>
      <Navbar/>
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.user}</td>
              <td className="border border-gray-300 p-2">${order.total.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;