import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import AddProduct from '../pages/seller/AddProduct';
import ViewApprovedProducts from '../pages/seller/ApprovedProducts';
import Profile from '../pages/seller/Profile';
import Allproducts from '../pages/seller/Allproduct';
import Logout from './sellerlogout';

const SellerSideNav = () => {
  return (
    <div className="flex h-screen sticky top-0">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-4 ">
        <h2 className="text-xl font-bold mb-6">Seller Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/seller/addproduct" className="hover:underline">
                Add Product
              </Link>
            </li>
            <li>
              <Link to="/seller/approvedproduct" className="hover:underline">
                Approved Products
              </Link>
            </li>
            <li>
              <Link to="/seller/profile" className="hover:underline">
                Your Profile
              </Link>
            </li>
            <li>
              <Link to="/seller/allproducts" className="hover:underline">
                All Products
              </Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 ">
        <Routes>
          <Route path="/seller/addproduct" element={<AddProduct />} />
          <Route path="/seller/approvedproduct" element={<ViewApprovedProducts />} />
          <Route path="/seller/profile" element={<Profile />} />
          <Route path="/seller/allproducts" element={<Allproducts/>} />
        </Routes>
      </main>
    </div>
  );
};

export default SellerSideNav;
