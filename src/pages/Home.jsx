// Home.jsx
import React,{ useState, useEffect }  from 'react';
import HomeSlideshow from '../Components/HomeImageSider';
import  Navbar  from '../Components/Navbar';
import Footer from '../Components/footer';
import ProductCard from '../Components/ProductCard';
import axios from 'axios'

const Home = () => {
  const [womenProducts,setWomenProducts ]= useState([]);
  const [menProducts,setMenProducts ]= useState([]);
  const [KidsProducts,setKidsProducts ]= useState([]);
  const apiUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchProducts = async () =>{
      try{
        const response = await axios.get(`${apiUrl}/product/products`);
        const products = response.data;
        setWomenProducts(products.filter(product=>product.category === 'women').slice(0,4));
        setMenProducts(products.filter(product=>product.category === 'men').slice(0,4));
        setKidsProducts(products.filter(product=>product.category === 'kids').slice(0,4));
      }
      catch(error){
        console.error('Error fetching products:', error);
      }
    };
  fetchProducts();
  },[])
  
  return (
    <div>
      <Navbar />
      <main >
        <HomeSlideshow/>
        <section className='mt-8'>
        <div className='p-4'>
    <p className='text-lg font-light text-red-700 leading-relaxed text-center'>
      At Vogue Vista, we bring you the latest styles and fashion trends. From casual wear to chic evening outfits, we curate pieces that reflect elegance, boldness, and contemporary style.
    </p>
  </div>
        </section>
  <div className='mt-8'>
  <img 
    src='./images/Frame.webp' 
    alt='Fashion' 
    className='w-full h-auto object-cover'
  />
</div>
<section className='mt-8 p-4'>
<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
  <div className='p-10'>
    <img src="./images/womencolumn3.jpeg" alt="fashion" className='w-full h-auto object-cover'/>
  </div>
  {/* Second Column: Text */}
  <div className='flex flex-col justify-center items-start p-4'>
      <h2 className='text-3xl text-red-700  font-serif font-bold mb-4'>Categories for the Adorable Women</h2>
      <p className='text-lg font-light text-gray-700'>
        Explore our exclusive categories curated for fashion-forward individuals. Whether you're looking for casual, formal, or trendy attire, we have something for everyone.
      </p>
    </div>
    </div>
</section>
        <div className='p-4'>
        <section className='mt-8' id='womenCategory'>
          <h2 className='text-2xl font-bold text-center'>Women category</h2>
           <div className='grid grid-cols-1 md:grid-cols-4 gap-3 mt-4'>
            {womenProducts.map(product =>(
              <ProductCard key={product.id} product={product} category="women"/>
            
            ))}
           </div>
        </section>
        <section className='mt-8 p-4'>
<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
  
  {/* Second Column: Text */}
  <div className='flex flex-col justify-center items-start p-4'>
      <h2 className='text-3xl text-red-700  font-serif font-bold mb-4'>Categories for the Adorable Women</h2>
      <p className='text-lg font-light text-gray-700'>
        Explore our exclusive categories curated for fashion-forward individuals. Whether you're looking for casual, formal, or trendy attire, we have something for everyone.
      </p>
    </div>
    <div className='p-8'>
    <img src="./images/mencolumn.jpeg" alt="fashion" className='w-full h-auto object-cover'/>
  </div>
    </div>
</section>
        <section className='mt-8' id='menCategory'>
          <h2 className='text-2xl font-bold text-center'>Men category</h2>
           <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>
            {menProducts.map(product =>(
              <ProductCard key={product.id} product={product} category="men"/>
            
            ))}
           </div>
        </section>
        <section className='mt-8 p-4'>
<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
  <div className='p-8'>
    <img src="./images/kidcolumn.jpeg" alt="fashion" className='w-full h-auto object-cover'/>
  </div>
  {/* Second Column: Text */}
  <div className='flex flex-col justify-center items-start p-4'>
      <h2 className='text-3xl text-red-700  font-serif font-bold mb-4'>Categories for the Adorable Women</h2>
      <p className='text-lg font-light text-gray-700'>
        Explore our exclusive categories curated for fashion-forward individuals. Whether you're looking for casual, formal, or trendy attire, we have something for everyone.
      </p>
    </div>
    </div>
</section>
        <section className='mt-8' id='kidsCategory'>
          <h2 className='text-2xl font-bold text-center'>Kids category</h2>
           <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>
            {KidsProducts.map(product =>(
              <ProductCard key={product.id} product={product} category="kids"/>
            
            ))}
           </div>
        </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Home;