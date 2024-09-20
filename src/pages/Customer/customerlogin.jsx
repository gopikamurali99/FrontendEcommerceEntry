import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${apiUrl}/customer/login`,
        {
         email,
         password, 
        }
      );
      const {token}= response.data;
      localStorage.setItem('customertoken',token)
      console.log(response.data)
      navigate('/');
    }
    catch(error){
      if(error.response){
        setError(error.response.data.message);
      }
      else{
        setError('server error.Please try again later')
      }
    }
    console.log('Email:', email);
    console.log('Password:', password);
    console.log(token)
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen"
       style={{
            backgroundImage: `url(./images/BackgroundImage.jpeg)`,
               backgroundSize: 'cover',
                  backgroundPosition: 'center',
           }}
           >
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Login
          </button>
          
        </form>
        <div className="mt-4 text-center">
          Don't have an account? <Link to="/customer/signup" className="text-blue-500 hover:text-blue-600">Register</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default CustomerLogin;