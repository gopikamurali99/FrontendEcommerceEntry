import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AdminLogout=()=>{
    const navigate= useNavigate();

    const handleLogout = async()=>{
        try{
            await axios.post('http://localhost:3000/admin/logout',{},{
                withCredentials:true
            })
            localStorage.removeItem('admintoken');

            navigate('/adminlogin');

            alert('logout successful!')

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

export default AdminLogout;