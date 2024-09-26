"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; 
import logo from '../Assests/logo.png';
import { auth } from '../Firebaseauth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState<string>('/');
  const [user, setUser] = useState(null);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [session, setSession] = useState(false);
  const [email, setEmail] = useState("");
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    // Set the active path based on the current URL
    setActivePath(pathname);

    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setSession(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [pathname]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setProfileIsOpen(!profileIsOpen); 
  };

  const isActive = (path: string) => activePath === path;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProfileIsOpen(false);
      localStorage.removeItem('userEmail'); // Remove email from local storage
      setEmail(""); // Reset the email state
      setSession(false); // Reset the session stat // Close the dropdown after signing out
      toast.success(' You have successfully signed out!!')
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error occurred during sign-out:", error.message);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileIsOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className='px-10 lg:px-20 py-5 bg-blue-300'>
      <nav className="backdrop-blur-md bg-opacity-20">
        <div className={`bg-gray-200 rounded-full shadow-lg text-black ${isOpen ? 'rounded-xl' : 'rounded-full'}`}>
          <div className="container mx-auto flex items-center justify-between gap-4 p-6 md:px-10 md:py-5">
            <div className="text-lg font-bold flex items-center">
              <Link href="/">
                <Image src={logo} height={50} width={50} alt="logo" />
              </Link>
              <h1 className="ml-2 text-xl md:text-2xl drop-shadow-xl">Career<span className='text-blue-500'>Net</span></h1>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden">
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
              className={`lg:flex items-center space-x-4 ${isOpen ? 'hidden' : 'hidden'} lg:block`}
            >
              <Link href="/">
                <h1 className={`hover:text-blue-300 ${isActive('/') ? 'text-blue-500' : ''}`}>
                  Home
                </h1>
              </Link>
              <Link href="/findwork">
                <h1 className={`hover:text-blue-300 ${isActive('/find-work') ? 'text-blue-500' : ''}`}>
                  Find Work
                </h1>
              </Link>
              <Link href="/findfreelancers">
                <h1 className={`hover:text-blue-300 ${isActive('/find-freelancers') ? 'text-blue-500' : ''}`}>
                  Find Freelancers
                </h1>
              </Link>
              <Link href="/job">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 hover:scale-110">
                  Post a Job
                </button>
              </Link>
              {session ? (
                <div className="">
                  <button onClick={toggleMenu} className='flex bg-blue-500 p-2 rounded-full hover:bg-blue-600 hover:scale-110'>
                  <svg
							    xmlns="http://www.w3.org/2000/svg"
							    className="fill-white h-8 w-8"
							    viewBox="0 0 512 512"
						      >
							   <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
						     </svg>
                  <h1 className="text-white p-1">{email}</h1>
                  </button>
                  {profileIsOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                      <button
                          
                          className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                        >
                          My Profile
                        </button>
                      <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left">Logout</button>
                    </div>
                  )}
                </div>
              ) : user ? (
                <div ref={dropdownRef}>
                  <button onClick={toggleMenu} className="flex bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 hover:scale-110">
                    <Image src={user.photoURL || "/default-avatar.png"} alt="User Avatar" className="h-8 w-8 rounded-full" width={10} height={10} />
                    <h1 className="ml-2 mt-1">{user.displayName}</h1>
                  </button>
                  {profileIsOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                        <button
                          
                          className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                        >
                          My Profile
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                        >
                          Logout
                        </button>  
                      </div>
                    )}
                </div>
              ) : (
                <Link href="/login">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 hover:scale-110">
                      Log In / Sign Up
                    </button>
                  </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Links */}
          {isOpen && (
            <div className="lg:hidden">
              <div className="flex flex-col rounded-xl items-center space-y-2 py-4">
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
                  <h1 className={`hover:text-gray-300 ${isActive('/find-freelancers') ? 'text-blue-500' : ''}`}>
                    Find Freelancers
                  </h1>
                </Link>
                <Link href="/job">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600">
                    Post a Job
                  </button>
                </Link>
                {session ? (
                <div className="">
                  <button onClick={toggleMenu} className='flex bg-blue-500 p-2 rounded-full hover:bg-blue-600 hover:scale-110'>
                  <svg
							    xmlns="http://www.w3.org/2000/svg"
							    className="fill-white h-8 w-8"
							    viewBox="0 0 512 512"
						      >
							   <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
						     </svg>
                  <h1 className="text-white p-1">{email}</h1>
                  </button>
                  {profileIsOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                      <button
                          
                          className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                        >
                          My Profile
                        </button>
                      <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left">Logout</button>  
                    </div>
                  )}
                </div>
              ) : user ? (
                <div ref={dropdownRef}>
                  <button onClick={toggleMenu} className="flex bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 hover:scale-110">
                    <Image src={user.photoURL || "/default-avatar.png"} alt="User Avatar" className="h-8 w-8 rounded-full" width={10} height={10} />
                    <h1 className="ml-2 mt-1">{user.displayName}</h1>
                  </button>
                  {profileIsOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                        <button
                          
                          className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                        >
                          My Profile
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                </div>
              ) : (
                  <Link href="/login">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 hover:scale-110">
                      Log In / Sign Up
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="colored"
      />
    </div>
  );
};

export default Navbar;
