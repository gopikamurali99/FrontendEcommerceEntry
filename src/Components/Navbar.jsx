// src/components/Navbar.js
// Navbar.jsx
import React, { useState, useRef, useEffect, }  from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdown, setIsAccountDropdown]=useState(false)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSearchActive,setIsSearchActive]= useState(false);
  const navigate=useNavigate();
   const handleCartClick=()=>{
    navigate('/cart')
   }

  const accountDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setIsAccountDropdown(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };

    
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountDropdownRef, categoryDropdownRef]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleAccountDropdown = () =>{
   setIsAccountDropdown((prev) => !prev);
  }
  const toggleCategoryDropdown = () =>{
    setIsCategoryDropdownOpen((prev) => !prev);
  }
  
  const toggleSearchBox = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <header className="bg-white text-black sticky top-0 z-50">
    <div className="container mx-auto flex justify-between items-center p-4">
      <div>
          <Link to="/"><img src="/images/logo-no-background.png" alt="logo" className='h-10' /></Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <div className='relative' ref={accountDropdownRef}>
            <button onClick={toggleAccountDropdown} className='hover:text-gray-600'> Account</button>
            {isAccountDropdown && (
              <div className='absolute bg-white shadow-md mt-2 rounded-md w-48'>
                <Link to="/customer/signin" className="block px-4 py-2 hover:bg-gray-200">Sign In/Sign Up</Link>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                <Link to="/adminlogin" className="block px-4 py-2 hover:bg-gray-200">Admin Account</Link>
                <Link to="/sellerlogin" className="block px-4 py-2 hover:bg-gray-200">Seller Account</Link>
                <Link to="/logout" className="block px-4 py-2 hover:bg-gray-200">Logout</Link>
              </div>

            )}
          </div>
          <div className='relative' ref={categoryDropdownRef}> <button onClick={toggleCategoryDropdown} className='hover:text-gray-600'>Category</button>
          {isCategoryDropdownOpen &&(
            <div className='absolute bg-white shadow-md rounded-md w-48'>
              <Link to="/women" className="block px-4 py-2 hover:bg-gray-200">Women Collections</Link>
              <Link to="/men" className="block px-4 py-2 hover:bg-gray-200">Men Collections</Link>
              <Link to="/kids" className="block px-4 py-2 hover:bg-gray-200">Kids Collections</Link>
             
                
              </div>
            
          )}
          </div>
          
          <Link to="/aboutus" className="hover:text-gray-600">
            About Us
          </Link>
        </nav>

        
        
        {/* Left Icons */}
        <div className="flex items-center space-x-4">
        <div className="relative">
            <span onClick={toggleSearchBox} className="material-icons cursor-pointer">search</span>
            {isSearchActive && (
              <input type="text" placeholder="Search..." className="border rounded-md p-2 absolute left-0 mt-2 w-48" />
            )}
          </div>
          <span onClick= {handleCartClick} className="material-icons cursor-pointer">shopping_cart</span>
          
          <span className="material-icons">favorite</span>
        </div>

        {/* Menu Icon for Small Screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <span className="material-icons text-2xl">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col items-center space-y-4 p-4">
            <Link to="/account" className="hover:text-gray-600">
              Account
            </Link>
            <Link to="/category" className="hover:text-gray-600">
              Category
            </Link>
            <Link to="/aboutus" className="hover:text-gray-600">
              About Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;