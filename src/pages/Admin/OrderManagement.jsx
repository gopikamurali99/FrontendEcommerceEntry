// src/Pages/OrderManagement.js

import React from 'react';
import Navbar from '../../Components/Navbar';
import AdminNavBar from '../../Components/AdminNavBar';

const OrderManagement = () => {
  const orders = [
    { id: 1, user: 'John Doe', total: 49.99, status: 'Shipped' },
    { id: 2, user: 'Jane Smith', total: 19.99, status: 'Pending' },
    // Add more orders as needed
  ];

  return (
   
    <div>
       <Navbar/>
      
      <div className="grid grid-cols-12 gap-4">
        <div className='col-span-3 bg-gray-200 p-4 rounded-lg'>
      <AdminNavBar/>
      </div>
      <main className="col-span-9 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.user}</td>
              <td className="border border-gray-300 p-2">${order.total.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">{order.status}</td>
              <td className="border border-gray-300 p-2">
                <button className="text-red-500">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </main>
      </div>
    </div>
  );
};

export default OrderManagement;