// src/Pages/Analytics.js

import React from 'react';
import AdminNavbarTop from '../../Components/AdminNavBarTop';
import AdminNavBar from '../../Components/AdminNavBar';
import Footer from '../../Components/footer';

const Analytics = () => {
  // Sample analytics data
  const totalUsers = 100;
  const totalProducts = 50;
  const totalOrders = 75;

  return (
    <div>
      <AdminNavbarTop/>
      <div className="grid grid-cols-12 gap-4">
        <div className='col-span-3 bg-gray-200 p-4 rounded-lg'>
      <AdminNavBar/>
      </div>
      <main className="col-span-9 bg-white p-6 rounded-lg shadow-md">
      <div className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold">Total Users</h3>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold">Total Products</h3>
          <p className="text-2xl">{totalProducts}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold">Total Orders</h3>
          <p className="text-2xl">{totalOrders}</p>
        </div>
      </div>
    </div>
    </main>
    
    </div>
    <Footer/>
    </div>
  );
};

export default Analytics;