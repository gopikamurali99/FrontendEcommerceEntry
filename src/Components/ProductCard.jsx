import React from "react";
import { useNavigate } from "react-router-dom";


const ProductCard =({product,category}) =>{
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${category}`); // Navigate to the corresponding category page
      };
    
    return(
        <div className="border rounder-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img src={product.images[0]} className="w-full h-49 object-cover"   onClick={handleClick}/>
            <div className="=p-4">
                <div className="p-4 flex flex-col items-center"><h3 className="text-lg font-bold mt-2">{product.name}</h3></div>
                
                
            </div>
        </div>
    )
}
 export default ProductCard;