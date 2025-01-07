import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/footer';

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
      const {token,userId}= response.data;
      localStorage.setItem('customertoken',token)
      localStorage.setItem('userId',userId)
      console.log(response.data)
      console.log(token)
      console.log(userId)
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
  const backgroundImage = {
    backgroundImage: "url('/images/signupbg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh', // Ensure full height even if content is less
  width: '100%', // Optional: makes the background image fixed when scrolling
  };
  return (
    <>
   <Navbar/>
    <div style={backgroundImage} className="py-16 flex items-center justify-center min-h-screen">
    <div className='bg-white flex items-center shadow-lg rounded-lg overflow-hidden max-w-4xl  '>
        <div className=' w-1/2 p-8 '>

        <h2 className='text-2xl font-bold mb-4'>Login to your account</h2>
             
            <form className=' flex flex-col' onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
                <label htmlFor="email">Email:</label>
                <input type="email"  placeholder='enter your email id' id='email' value={email}
              onChange={(e) => setEmail(e.target.value)} className='mb-4 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-blue-400' />
                <label htmlFor="email">Password:</label>
                <input type="password" placeholder='enter password' id='pass' className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-blue-400 '
               
                value={password}
               
                onChange={(e) => setPassword(e.target.value)}
                />
                
                
                   <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full mt-6"
          >
            SignIn
          </button>

            </form>
            
          
    <p className='text-sm text-gray-500 mt-4'>Don't you have an account?{" "} <Link to="/customer/signup" className="text-blue-500 hover:underline">
              SignUp
            </Link></p>
        
        </div>
       <div className='w-1/2 relative bg-gray-100 flex justify-center items-center '>
       
       <img src="/images/loginCustomer1.avif" alt="" className='w-full h- object-cover'/>
      
        
       </div>
        </div>

      </div>
    <Footer/>
    </>
  );
};

export default CustomerLogin;