import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import UserManagement from '../Admin/UserManagement';
import ProductManagement from '../Admin/ProductManagement';
import OrderManagement from '../Admin/OrderManagement';
import Analytics from '../Admin/Analytics';
import ApprovalManagement from './ProductApproval';
import AdminLogout from '../../Components/AdminLogout';
import Navbar from '../../Components/Navbar';
import AdminNavbarTop from '../../Components/AdminNavBarTop';
import Footer from '../../Components/footer';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const apiUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    // Fetch all admin products
    const fetchAdminProducts = async () => {
      const admintoken = localStorage.getItem('admintoken');
      try {
        const response = await axios.get(`${apiUrl}/admin/products`, {
          headers: {
            Authorization: `Bearer ${admintoken}`,
          },
        });
        setProducts(response.data.products);
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch analytics data (assuming there's an API for it)
   // const fetchAnalyticsData = async () => {
     // try {
      //  const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/analytics`);
     //   setAnalytics(response.data);
     // } catch (error) {
      //  console.error('Error fetching analytics:', error);
      //}
   // };

    fetchAdminProducts();
   // fetchAnalyticsData();
  }, []);

  return (
    <>
      <AdminNavbarTop/>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <aside className="col-span-3 bg-black text-neutral-50 p-4 rounded-lg ">
            <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
            <nav>
              <ul className="space-y-2">
                <li><Link to="/admin/users" className="block text-neutral-50">User Management</Link></li>
                <li><Link to="/admin/products" className="block text-neutral-50">Product Management</Link></li>
                <li><Link to="/admin/orders" className="block text-neutral-50">Order Management</Link></li>
                <li><Link to="/admin/analytics" className="block text-neutral-50">Analytics</Link></li>
                <li><Link to="/admin/pendingapproval" className="block text-neutral-50">Approval Awaiting Products</Link></li>
                <li><AdminLogout /></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="col-span-9 bg-white p-6 rounded-lg shadow-md">
            {/* Top section for displaying analytics */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics Overview</h2>
              <img src='./images/image-4.png' className='w-full h-62'></img>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
                  <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                  <p className="text-2xl font-bold text-blue-600">{analytics.totalUsers}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center shadow">
                  <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                  <p className="text-2xl font-bold text-green-600">{analytics.totalOrders}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center shadow">
                  <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                  <p className="text-2xl font-bold text-purple-600">${analytics.totalRevenue}</p>
                </div>
              </div>
            </section>

            {/* Lower section for displaying products */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Products Overview</h2>
              <div className="grid grid-cols-2 gap-4">
              {products && products.length === 0 ? (
  <p className="text-gray-600">No products found.</p>
) : (
  products && products.map((product) => (
    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      {product.images && product.images.length > 0 && (
        <img src={product.images[0]} alt={product.name} />
      )}
      <p className="text-gray-600">Price: ${product.price}</p>
    </div>
  ))
)}
              </div>
            </section>

            <Routes>
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/pendingapproval" element={<ApprovalManagement />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminPage;
