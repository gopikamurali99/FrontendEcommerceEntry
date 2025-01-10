// src/Wishlist.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';
import { useCart } from '../context/CartContext';


const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart,notification,setNotification } = useCart('');
  const apiUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('customertoken');
      if (!token) {
        alert('Please sign in/signup to continue');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/customer/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Log the full response for debugging
        console.log(response.data);

        // Check if items exist in the response
        if (response.data && Array.isArray(response.data.items)) {
          setWishlistItems(response.data.items);
          
        } else {
          throw new Error('Invalid data structure received from API');
        }
        
      } catch (error) {
        // Log the error for debugging
        console.error('Error fetching wishlist:', error);
        
        // Set a user-friendly error message
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem('customertoken');
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    try {
      await axios.delete(`${apiUrl}/customer/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
       
      // Remove the item from the wishlist state
      setWishlistItems((prevItems) => prevItems.filter(item => item.product._id !== productId));
      window.location.reload();
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
   
  return (
    <>
   <Navbar/>
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map(item => (
           
            <div key={item._id} className="border rounded-lg p-4 shadow-md">
              {/* Defensive check for images */}
              <Link to={`/product/${item._id}`}>
              <img 
                src={(item.product.images && Array.isArray(item.product.images) && item.product.images.length > 0) ? item.product.images[0] : '/images/kids2.jpeg'}  
                alt={item.product.name || 'Product Image'} 
                className="w-full h-48 object-cover rounded-md mb-2" 
              />
              <h2 className="font-semibold">{item.product.name || 'Unnamed Product'}</h2>
              </Link>
              <p className="text-gray-700">Size: {item.sizes}</p>
              <p className="text-gray-600">Rs{item.product.price ? item.product.price.toFixed(2) : 'N/A'}</p>
              <div className="flex items-center gap-x-2">
              <button 
  onClick={() => removeFromWishlist(item._id)}
  className="mt-2 bg-white text-black px-4 py-2 rounded hover:bg-blue-600 border border-black"
>
  Remove
</button>
              
              <button onClick={()=> addToCart({
                    id: item.product._id,
                    name:item.product.name,
                    price: item.product.price,
                    image: item.product.mainImage || item.product.images[0],
                  }, item.sizes).then(() => removeFromWishlist(item._id)).catch((error) => console.error('Error adding to cart:', error))}className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-blue-600">
             Add To cart
              </button>
            </div>
            </div>
          ))}
        
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Wishlist;