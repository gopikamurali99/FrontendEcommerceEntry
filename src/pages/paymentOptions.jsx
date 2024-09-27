import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'; // For API requests
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY); // Use your actual publishable key

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const stripe = useStripe();
    const elements = useElements();
    const { selectedItems, totalAmount,client_secret } = location.state || { selectedItems: [], totalAmount: 0, client_secret: ''  };
    const apiUrl= import.meta.env.VITE_BASE_URL
    const { userId } = useParams();
    console.log("User ID:", userId); 
    console.log("Selected Items:", selectedItems); // Log selected items
    console.log("Total Amount:", totalAmount);
    useEffect(() => {
        
        // Call your backend to create a payment intent
        const createPaymentIntent = async () => {

            const token = localStorage.getItem('customertoken'); // Retrieve token here if needed

        if (!token) {
            console.error("Token is missing, cannot create payment intent.");
            return; // Prevent API call if no token
        }
            try {
                
                const { data } = await axios.post(`${apiUrl}/customer/payment/${userId}`, {
                    amount: totalAmount,
                    items: selectedItems
                },{
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request
            }});
                setClientSecret(data.client_secret);
                console.log("API Response:", data);  // Save the client secret to state
            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        };

        if (paymentMethod === 'card') {
            createPaymentIntent();
        }
    }, [paymentMethod, totalAmount, selectedItems]);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return; // Stripe.js has not loaded yet.
        }
        console.log('Client secret before payment:', client_secret);
        const cardElement = elements.getElement(CardElement);

        try {
            // Confirm the payment using the client secret from the backend
            const { paymentIntent, error } = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (error) {
                console.error('Payment failed:', error);
                alert(error.message); // Handle error
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                // Payment succeeded, create order
                await createOrder();
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    const createOrder = async () => {
        try {
            // Send the order data to your backend after payment success
            const { data } = await axios.post('/customer/orders', {
                items: selectedItems,
                totalAmount,
                paymentMethod: 'card'
            });

            // Navigate to the order confirmation page
           // navigate('/order-confirmation', {
             //   state: { selectedItems, totalAmount, paymentMethod: 'card', orderId: data.order._id }
            //});
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <Elements stripe={stripePromise}>
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Payment Options</h2>

                <div className="bg-white p-6 shadow-md rounded-lg mb-4">
                    <h4 className="text-lg font-semibold mb-2">Selected Items</h4>
                    <ul>
                        {selectedItems.map((item) => (
                            <li key={item._id} className="flex justify-between items-center mb-2">
                                <span>{item.name}</span>
                                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4 font-bold">
                        <span>Total Amount:</span>
                        <span>Rs. {totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Select Payment Method</h4>

                    {/* Payment with card */}
                    <form onSubmit={handlePaymentSubmit}>
                        <div className="mb-4">
                            <CardElement />
                        </div>
                        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-lg">
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </Elements>
    );
};

export default PaymentPage;
