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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><defs><mask id="ipTInstagram0"><g fill="none"><path fill="#555" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M34 6H14a8 8 0 0 0-8 8v20a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8V14a8 8 0 0 0-8-8Z"/><path fill="#555" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M24 32a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z"/><path fill="#fff" d="M35 15a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></g></mask></defs><path fill="black" d="M0 0h48v48H0z" mask="url(#ipTInstagram0)"/></svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="black" d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518a3.3 3.3 0 0 0 1.447-1.817a6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429a3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218a3.2 3.2 0 0 1-.865.115a3 3 0 0 1-.614-.057a3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/></svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 896 1664"><path fill="black" d="M895 12v264H738q-86 0-116 36t-30 108v189h293l-39 296H592v759H286V905H31V609h255V391q0-186 104-288.5T667 0q147 0 228 12"/></svg>
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
              <li className="text-gray-600 flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 48c-79.5 0-144 61.39-144 137c0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137"/><circle cx="256" cy="192" r="48" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                <h1>CareerNet</h1>
                </li>
              <li className="text-gray-600 flex gap-1"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 16.92v3a2 2 0 0 1-2.18 2a19.8 19.8 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.8 12.8 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92M14.05 2a9 9 0 0 1 8 7.94m-8-3.94A5 5 0 0 1 18 10"/></svg>
                <h1>+25470000000</h1> 
                </li>
              <li className="text-gray-600 flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="black" d="M3 5V4a1 1 0 0 0-1 1zm18 0h1a1 1 0 0 0-1-1zM3 6h18V4H3zm17-1v12h2V5zm-1 13H5v2h14zM4 17V5H2v12zm1 1a1 1 0 0 1-1-1H2a3 3 0 0 0 3 3zm15-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3z"/><path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 5l9 9l9-9"/></g></svg> 
                <h1>careernet@gmail.com</h1>
                </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-8 border-t pt-4 text-center text-gray-500">
          &copy; 2022 Spacelance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
