import React,{useState,useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';

const SuccessPage = () => {
  // Get the session_id from the URL query parameters
  const [shippingDetails, setShippingDetails] = useState(null);
  const [searchParams] = useSearchParams();
 // const sessionId = searchParams.get('session_id'); 
  const apiUrl= import.meta.env.VITE_BASE_URL 
  const userId = localStorage.getItem('userId'); 
  const sessionId = localStorage.getItem('sessionId')
  console.log(sessionId)
  useEffect(() => {
    const fetchCheckoutSession = async () => {
      const token = localStorage.getItem('customertoken');
      try {
        if (!sessionId) {
          console.error('Session ID is missing from URL');
          return;
        }
        else{
          console.log(sessionId)
        }
        const response = await fetch(`${apiUrl}/customer/checkoutaddress?session_id=${sessionId}`,
          {method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        setShippingDetails(data.shippingDetails);
        console.log(data.setShippingDetails)

        // Clear the cart after successful payment
        if (response.ok) {
          const purchasedItemIds = data.shippingDetails.items.map(item => item._id); // Assuming `items` contains the purchased items
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
          {/* Optionally, you could fetch the order details from your backend using the sessionId */}
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
          <p><strong>Recipient Name:</strong> {shippingDetails.name}</p>
          <p><strong>Address:</strong> {shippingDetails.address.line1}, {shippingDetails.address.city}, {shippingDetails.address.state} {shippingDetails.address.postal_code}, {shippingDetails.address.country}</p>
          <p><strong>Contact:</strong> {shippingDetails.email}</p>
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
