// src/Pages/ViewApprovedProducts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellerNavbar from '../../Components/SellerNavbar';
import SellerSideNav from '../../Components/sellerSideNav';
const Allproducts = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_BASE_URL;

  // Fetch approved products on component mount
  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/seller/getproducts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApprovedProducts(response.data); // Assuming response data is an array of products
      } catch (error) {
        console.error('Error fetching approved products:', error);
        if (error.response) {
          setError(error.response.data.message || 'Failed to fetch approved products.');
        } else {
          setError('Server error. Please try again later.');
        }
      }
    };

    fetchApprovedProducts();
  }, [apiUrl]);

  return (
    <div>
      {/* Top Navbar */}
      <SellerNavbar />

      <div className="flex">
        {/* Side Navbar */}
        <div className="w-1/4 bg-black p-4">
          <SellerSideNav  />
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4">
          <h2 className="text-2xl font-bold mb-4">All Uploaded Products</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {approvedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedProducts.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 shadow-md bg-white"
                >
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  
                  <p className="font-bold">Price: ₹{product.price}</p>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                  <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No approved products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Allproducts;
