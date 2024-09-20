import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AllProductCard from '../Components/AllproductCard';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const KidsProducts = () => {
  const [kidsproducts,setKidsProduct] = useState([]);
  const apiUrl =import.meta.env.VITE_BASE_URL

  useEffect(()=>{
    const fetchProducts = async () =>{
      try{
         const response = await axios.get(`${apiUrl}/product/products`);
         const products = response.data;
         setKidsProduct(products.filter(product=>product.category === 'kids'));
      }
      catch(error){
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  },[])
  

  return (
    
    <div>
        <Navbar/>
      <div className="relative">
        <img src="/images/kid1.png" alt="Main Banner" className="w-full h-64.5 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">All Products</h2>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {kidsproducts.map((products) => (
            <AllProductCard key={products.id} products={products} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KidsProducts;