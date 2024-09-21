import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';

const CustomerSignUp = () => {
const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = import.meta.env.VITE_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(`${apiUrl}/customer/signup`,{
        Name,
        email,
        password,
    })
    console.log(response.data)
    alert('signup successful!Please check your email for verification');
  }
    catch(error){
      if(error.response){
        setError(error.response.data.message);
      }
      else{
        setError('server error.please try again later');

      }

    }
   
    console.log('Name:',Name)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
    <Navbar/>
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
    <div className="hidden md:block" 
    style={{
      backgroundImage: `url(/images/customersignin.avif)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}/>
      <div className="flex justify-center items-center bg-slate-100">
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
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
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Register
          </button>
          <div className="mt-4 text-center">
           <Link to="/customer/signin" className="text-blue-500 hover:text-blue-600">SignIn</Link>
        </div>
        </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default CustomerSignUp;