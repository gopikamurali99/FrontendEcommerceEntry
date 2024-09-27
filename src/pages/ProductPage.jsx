import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Footer from '../Components/footer';

const ProductPage = () => {
  const { id } = useParams();
  console.log('Product ID:', id);
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState({ items: [] });
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const { addToCart,notification,setNotification } = useCart('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/products/${id}`);
        setProduct(response.data);
        fetchRelatedProducts(response.data.category,response.data._id);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);
  const fetchRelatedProducts = async (category,productId) =>
  {
    try {
      const response = await axios.get(`${apiUrl}/product/related/${category}/${productId}`)
      setRelatedProducts(response.data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }
  const addToWishlist = async (product) => {

    const token = localStorage.getItem('customertoken');
    console.log(localStorage.getItem('customertoken'));
        if(!token){
            console.error('User not authenticated');
            return;
        }
        const productId = product.id;
        const sizes = selectedSize;
    
        console.log('Product ID:', productId); // Log Product ID
        console.log('Selected Size:', sizes);
            
     try {
        const response = await axios.post(`${apiUrl}/customer/wishlist`,

            { productId: product.id, sizes: selectedSize}, // Data to send
            {
              headers: {
                Authorization: `Bearer ${token}` // Send the JWT token in headers
              }
             
            }
          
          );
          setWishlist({ items: response.data.items || [] });
           
         
         
          
     } catch (error) {
        console.error('Error adding to cart:', error);
     }
}
const handleRelatedProductClick = (relatedProductId) => {
  navigate(`/product/${relatedProductId}`); // Change the URL and trigger a page re-render
};
  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Side: Image gallery and main image */}
          <div className="flex gap-4 p-8 ">
            {/* Thumbnails (Vertically aligned) */}
            <div className="flex flex-col space-y-6">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product thumbnail ${index}`}
                  className="w-24 h-26 object-cover cursor-pointer border border-gray-200"
                  onClick={() => setProduct({ ...product, mainImage: image })}
                />
              ))}
            </div>

            {/* Main Image (Next to the gallery) */}
            <div className="flex-grow">
              <img
                src={product.mainImage || product.images[0]}
                alt={product.name}
                className="w-84 h-84 object-cover border border-gray-200"
              />
            </div>
          </div>

          {/* Right Side: Product details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-2xl font-serif mt-4">RS.{product.price.toFixed(2)}</p>
            
            {/* Size Selection */}
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                  key={index}
                  className={`border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 ${selectedSize === size ? 'bg-gray-300' : ''}`}
                  onClick={() => setSelectedSize(size)}  // Update selected size on click
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                onClick={() =>{
                  if (!selectedSize) {
                    setNotification('Please select a size'); // Show message if no size selected
                    setTimeout(() => setNotification(''), 3000); // Clear message after 3 seconds
                    return; // Prevent adding to cart if no size selected
                }
                  addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.mainImage || product.images[0],
                  },selectedSize)
                }}
              >
                Add to Bag
              </button>
              {/* Display the notification */}
           
              <button  onClick={() =>{
              if (!selectedSize) {
                setNotification('Please select a size'); // Show message if no size selected
                setTimeout(() => setNotification(''), 3000); // Clear message after 3 seconds
                return; // Prevent adding to cart if no size selected
            }
                  addToWishlist({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.mainImage || product.images[0],
                    
              },selectedSize)
              }}className="bg-gray-200 py-2 px-4 rounded">
                Add to Wishlist
              </button>
              {notification && <div className="notification text-red-600 mt-7">{notification}</div>}
            </div>
          </div>
        </div>
      </div>
       {/* "You Might Also Like" Section */}
       <div className='mt-8'>
       <h3 className="text-lg font-bold mb-4">You Might Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="border p-4 rounded"  onClick={() => handleRelatedProductClick(relatedProduct._id)}>
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <h4 className="mt-2 font-bold">{relatedProduct.name}</h4>
                <p>RS.{relatedProduct.price.toFixed(2)}</p>
                
              </div>
            ))}
          </div>
        </div>
       
      <Footer />
    </div>
  );
};

export default ProductPage;
