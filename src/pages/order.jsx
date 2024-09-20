import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';
import Footer from '../Components/footer';

const Order = () => {
    const [addresses, setAddresses] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
       
        address1: '',
        address2: '',  // Added address2
        locality: '',
        zipCode: '',   // Changed to zipCode
        city: '',
        state: '',
        country: '',   // Added country
        addressType: 'Home', // Default value for addressType
        isDefault: false,    // Added default address field
    });
    const location = useLocation();
    const { selectedItems, totalAmount } = location.state || { selectedItems: [], totalAmount: 0 };
    const apiUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchAddresses = async () => {
            const token = localStorage.getItem('customertoken');
            if (!token) return;
            try {
                const response = await axios.get(`${apiUrl}/customer/youraddress`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('customertoken');
        if (!token) return;
        try {
            const response = await axios.post(`${apiUrl}/customer/address`, formData,{
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request
                }, 
            });
            setAddresses([...addresses, response.data]);
            setFormData({
                name: '',
                phone: '',
                address1: '',
                address2: '',  // Reset address2
                locality: '',
                zipCode: '',   // Reset zipCode
                city: '',
                state: '',
                country: '',   // Reset country
                addressType: 'Home', // Reset addressType
                isDefault: false,    // Reset default address
            });
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePaymentSubmit = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method");
            return;
        }
        // Integrate your payment processing logic here
        console.log("Processing payment with method:", paymentMethod);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 grid grid-cols-12 gap-8">
                {/* Left Section - Form */}
                <div className="col-span-8 bg-white p-6 border border-gray-200 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Add delivery address</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <span className="inline-block p-2 border border-gray-300 rounded-l-md">+91</span>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Mobile Number"
                                value={formData.phone}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-r-md"
                            />
                        </div>
                        
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="address1"
                                placeholder="Address (House No, Building, Street)"
                                value={formData.address1}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="address2"
                                placeholder="Address Line 2 (Optional)"
                                value={formData.address2}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="locality"
                                placeholder="Locality"
                                value={formData.locality}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="Zip Code"
                                value={formData.zipCode}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="mr-4">Address Type:</label>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="addressType"
                                    value="Home"
                                    checked={formData.addressType === 'Home'}
                                    onChange={handleChange}
                                />
                                Home
                            </label>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="addressType"
                                    value="Office"
                                    checked={formData.addressType === 'Office'}
                                    onChange={handleChange}
                                />
                                Office
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="addressType"
                                    value="Other"
                                    checked={formData.addressType === 'Other'}
                                    onChange={handleChange}
                                />
                                Other
                            </label>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={formData.isDefault}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label>Set As Default Address</label>
                        </div>
                        <div className="col-span-2">
                            <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
               
                {/* Right Section - Price Details */}
                <div className="col-span-4 bg-white p-6 border border-gray-200 shadow-md">
                    <h4 className="text-lg font-semibold">Price Details (4 items)</h4>
                    <div className="mt-4">
                        <p className="flex justify-between ">
                            <span>Total MRP:</span>
                            <span>Rs. {totalAmount.toFixed(2)}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Shipping charges:</span>
                            <span className="line-through">₹99</span>
                            <span className="text-green-500">Free</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Apply coupon:</span>
                            <span>Enter coupon code</span>
                        </p>
                        <hr className="my-4" />
                        <p className="flex justify-between font-bold">
                            <span>Total Amount:</span>
                            <span>Rs. {totalAmount.toFixed(2)}</span>
                        </p>
                    </div>
                </div>
                
                <div className="col-span-12">
                {selectedItems.map((item) => (
              <div key={item._id} className="flex items-center mb-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{item.product.name}</h3>
                  <p className="text-gray-700">Rs. {(item.product.price || 0).toFixed(2)}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
            </div>
          
            {/* Payment Options */}
            <section>
  <div className="mt-6">
    <h4 className="text-lg font-semibold mb-2">Payment Options</h4>
    <div className="grid grid-cols-1 gap-4">
      {["Credit/Debit Card", "UPI", "Net Banking", "Cash on Delivery (COD)"].map((option, idx) => (
        <label
          key={idx}
          className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg border hover:shadow-lg transition-shadow duration-200 ease-in-out"
        >
          <div className="flex items-center">
            {/* Add payment method icons here */}
            <span className="ml-2">{option}</span>
          </div>
          <input
            type="radio"
            name="paymentMethod"
            value={option}
            checked={paymentMethod === option}
            onChange={handlePaymentChange}
            className="ml-4"
          />
        </label>
      ))}
    </div>
    <button
      onClick={handlePaymentSubmit}
      className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
    >
      Proceed to Payment
    </button>
  </div>
</section>
           
          </div>
          <Footer/>
    </>
        
    );
};

export default Order;
