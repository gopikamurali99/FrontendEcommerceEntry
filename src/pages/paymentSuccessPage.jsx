import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';
import { useCart } from '../context/CartContext';

const SuccessPage = () => {
  const [shippingDetails, setShippingDetails] = useState(null);
   const { clearCart } = useCart();
  const [purchasedItemIds, setPurchasedItemIds] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const userId = localStorage.getItem('userId');
  const sessionId = localStorage.getItem('sessionId');
  
  useEffect(() => {
    const fetchCheckoutSession = async () => {
      const token = localStorage.getItem('customertoken');
      try {
        if (!sessionId) {
          console.error('Session ID is missing');
          return;
        }
        
        const response = await fetch(`${apiUrl}/customer/checkoutaddress?session_id=${sessionId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          console.error('Failed to fetch checkout session:', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        
        //setShippingDetails(data.shippingDetails);
        setShippingDetails({ ...data.shippingDetails, items: data.items });
        
        if (data.shippingDetails && data.shippingDetails.items) {
          const purchasedItemIds = data.shippingDetails.items.map(item => item._id);
          clearCartAfterPayment(userId, purchasedItemIds);

          setPurchasedItemIds(itemIds);
          setPaymentSuccess(true);
        }
      } catch (error) {
        console.error('Error fetching checkout session:', error);
      }
    };

    if (sessionId) {
      fetchCheckoutSession();
    }
  }, [sessionId, userId]);

  const handlePayment = async () => {
    // Simulate a payment success scenario
    const paymentSuccess = true; // Replace with actual payment logic

    if (paymentSuccess) {
      console.log('Payment successful!');

      try {
        await clearCart(); // Clear the cart after payment success
        console.log('Cart cleared successfully!');
      } catch (error) {
        console.error('Error clearing cart after payment:', error);
      }
    } else {
      console.log('Payment failed.');
    }
  };

  useEffect(() => {
    // Call handlePayment on component mount (e.g., after redirection from payment gateway)
    handlePayment();
  }, []);
  

  if (!shippingDetails) {
    return <p>Loading shipping details...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-10">
        <div className='text-center mb-6'>
          <img src='./images/check_mark.png' alt="checkmark image" 
          className="w-16 h-16 mx-auto" />

        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">Payment Successful</h2>
        <p className="text-center mb-6">Thank you for your purchase! Your payment was successful.</p>
        <div className="text-center">
          <p>Your order confirmation ID: <strong>{sessionId}</strong></p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
          <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
          
          <p><strong>Recipient Name:</strong> {shippingDetails.name}</p>
          <p><strong>Address:</strong> {shippingDetails.address.line1}, {shippingDetails.address.city}, {shippingDetails.address.state} {shippingDetails.address.postal_code}, {shippingDetails.address.country}</p>
          <p><strong>Contact:</strong> {shippingDetails.email}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Order Details</h3>
          {shippingDetails.items && shippingDetails.items.map((item, index) => (
            <div key={index} className="mb-4">
              <p><strong>Product Name:</strong> {item.name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <img src={item.images[0]} alt={item.name} className="w-32 h-32 object-cover" />
              <p><strong>Price:</strong> ₹{item.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="bg-black text-white py-2 px-4 rounded" onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
          </div>
          <div className="flex justify-center items-center">
      <img 
        src="./images/successful.avif" 
        alt="Right Side Illustration" 
        className="w-full h-auto rounded-lg " 
      />
    </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
