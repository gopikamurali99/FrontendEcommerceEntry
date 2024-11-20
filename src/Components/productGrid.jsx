import React from "react";
import { useNavigate } from "react-router-dom";


const ProductGrid = ({title,products})=>{
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${category}`); // Navigate to the corresponding category page
      };
    return(
        <section className="mt-8 p-10">
            <h2 className="text-3xl text-red-700 font-serif font-bold mb-6 text-center">{title}</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product)=>(
                <div key={product.id} className=" rounded-md overflow-hidden ">
                   <img
              src={product.images[1]} 
              alt={product.name}
              className="w-full h-64 object-cover" onclick={handleClick}
            />
           <div className="p-4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-500 mt-1">Rs{product.price}</p>
            </div>
                </div>
            )
            )}

           </div>

        </section>
    )
}
export default ProductGrid;
    