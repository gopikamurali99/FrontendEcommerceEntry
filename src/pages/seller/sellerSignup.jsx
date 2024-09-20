import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/footer';
; // Adjust path as necessary

const SellerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/seller/signup', {
        name,
        email,
        password,
        phone,
      });
      console.log(response.data);
      alert('Signup successful! Please check your email for verification.');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Server error. Please try again later.');
      }
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <Navbar />
      <div 
        className="flex justify-center items-center h-screen bg-gray-100" 
        style={{
          backgroundImage: 'url(./images/HomeImage1.png)', // Use imported image here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col md:flex-row" style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with 80% opacity
          borderRadius: '10px', // Rounded corners
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // Optional shadow for better visibility
          width: '100%',
          maxWidth: '4xl'
        }}>
          {/* Left Side Text */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4">Become a Seller</h2>
            <p className="text-lg text-gray-600 mb-6">
              Want to become a seller? Register here to start your journey with us!
            </p>
            <p className="text-sm text-gray-500">
              Join our community of sellers and reach a wider audience. It's quick and easy!
            </p>
          </div>

          {/* Right Side Form */}
          <div className="md:w-1/2 p-8">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-red-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-red-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-red-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-red-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full transition duration-200 ease-in-out"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerRegister;