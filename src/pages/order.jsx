import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useLocation,useNavigate } from 'react-router-dom';
import Footer from '../Components/footer';
import {jwtDecode} from 'jwt-decode'

const Order = () => {
    const [orders,setOrders]=useState([]);
    const [loading, setLoading]=useState(true)
    const[error,setError]=useState(null);
    const apiUrl= import.meta.env.VITE_BASE_URL 
    

    useEffect(()=>{
        const fetchOrders= async ()=>{
            const token = localStorage.getItem('customertoken')
            console.log("Token:", token); // Debugging line
        console.log("API URL:", apiUrl);
            if(!token){
                setError('User not authenticated')
                return;
            }
            try{
                const response = await axios.get(`${apiUrl}/customer/order`,{
                    headers: { Authorization: `Bearer ${token}` }
                })
              setOrders(response.data)
            }
            catch(error){
                console.error('Error fetching orders:', error);
                
                if (error.response) {
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', error.response.data);
                }
                setError('Error fetching orders');  
            }
            finally {
                setLoading(false);
            }
        }
        fetchOrders();
    },[])
    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;
    return(
        <>
        <Navbar/>
        <div className='container mx-auto p-10'>
        <h2 className='text-3xl font-bold mb-4 text-center'>My Orders</h2>
        {orders.length === 0 ? (
            <p className="text-center">You have no orders yet.</p>
        ) : (
            orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4 shadow-md mb-4">
                    <h3 className="font-semibold">Order ID: {order._id}</h3>
                    <p>Status: <span className="capitalize">{order.status}</span></p>
                    <p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
                    <div className="mt-2">
                        {order.items.map((item, index) => (
                            <div key={index} className="mb-4">
                                <p><strong>Product Name:</strong> {item.name}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <img src={item.images[0]} alt={item.name} className="w-32 h-32 object-cover" />
                                <p><strong>Price:</strong> ₹{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        )}
    </div>
    <Footer/>
        </>
    )         
}
export default Order;


