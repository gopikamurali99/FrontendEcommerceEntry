import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Logout=()=>{
    const navigate= useNavigate();

    const handleLogout = async()=>{
        try{
            await axios.post('http://localhost:3000/seller/signout',{},{
                withCredentials:true
            })
            localStorage.removeItem('token');

            navigate('/sellerlogin');

            alert('signup successful!Please check your email for verification')

        }
        catch(error){
            console.log('logout error',error)
        }
    }

return(
<>
<button onClick={handleLogout}
  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md">Logout</button>
</>
)
}

export default Logout;