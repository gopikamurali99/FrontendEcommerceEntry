import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountDropdown, setIsAccountDropdown] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isUserDropDown, setIsUserDropdown] = useState(false);
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BASE_URL;

    const accountDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);
    const token = localStorage.getItem('customertoken');
    // Fetch user data and manage dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
                setIsAccountDropdown(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdown(false);
            }
        };

        const fetchUser = async () => {
            const token = localStorage.getItem('customertoken');
            const id = localStorage.getItem('userId');
            if (!token) return;
            try {
                const { data } = await axios.get(`${apiUrl}/customer/profile/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };

        fetchUser();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [accountDropdownRef, categoryDropdownRef]);

    // Toggle functions
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleAccountDropdown = () => setIsAccountDropdown(prev => !prev);
    const toggleCategoryDropdown = () => setIsCategoryDropdownOpen(prev => !prev);
    const toggleUsrDropdown = () => setIsUserDropdown(prev => !prev);
    const toggleSearchBox = () => setIsSearchActive(!isSearchActive);

    // Logout function
    const handleLogout = async () => {
        try {
            localStorage.removeItem('customertoken');
            navigate('/customer/signin');
            alert('Logout successful!');
        } catch (error) {
            console.log('Logout error', error);
        }
    };

    // Theme toggle
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    // Apply theme on initial load
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <header className="bg-white dark:bg-gray-900 text-black dark:text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <div>
                    <Link to="/">
                        <img src="/images/logo-no-background.png" alt="logo" className='h-10' />
                    </Link>
                </div>

                {/* Navigation Links for Large Screens */}
                <nav className="hidden md:flex space-x-8 flex-grow justify-center">
                    <button onClick={() => navigate('/')} className='hover:text-gray-600'>Home</button>
                    <button onClick={toggleAccountDropdown} className='hover:text-gray-600'>Shop</button>
                    <div className='relative' ref={accountDropdownRef}>
                        <button onClick={toggleAccountDropdown} className='hover:text-gray-600'>Account</button>
                        {isAccountDropdown && (
                            <div className='absolute bg-white shadow-md mt-2 rounded-md w-48'>
                                <Link to="/customer/signin" className="block px-4 py-2 hover:bg-gray-200">Sign In/Sign Up</Link>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                                <Link to="/adminlogin" className="block px-4 py-2 hover:bg-gray-200">Admin Account</Link>
                                <Link to="/sellerlogin" className="block px-4 py-2 hover:bg-gray-200">Seller Account</Link>
                                <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>Logout</span>
                            </div>
                        )}
                    </div>
                    {/* Category Dropdown */}
                    <div className='relative' ref={categoryDropdownRef}>
                        <button onClick={toggleCategoryDropdown} className='hover:text-gray-600'>Category</button>
                        {isCategoryDropdownOpen && (
                            <div className='absolute bg-white shadow-md rounded-md w-48'>
                                <Link to="/women" className="block px-4 py-2 hover:bg-gray-200">Women Collections</Link>
                                <Link to="/men" className="block px-4 py-2 hover:bg-gray-200">Men Collections</Link>
                                <Link to="/kids" className="block px-4 py-2 hover:bg-gray-200">Kids Collections</Link>
                            </div>
                        )}
                    </div>
                    <Link to="/aboutus" className="hover:text-gray-600">About Us</Link>
                </nav>

                {/* Right Side Icons */}
                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} title="Toggle Theme">
                        {theme === 'light' ? (
                            <span className="material-icons">dark_mode</span>
                        ) : (
                            <span className="material-icons">light_mode</span>
                        )}
                    </button>

                    {/* Cart Icon */}
                    <div className="relative">
    <span onClick={() =>{if(!token){
          navigate('/customer/signin')
    } else{
        navigate('/cart')
    }
    } } className="material-icons cursor-pointer">shopping_cart</span>
    {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
        </span>
    )}
</div>

                    {/* Wishlist Icon */}
                    <span onClick={() => {if(!token){
          navigate('/customer/signin')
    } else{
        navigate('/wishlist')
    }
    } } className="material-icons cursor-pointer">favorite</span>

                    {/* User Profile */}
                    <div className='relative' ref={userDropdownRef}>
                        <button onClick={toggleUsrDropdown}>
                            {user ? (
                                <div className="bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center" title={user.name}>
                                    {user?.name?.charAt(0)?.toUpperCase()}
                                </div>
                            ) : (
                                <span className="material-icons">account_circle</span>
                            )}
                        </button>
                        {isUserDropDown && (
                            <div className='absolute bg-white shadow-md mt-2 rounded-md w-48 right-0'>
                                {!user ? (
                                    <>
                                        <Link to="/customer/signin" className="block px-4 py-2 hover:bg-gray-200">Sign In/Sign Up</Link>
                                        <Link to="/sellerlogin" className="block px-4 py-2 hover:bg-gray-200">Seller Account</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                                        <Link to="/order" className="block px-4 py-2 hover:bg-gray-200">Your Order</Link>
                                        <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>Logout</span>

                                       
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                {/* Show only when user is not logged in */}
                {!user && (
                    <div className="md:hidden">
                        <button onClick={toggleMenu}>
                            <span className="material-icons text-xl">menu</span>
                        </button>
                    </div>
                )}

                {/* Mobile Menu for Small Screens */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
                        <nav className="flex flex-col items-center space-y-4 p-4">
                            {!user ? (
                                <>
                                    <Link to="/customer/signin" className="hover:text-gray-600">Sign In/Sign Up</Link>
                                    <Link to="/sellerlogin" className="hover:text-gray-600">Seller Account</Link>
                                </>
                            ) : (
                                <>
                                    {/* User options for logged-in users */}
                                    <Link to="/profile" className="hover:text-gray-600">Profile</Link>
                                    <Link to="/order" className="hover:text-gray-600">Your Order</Link>
                                    {/* Additional icons can be added here */}
                                    {/* Dark Theme Toggle */}
                                    {theme === 'light' ? (
                                        <span onClick={toggleTheme} title="Toggle Theme" style={{ cursor: 'pointer' }}>Dark Theme</span>
                                    ) : (
                                        <span onClick={toggleTheme} title="Toggle Theme" style={{ cursor: 'pointer' }}>Light Theme</span>
                                    )}
                                    {/* Logout Option */}
                                    <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>Logout</span>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;