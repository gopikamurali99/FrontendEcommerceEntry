// src/Pages/AddProduct.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category:'',
    brand:'',
    images: [],
    inventory: '',
    sku: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl =import.meta.env.VITE_BASE_URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await axios.post(`${apiUrl}/seller/addproduct`, product, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      console.log('Product added:', response.data);
      alert('Product added successfully!');
      setProduct({ name: '', price: '', description: '', images: [], inventory: '', sku: '' }); // Reset form
      navigate('/seller'); // Redirect to seller dashboard or another page
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Server error. Please try again later.');
      }
      console.error('Error adding product:', error);
    }
  };

  return (
  <>
  <Navbar/>
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">Product Ctegory</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">Product brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block font-bold mb-2">Images (comma-separated URLs)</label>
            <input
              type="text"
              id="images"
              name="images"
              value={product.images.join(', ')} // Join array for input
              onChange={(e) => setProduct({ ...product, images: e.target.value.split(',').map(img => img.trim()) })} // Split input into array
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="inventory" className="block font-bold mb-2">Inventory</label>
            <input
              type="number"
              id="inventory"
              name="inventory"
              value={product.inventory}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sku" className="block font-bold mb-2">SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddProduct;

