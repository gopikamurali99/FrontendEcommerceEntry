import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import AdminNavBar from '../../Components/AdminNavBar';
import AdminNavbarTop from '../../Components/AdminNavBarTop';
import Footer from '../../Components/footer';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    // Fetch products from the backend API
    const fetchProducts = async () => {
      const adminToken = localStorage.getItem('admintoken');
      try {
        const response = await axios.get(`${apiUrl}/admin/products`,{
          headers: {
            Authorization: `Bearer ${adminToken}`,  // Set Authorization header
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AdminNavbarTop/>
      
      <div className="grid grid-cols-12 gap-4">
        <div className='col-span-3 bg-gray-200 p-4 rounded-lg'>
      <AdminNavBar/>
      </div>
      <main className="col-span-9 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
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
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product._id}>
                <td className="border border-gray-300 p-2">{product._id}</td>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">${product.price.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
      </main>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductManagement;
