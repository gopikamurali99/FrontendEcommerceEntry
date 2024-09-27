import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';

const CancelPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Payment Canceled</h2>
        <p className="text-center mb-6">Your payment was not completed. You can try again or continue shopping.</p>
        <div className="text-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => window.location.href = '/cart'}>
            Go to Cart
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded ml-4" onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CancelPage;
