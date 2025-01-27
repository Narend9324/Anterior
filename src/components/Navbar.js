"use client"; // Add this at the top

import Link from 'next/link';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Only run this code in the browser (client-side)
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsLargeScreen(window.innerWidth >= 768);
      }
    };

    // Initial check when component mounts
    handleResize();

    // Add event listener to resize window
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // <>
    // <div className='Navbar'>
    // <div className='flex justify-between px-6'>
            
    //   <div>
    //         1
    //   </div>
    //   <div>
    //         2
    //   </div>
    //   <div>
    //         3
    //   </div>
    //   <div>
    //         4
    //   </div>
    //   </div> 
    // </div>
    
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Hamburger Menu for Mobile/Tablet */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 py-3"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Logo (conditionally rendered based on screen size and menu state) */}
        <Link href="/" className="flex items-center">
          {/* For sm screens: show smallLogo.svg */}
          <img
            src={isMobileMenuOpen || isLargeScreen ? "/Logo.svg" : "/smallLogo.svg"}
            alt="Logo"
            className="h-8 mr-3 sm:block md:hidden"
          />
          {/* For md and lg screens: show Logo.svg */}
          <img
            src="/Logo.svg"
            alt="Logo"
            className="h-8 mr-3 hidden md:block"
          />
        </Link>

        {/* Navigation Links for Large Screens */}
        <div className="hidden lg:flex space-x-4 navbar-content">
          <Link href="/" className=" hover:text-amber-500">Home</Link>
          <Link href="/my-collections" className=" hover:text-amber-500">My Collections</Link>
          <Link href="/all-collections" className=" hover:text-amber-500">All Collections</Link>
          <Link href="/pricing" className=" hover:text-amber-500">Pricing</Link>
        </div>

        {/* Log In & Sign Up (fixed on the right for all screen sizes) */}
        <div className="ml-auto flex space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-amber-500 py-3">Log In</Link>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu (conditionally rendered based on isMobileMenuOpen state) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white h-screen relative">
          {/* Close button (X) positioned at the top right corner */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col space-y-6 px-4 py-3 ">
            <Link href="/" className="text-gray-700 hover:text-amber-500">Home</Link>
            <Link href="/my-collections" className="text-gray-700 hover:text-amber-500">My Collections</Link>
            <Link href="/all-collections" className="text-gray-700 hover:text-amber-500">All Collections</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-amber-500">Pricing</Link>
          </div>
        </div>
      )}
    </nav>
    // </>
  );
}

export default Navbar;
