import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import AdminNavBar from '../../Components/AdminNavBar';
import AdminNavbarTop from '../../Components/AdminNavBarTop';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const apiUrl = import.meta.env.VITE_BASE_URL; // API URL from environment variable

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('admintoken'); // Replace with your token key
      if (!token) {
        alert('Please log in to view orders');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/admin/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log('API Response:', response); // Log the response to debug
        setOrders(response.data || []); // Directly set the response data
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.response ? error.response.data.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center">Loading orders...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <AdminNavbarTop />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
          <AdminNavBar />
        </div>
        <main className="col-span-9 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Management</h2>
          {orders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Order ID</th>
                  <th className="border border-gray-300 p-2">Customer Name</th>
                  <th className="border border-gray-300 p-2">Total</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  // Calculate total from items
                  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                  return (
                    <tr key={order._id}>
                      <td className="border border-gray-300 p-2">{order._id}</td>
                      <td className="border border-gray-300 p-2">{order.shippingDetails.name}</td>
                      <td className="border border-gray-300 p-2">${total.toFixed(2)}</td>
                      <td className="border border-gray-300 p-2">{order.status || 'N/A'}</td>
                      <td className="border border-gray-300 p-2">
                        <button className="text-red-500">Cancel</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrderManagement;
