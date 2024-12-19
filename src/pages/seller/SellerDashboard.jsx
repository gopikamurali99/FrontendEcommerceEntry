// src/Pages/SellerDashboard.js

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import ViewApprovedProducts from './ApprovedProducts';
import UpdateProduct from './updateProduct';
import Profile from './Profile';
import OrderManagement from './OrderManagement';
import Logout from '../../Components/sellerlogout';
import Navbar from '../../Components/Navbar';
const SellerDashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Seller Dashboard</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li><Link to="/seller/addproduct" className="text-blue-600">Add Product</Link></li>
          <li><Link to="/seller/approvedproducts" className="text-blue-600">View Approved Products</Link></li>
          <li><Link to="/seller/updateproduct" className="text-blue-600">Update Product</Link></li>
          <li><Link to="/seller/profile" className="text-blue-600">Profile</Link></li>
          <li><Link to="/seller/orders" className="text-blue-600">Orders</Link></li>
          <li><Logout/></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/seller/addproduct" element={<AddProduct />} />
        <Route path="/seller/approvedproducts" element={<ViewApprovedProducts />} />
        <Route path="/seller/updateproduct" element={<UpdateProduct />} />
        <Route path="/seller/profile" element={<Profile />} />
        <Route path="/seller/orders" element={<OrderManagement />} />
      </Routes>
    </div>
    </>
  );
};

export default SellerDashboard;