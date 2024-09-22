// src/components/ProductCard.jsx
import React from 'react';

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';




const AllProductCard = ({ products }) => {
  console.log('Adding to cart:', products);
  const { addToCart } = useCart();  
  
const handleAddToCart = () => {
  console.log('Product object:', products);
  addToCart({  id: products._id,
    name: products.name,
    price: products.price,
    image: products.mainImage || products.images[0],
 }); // Add item to cart
};
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg ">
      <Link to={`/product/${products._id}`}>
        <img 
          src={products.images.length > 0 ? products.images[0] : 'https://img101.urbanic.com/v1/goods-pic/278048c19cb8461fa57ccc6968c2dba5UR_w1440_q90.webp'} 
          alt={products.name} 
          className="w-full h-49 object-cover" 
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{products.name}</h3>
          <p className="text-gray-700">Rs.{products.price.toFixed(2)}</p>
        </div>
      </Link>
      <button  onClick={handleAddToCart} className="flex items-center">
      <span  className="material-symbols-outlined">
shopping_bag
</span>
</button>
    </div>
  );
};

export default AllProductCard;