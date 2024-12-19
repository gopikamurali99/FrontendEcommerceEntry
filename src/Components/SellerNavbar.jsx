
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './sellerlogout';

import AdminLogout from './AdminLogout';

const SellerNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountDropdown, setIsAccountDropdown] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
   
    const [isUserDropDown, setIsUserDropdown] = useState(false);
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
   
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BASE_URL;

    const accountDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

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
                <button onClick={() => navigate('/seller/approvedproduct')}>Home</button>
                    <button onClick={() => navigate('/')}  className='hover:text-gray-600'>Shop</button>
                    <div className='relative' ref={accountDropdownRef}>
                        <button onClick={toggleAccountDropdown} className='hover:text-gray-600'>Account</button>
                        {isAccountDropdown && (
                            <div className='absolute bg-white shadow-md mt-2 rounded-md w-48'>
                                <Link to="/customer/signin" className="block px-4 py-2 hover:bg-gray-200">Visit As a Customer</Link>
                                
                                
                                <Link to="/sellerlogin" className="block px-4 py-2 hover:bg-gray-200">Seller Account</Link>
                                <Logout/>
                                 
                            </div>
                        )}
                    </div>
                    <button onClick={toggleTheme} title="Toggle Theme">
                        {theme === 'light' ? (
                            <span className="material-icons">dark_mode</span>
                        ) : (
                            <span className="material-icons">light_mode</span>
                        )}
                    </button>
                    {/* Category Dropdown */}
                    
                    
                </nav>

                {/* Right Side Icons */}
                

                
                
            </div>
        </header>
    );
};

export default SellerNavbar;