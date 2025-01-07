import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';

const CustomerSignUp = () => {
const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);
  const[showPasswordRules, setPasswordRules] = useState(false);
  const[validation, setValidation] = useState({
    length:false,
    uppercase:false,
    lowercase:false,
    number:false,
    specialChar:false,
  });
  const apiUrl = import.meta.env.VITE_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Name || !email || !password) {
      setError('Please fill in all fields');
      alert("please fill all the feilds")
      return;
    }
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
        console.log(error.response);
         // Check if the backend response contains a message for existing customer
      if (error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set the error message from the backend
        alert(error.response.data.message); // Show the alert with the message
      } else {
        setError('An error occurred');
        alert('An error occurred');
      }
      
      }
      else{
        setError('server error.please try again later');

      }

    }
   
    
  };
  const validatePassword = (password)=>{
    try {
      const rules = {
        length:password.length>=8,
        uppercase:/[A-Z]/.test(password),
        lowercase:/[a-z]/.test(password),
        number:/[0-9]/.test(password),
        specialChar:/[!@#$%^&*(),.?":{}|<>]/.test(password),
      }
      setValidation(rules)
      const allSatisfied = Object.values(rules).every((rule)=>rule === true);
      if(allSatisfied){
        setPasswordRules(false)
      }
      console.log("validation function called")
    } catch (error) {
       console.error(error)
       
    }
    
  }


    //function to handle password
    const handlePasswordChange = (e)=>{
      try {
        const newPassword = e.target.value;
        setPassword(newPassword)
        console.log(password)
        validatePassword(newPassword)
        console.log("function called")
      } catch (error) {
         console.error(error)
         console.log("an error occured",error)
      }
      
    }
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
    <div className='bg-white flex items-center shadow-lg rounded-lg overflow-hidden max-w-4xl '>
        <div className=' w-1/2 p-8 '>

        <h2 className='text-2xl font-bold mb-4'>Create your account</h2>
             
            <form className=' flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor="Name">Name:</label>
            <input type="text"  placeholder='enter your email id' id='Name' value={Name} onChange={(e) => setName(e.target.value)} className='mb-4 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-blue-400' />
                <label htmlFor="email">Email:</label>
                <input type="email"  placeholder='enter your email id' id='email' value={email}
              onChange={(e) => setEmail(e.target.value)} className='mb-4 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-blue-400' />
                <label htmlFor="email">Password:</label>
                <input type="password" placeholder='enter password' id='pass' className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-blue-400 '
                onFocus={()=>setPasswordRules(true)}
                value={password}
                onChange={handlePasswordChange}
                />
                
                 {/* password rules*/}
                 { showPasswordRules && (
                    <div className='text-sm w-full'>
                      <p className='text-gray-600 font-medium'>Password must:</p>
                      <ul className='list-disc list-inside text-gray-600'>
                        <li className={`flex items-center ${validation.length?"text-green-500":"text-red-500"}`}>
                          Be at least 8 characters long
                        </li>
                        <li className={`flex items-center ${validation.lowercase?"text-green-500":"text-red-500"}`}>
                         Include atleast one lowercase letter
                        </li>
                        <li className={`flex items-center ${validation.uppercase?"text-green-500":"text-red-500"}`}>
                          Include atleast one uppercase letter
                        </li>
                        <li className={`flex items-center ${validation.number?"text-green-500":"text-red-500"}`}>
                          Include atleast one number
                        </li>
                        <li className={`flex items-center ${validation.specialChar?"text-green-500":"text-red-500"}`}>
                          Include atleast one special character
                        </li>
                      </ul>
                    </div>
                   )}
                   <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full mt-6"
          >
            Register
          </button>

            </form>
            
          
    <p className='text-sm text-gray-500 mt-4'>Already have an account?{" "} <Link to="/customer/signin" className="text-blue-500 hover:underline">
              Login
            </Link></p>
        
        </div>
       <div className='w-1/2 relative bg-gray-100 flex justify-center items-center mr-6'>
       
       <img src="/images/customersignin.avif" alt="" className='w-full h-[500px] object-cover'/>
      
        
       </div>
        </div>

      </div>
    </>
  );
};

export default CustomerSignUp;