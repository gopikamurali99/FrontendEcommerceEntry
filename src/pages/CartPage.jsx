import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/footer';

const CartPage = () => {
  const { cart, loading, removeFromCart,updateCartQuantity } = useCart();
  
  // State to track selected items
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Select all items by default when cart is loaded
    if (Array.isArray(cart.items)) {
      const allItemIds = cart.items.map(item => item._id);
      setSelectedItems(allItemIds);
    }
  }, [cart.items]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">Loading your cart...</h2>
        </div>
      </div>
    );
  }

  // Calculate the total amount of selected items
  const totalAmount = Array.isArray(cart.items) && cart.items.length > 0 
    ? cart.items.reduce((total, item) => {
        if (selectedItems.includes(item._id)) {
          const price = item.product?.price || 0;
          const quantity = item.quantity || 0;
          return total + price * quantity;
        }
        return total;
    }, 0)
    : 0;

  // Handle checkbox change
  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      // If item is already selected, unselect it
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      // Otherwise, add it to the selected items
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartQuantity(itemId, newQuantity); // Call the function from CartContext
  };
  const handleProceedToCheckout = () => {
    // Navigate to the order-placing page with selected items
    const selectedCartItems = cart.items.filter(item => selectedItems.includes(item._id));
    navigate('/order', { state: { selectedItems: selectedCartItems, totalAmount } });
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {Array.isArray(cart.items) && cart.items.length > 0 ? (
              cart.items.map((item) => (
                <div key={item._id} className="flex items-center mb-4">
                 
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)} // Control checkbox state
                    onChange={() => handleSelectItem(item._id)} // Toggle item selection
                    className="form-checkbox h-5 w-5 text-gray-500 mr-4"
                  />
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{item.product.name}</h3>
                    <p className="text-gray-700">Rs. {(item.product.price || 0).toFixed(2)}</p>
                   
                    <div className="flex items-center mt-2">
                      {/* Decrease quantity button */}
                      <span
                        className="material-icons cursor-pointer"
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      >
                        remove
                      </span>

                      {/* Quantity display */}
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="mx-2 text-center w-10 border border-gray-300"
                      />

                      {/* Increase quantity button */}
                      <span
                        className="material-icons cursor-pointer"
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      >
                        add
                      </span>
                    </div>
                    
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)} // Call removeFromCart when clicked
                    className="bg-red-500 text-white py-1 px-2 rounded ml-auto"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Checkout</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>Rs. {totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span>Rs. {totalAmount.toFixed(2)}</span>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded w-full" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CartPage;