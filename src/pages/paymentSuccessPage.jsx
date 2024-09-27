import React,{useState,useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';

const SuccessPage = () => {
  // Get the session_id from the URL query parameters
  const [shippingDetails, setShippingDetails] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id'); 
 
  const userId = localStorage.getItem('userId'); 
 

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
