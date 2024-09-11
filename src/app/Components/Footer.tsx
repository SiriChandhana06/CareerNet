import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../Assests/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-10 pl-0 lg:pl-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <div className="text-lg font-bold flex md:block lg:flex items-center">
          <Link href="/">
            <Image src={logo} height={50} width={50} alt="logo" />
          </Link>
          <h1 className="ml-2 md:ml-0 lg:ml-2 text-xl md:text-2xl drop-shadow-xl">Career<span className='text-blue-500'>Net</span></h1>
        </div>
            <p className="text-gray-600 mt-4 mr-10">
              Powerful Freelance Marketplace System with ability to change the Users (Freelancers & Clients)
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <i className="fab fa-instagram"></i> 
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-bold text-gray-700 mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Find Freelancers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Post Project</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Refund Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Privacy Policy</a></li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-bold text-gray-700 mb-4">For Freelancers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Find Work</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Create Account</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Call Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600"><i className="fas fa-map-marker-alt"></i>CareerNet</li>
              <li className="text-gray-600"><i className="fas fa-phone"></i> +25470000000</li>
              <li className="text-gray-600"><i className="fas fa-envelope"></i> careernet@gmail.com</li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-8 border-t pt-4 text-center text-gray-600">
          &copy; 2022 Spacelance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
