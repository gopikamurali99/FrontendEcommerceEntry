// src/components/ProductCard.jsx
import React from 'react';

import { Link } from 'react-router-dom';

const AllProductCard = ({ products }) => {
    

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
    </div>
  );
};

export default AllProductCard;