// src/Pages/ApprovalManagement.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import AdminNavBar from '../../Components/AdminNavBar';
import Footer from '../../Components/footer';

const ApprovalManagement = () => {
  const [products,setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_BASE_URL

  useEffect( () =>{
    const fetchPendingProducts = async () => {
      try{
           const token = localStorage.getItem('admintoken');
           const response = await axios.get(`${apiUrl}/admin/products/pending`,{
            headers:{
              Authorization:`Bearer ${token}`,
            },
           });
           setProducts(response.data);
      }    
      catch(error){
        
          console.log('Error fetching pending products:',error);
        }
      }
      
      fetchPendingProducts();
    },[]);
    const handleApprove = async (productId) =>{
      try{
        const token = localStorage.getItem('admintoken');
        await axios.put(`${apiUrl}/admin/products/approve/${productId}`,{},{
          headers:{
            Authorization:`Bearer ${token}`,
          },

        });

      }
      catch(error){
        console.error('Error approving product:', error);
      }
    }

    const handleReject = async (productId) => {
      try{
        const token = localStorage.getItem('admintoken');
        await axios.put(`${apiUrl}/admin/products/reject/${productId}`,{},{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        });
      }
      catch(error){
      console.error('Error approving product:', error);
    }};
  return (
   
    <div>
       <Navbar/>
      
      <div className="grid grid-cols-12 gap-4">
        <div className='col-span-3 bg-gray-200 p-4 rounded-lg'>
      <AdminNavBar/>
      </div>
      <main className="col-span-9 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Approval Management</h2>
      {/* Table to display products waiting for approval */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Product ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Seller ID</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Brand</th>
            <th className="border border-gray-300 p-2">Current Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2">{product._id}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.seller}</td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">{product.brand}</td>
              <td className="border border-gray-300 p-2">
                {product.approved ? 'Approved' : 'Pending'}
              </td>
              <td className="border border-gray-300 p-2">
                {!product.approved && (
                  <>
                    <button
                      className="text-green-500"
                      onClick={() => handleApprove(product._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => handleReject(product._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </main>
      </div>
      <Footer/>
    </div>
  );
};

export default ApprovalManagement;