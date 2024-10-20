"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import home from '../Assests/home1.png';
import girl from '../Assests/girl.png';
import Carousel from "@/components/Carousel";
import Categories from '@/components/Categories';
import Newletter from "@/components/Newletter";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/PortfolioSection";
// import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";

export default function Home() {
  const [freelancersCount, setFreelancersCount] = useState(0);
  const [workPostedCount, setWorkPostedCount] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
    });
  }, []);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setFreelancersCount((prevCount) => (prevCount < 500 ? prevCount + 1 : 500));
    }, 10); // adjust the speed by changing the interval

    const interval2 = setInterval(() => {
      setWorkPostedCount((prevCount) => (prevCount < 300 ? prevCount + 1 : 300));
    }, 10);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);


  return (
   <div className="bg-blue-300 overflow-x-hidden">
    <div>
      <Navbar/>
    </div>
    <div className="flex flex-col md:flex-row items-center mx-10 md:mx-5 lg:mx-20">
        <div className="md:w-1/2 text-center md:text-left ml-0 md:ml-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Are you looking for Freelancers?
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            Hire Great Freelancers, Fast. Spacelance helps you hire elite freelancers at a moment&apos;s notice.
          </p>
          <div className="flex flex-col md:flex-row items-center md:items-start mt-0 md:mt-10">
            <Link href='/findfreelancers'>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4 md:mb-0 md:mr-4 hover:bg-blue-700 hover:scale-110" >
              Hire a Freelancer
            </button>
            </Link>
            <div className="relative w-full md:w-auto ">
              <input
                type="search"
                placeholder="Search freelance work"
                className="py-2 px-4 rounded-md border-2 border-gray-300 w-full md:w-64"
              />
              <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-1 top-0.5 hover:scale-110 hover:cursor-pointer" width="40" height="40" viewBox="0 0 56 56">
                <path fill="#1E88E5" d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906M16.539 25.398c0-4.945 4.055-9 9.023-9c4.946 0 9 4.055 9 9a8.76 8.76 0 0 1-1.664 5.18l5.86 5.86c.328.328.539.773.539 1.218c0 .985-.68 1.664-1.594 1.664c-.539 0-.984-.164-1.43-.61l-5.789-5.788a8.9 8.9 0 0 1-4.922 1.5c-4.968 0-9.023-4.055-9.023-9.024m2.601 0c0 3.516 2.907 6.422 6.422 6.422c3.47 0 6.375-2.906 6.375-6.422c0-3.468-2.906-6.375-6.375-6.375c-3.515 0-6.422 2.907-6.422 6.375"/>
              </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <motion.div className="md:w-1/2 mt-8 md:mt-0"
        initial={{ x: '100vw' }} // Start position off-screen to the left
        animate={{ x: 0 }}        // Final position (on-screen)
        transition={{ type: 'spring', stiffness: 100, damping: 20 }} >
          <Image src={home} alt="Home" className="w-full h-full lg:h-[600px] object-cover"/>
        </motion.div> */}
        <div data-aos="fade-left">
        <Image src={home} alt="Home" className="w-full h-full object-cover"/>
        </div>
      </div>
    <div className="bg-white py-8 mx-10 my-10 md:mx-20 shadow-lg rounded-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-4">
        
        <div className="flex flex-col items-center text-center p-4 ">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <path fill="#1E88E5" d="M14 15c0 1.11-.89 2-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2m-.91 5c.12.72.37 1.39.72 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2h1a2 2 0 0 1 2 2v3.09c-.33-.05-.66-.09-1-.09s-.67.04-1 .09V10H6v10zM9 8h6V6c0-1.66-1.34-3-3-3S9 4.34 9 6zm12.34 7.84l-3.59 3.59l-1.59-1.59L15 19l2.75 3l4.75-4.75z"/>
            </svg>
          </div>
          <h1 className="text-lg font-semibold">Create Account</h1>
          <p className="text-gray-600">First you have to create an account here</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
              <g fill="none" stroke="#1E88E5" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M40 23V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H22"/>
                <circle cx="31" cy="34" r="6" fill="white"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M36 38L41 42"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M30 4V14H40"/>
              </g>
            </svg>
          </div>
          <h1 className="text-lg font-semibold">Search work</h1>
          <p className="text-gray-600">Search the best freelance work here</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4 ">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 26 26">
              <g fill="#1E88E5" fillRule="evenodd" clipRule="evenodd">
                <path d="M14.335 6.03a3 3 0 0 0-2.67 0L8.029 7.836c-.95.472-1.537 1.374-1.528 2.344c.016 1.774.21 4.03.9 5.477c.766 1.607 2.65 3.272 4.216 4.44c.83.619 1.936.619 2.766 0c1.566-1.168 3.45-2.833 4.216-4.44c.69-1.447.884-3.703.9-5.477c.009-.97-.579-1.872-1.528-2.344zm-3.56-1.791a5 5 0 0 1 4.45 0l3.636 1.806c1.552.772 2.654 2.329 2.638 4.153c-.016 1.785-.197 4.439-1.095 6.32c-.998 2.094-3.254 4.01-4.825 5.183a4.29 4.29 0 0 1-5.158 0c-1.571-1.172-3.827-3.09-4.825-5.183c-.898-1.881-1.079-4.535-1.095-6.32c-.016-1.824 1.086-3.381 2.638-4.153z"/>
                <path d="M16.14 10.751a1 1 0 0 1 .128 1.408l-1.799 2.16a2 2 0 0 1-2.95.133l1.414-1.414l1.799-2.159a1 1 0 0 1 1.408-.128m-5.847 1.061a1 1 0 0 1 1.414 0l1.226 1.226l-1.414 1.414l-1.226-1.226a1 1 0 0 1 0-1.414"/>
                <path d="M13 24c6.075 0 11-4.925 11-11S19.075 2 13 2S2 6.925 2 13s4.925 11 11 11m0 2c7.18 0 13-5.82 13-13S20.18 0 13 0S0 5.82 0 13s5.82 13 13 13"/>
              </g>
            </svg>
          </div>
          <h1 className="text-lg font-semibold">Save and apply</h1>
          <p className="text-gray-600">Apply or save and start your work</p>
        </div>

      </div>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-between py-10 px-4 md:px-10 lg:px-20">
      <div className="relative w-full md:w-1/2 flex justify-center">
        <Image src={girl} alt="girl" className="w-full h-auto"/>
        <div className="absolute top-10 md:top-10 lg:top-40 left-56 md:left-52 lg:left-96 bg-white p-4 rounded-xl shadow-lg" data-aos="flip-left">
          <p className="text-blue-600 text-xl lg:text-2xl font-semibold">{freelancersCount}+</p>
          <p className="text-gray-500 text-xs lg:text-xl">freelancers</p>
        </div>
        <div className="absolute top-32 md:top-32 lg:top-72 left-48 lg:left-96 bg-white p-4 rounded-xl shadow-lg" data-aos="flip-left">
          <p className="text-blue-600 text-lg lg:text-2xl font-semibold">{workPostedCount}+</p>
          <p className="text-gray-500 text-xs lg:text-xl">freelance work Posted</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Find The Best <span className="text-blue-600">Freelancers</span> Here
        </h1>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat bibendum ornare urna, cursus eget convallis.
          Feugiat imperdiet posuere justo, ultrices interdum sed orci nunc, mattis. Ipsum viverra viverra neque adipiscing 
          arcu, quam dictum. Dui mi viverra dui, sit accumsan, tincidunt massa. Dui cras magnis.
        </p>
      </div>
    </div>
    <div>
      <Carousel/>
    </div>
    <div className="mt-10">
      <Categories/>
    </div>
    <div className="mt-10">
      <PortfolioSection/>
    </div>
    <div className="mt-10">
      <Newletter/>
    </div>
    <div className="mt-10">
      <Footer/>
    </div>
   </div>
  );
}
