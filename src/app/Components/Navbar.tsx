"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter for easier route detection in client components
import logo from '../Assests/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState<string>('/');

  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    // Set the active path based on the current URL
    setActivePath(pathname);
  }, [pathname]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => activePath === path;

  return (
    <div className='px-10 lg:px-20 py-5 bg-blue-300'>
    <nav className=" backdrop-blur-md bg-opacity-20 ">
      <div className={`bg-gray-200 rounded-full shadow-lg text-black  ${isOpen ? 'rounded-xl' : 'rounded-full'}`}>
      <div className="container mx-auto flex items-center justify-between gap-4 p-6 md:px-10 md:py-5">
        <div className="text-lg font-bold flex items-center">
          <Link href="/">
            <Image src={logo} height={50} width={50} alt="logo" />
          </Link>
          <h1 className="ml-2 text-xl md:text-2xl drop-shadow-xl">Career<span className='text-blue-500'>Net</span></h1>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleNavbar}
            type="button"
            className="text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="#000000"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Links for Desktop */}
        <div
          className={`md:flex items-center space-x-4 ${
            isOpen ? 'hidden' : 'hidden'
          } md:block`}
        >
          <Link href="/">
            <h1 className={`hover:text-gray-300 ${isActive('/') ? 'text-blue-500' : ''}`}>
              Home
            </h1>
          </Link>
          <Link href="/findwork">
            <h1 className={`hover:text-gray-300 ${isActive('/find-work') ? 'text-blue-500' : ''}`}>
              Find Work
            </h1>
          </Link>
          <Link href="/findfreelancers">
            <h1
              className={`hover:text-gray-300 ${
                isActive('/find-freelancers') ? 'text-blue-500' : ''
              }`}
            >
              Find Freelancers
            </h1>
          </Link>
          <Link href="/login">
            <h1 className={`hover:text-gray-300 ${isActive('/login') ? 'text-blue-500' : ''}`}>
              Log In
            </h1>
          </Link>
          <Link href="/signup">
            <h1 className={`hover:text-gray-300 ${isActive('/signup') ? 'text-blue-500' : ''}`}>
              Sign Up
            </h1>
          </Link>
          <Link href="/job">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
              Post a Job
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col rounded-xl items-center space-y-2 py-4">
            <Link href="/">
              <h1 className={`hover:text-gray-300 ${isActive('/') ? 'text-blue-500' : ''}`}>
                Home
              </h1>
            </Link>
            <Link href="/findwork">
              <h1
                className={`hover:text-gray-300 ${
                  isActive('/find-work') ? 'text-blue-500' : ''
                }`}
              >
                Find Work
              </h1>
            </Link>
            <Link href="/findfreelancers">
              <h1
                className={`hover:text-gray-300 ${
                  isActive('/find-freelancers') ? 'text-blue-500' : ''
                }`}
              >
                Find Freelancers
              </h1>
            </Link>
            <Link href="/login">
              <h1 className={`hover:text-gray-300 ${isActive('/login') ? 'text-blue-500' : ''}`}>
                Log In
              </h1>
            </Link>
            <Link href="/signup">
              <h1 className={`hover:text-gray-300 ${isActive('/signup') ? 'text-blue-500' : ''}`}>
                Sign Up
              </h1>
            </Link>
            <Link href="/job">
              <button className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600">
                Post a Job
              </button>
            </Link>
          </div>
        </div>
      )}
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
