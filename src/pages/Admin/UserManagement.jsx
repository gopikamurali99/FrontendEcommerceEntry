// src/Pages/UserManagement.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/footer';
import AdminNavBar from '../../Components/AdminNavBar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchUsers = async () => {
      // Get the admin token from localStorage
      const admintoken = localStorage.getItem('admintoken');

      try {
        const response = await axios.get(`${apiUrl}/admin/customers`, {
          headers: {
            Authorization: `Bearer ${admintoken}`,
          },
        });

        // Assuming the response data is an array of users
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
       <Navbar/>
      
      <div className="grid grid-cols-12 gap-4">
        <div className='col-span-3 bg-gray-200 p-4 rounded-lg'>
      <AdminNavBar/>
      </div>
      <main className="col-span-9 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-2">{user._id}</td>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role || 'Customer'}</td> {/* Default to 'Customer' */}
                <td className="border border-gray-300 p-2">
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No users available</td>
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

export default UserManagement;
