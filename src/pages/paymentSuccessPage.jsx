import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';

const SuccessPage = () => {
  const [shippingDetails, setShippingDetails] = useState(null);
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
        }
      } catch (error) {
        console.error('Error fetching checkout session:', error);
      }
    };

    if (sessionId) {
      fetchCheckoutSession();
    }
  }, [sessionId, userId]);

  const clearCartAfterPayment = async (userId, purchasedItemIds) => {
    try {
      const response = await fetch(`${apiUrl}/customer/clearorderitem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          itemIds: purchasedItemIds,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Items removed from cart:', data.message);
      } else {
        console.error('Error removing items from cart:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!shippingDetails) {
    return <p>Loading shipping details...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Payment Successful</h2>
        <p className="text-center mb-6">Thank you for your purchase! Your payment was successful.</p>
        <div className="text-center">
          <p>Your order confirmation ID: <strong>{sessionId}</strong></p>
        </div>
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
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
