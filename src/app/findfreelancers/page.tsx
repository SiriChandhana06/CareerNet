// "use client";
// import Navbar from "@/Components/Navbar";
// import Image from "next/image";
// import porfolio from "@/Assests/potfolio.webp";
// import Footer from "@/Components/Footer";
// import { useState} from "react";
// import { useEffect } from "react";
// import { useRef } from "react";
// import { FaFilter } from "react-icons/fa";

// const portfolios = [
//   {
//     name: "Bunny.design",
//     role: "UI/UX Designer",
//     image: porfolio,
//   },
//   {
//     name: "Bhaskar Tiwari",
//     role: "Graphic Designer",
//     image: porfolio,
//   },
//   {
//     name: "Aksara Joshi",
//     role: "Graphic Designer",
//     image: porfolio,
//   },
//   {
//     name: "Designer 4",
//     role: "Graphic Designer",
//     image: porfolio,
//   },
// ];

// const FindFreelancers: React.FC = () => {

//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   const handleTitleClick = (title: string) => {
//     const sectionId = title.toLowerCase().replace(/ /g, '-'); // Convert title to valid ID
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
//     }
//     setDropdownOpen(false); // Close dropdown after clicking
//   };

//   useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//           setDropdownOpen(false);
//         }
//       };
  
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);


//   const title = ['Graphic Design', 'Cartoon Animation', 'Illustration', 'Web Development', 'Logo Design', 'Social Graphics', 'Article Writing', 'Video Editing', 'App Development', 'AI & ML', 'UI & UX', 'Digital Marketing', 'Photography', 'Others'];

//   return (
//     <div className="bg-blue-300 h-screen">
//       <div>
//         <Navbar />
//       </div>
//       <div className='flex justify-center my-10'>
//               <div className="flex flex-col sm:flex-row items-center w-full md:max-w-3xl ">
//                 <input
//                   type="text"
//                   // value={searchQuery}
//                   // onChange={(e) => setSearchQuery(e.target.value)}
//                   // onKeyPress={handleKeyPress}
//                   placeholder="Search Here"
//                   className="py-3 px-4 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 sm:mb-0 sm:mr-4 w-full"
//                 />
//                 <div className="relative">
//                   <button
//                     className="bg-blue-500 flex gap-2 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300"
//                     // onClick={toggleDropdown}
//                     onClick={toggleDropdown}
//                   >
//                     <div>Filter</div>
//                     <span className="mt-1"><FaFilter /></span>
//                   </button>
      
//                   {/* Dropdown menu */}
//                   {isDropdownOpen && (
//                     <div className="absolute mt-2 bg-white shadow-lg rounded-xl w-64 p-4 z-10" ref={dropdownRef}>
//                       <ul className="space-y-2">
//                         {title.map((item, index) => (
//                           <li key={index} className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg" onClick={() => handleTitleClick(item)}>
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//                 {/* <button onClick={handleSearch} className="bg-blue-500 w-40 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300">
//                   Search
//                 </button> */}
//               </div>
//             </div>
//       <div>
//         <section className="px-4 py-10 ">

//           <div className="relative">
//             <div className="flex justify-center">
//               <div
//                 // ref={carouselRef}
//                 className="flex gap-6 md:gap-10 overflow-x-auto w-[1200px] scrollbar-hide scroll-smooth snap-x mx-6 md:mx-20"
//               >
//                 {portfolios.map((portfolio, index) => (
//                   <div
//                     key={index}
//                     className="bg-white shadow-md rounded-lg overflow-hidden p-4 snap-center min-w-[300px] md:min-w-[400px] flex-shrink-0"
//                   >
//                     <Image
//                       src={portfolio.image}
//                       alt={portfolio.name}
//                       width={360}
//                       height={360}
//                       className="w-full rounded-lg object-cover"
//                     />
//                     <div className="mt-4 text-center flex justify-between mx-4">
//                       <div>
//                         <h3 className="text-xl font-semibold">{portfolio.name}</h3>
//                         <p className="text-gray-500">{portfolio.role}</p>
//                       </div>
//                       <div className="mt-4">
//                         <a href="#" className="text-blue-500 font-semibold">
//                           →
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       <div>
//         <Footer/>
//       </div>
//     </div>
//   )
// }

// export default FindFreelancers;



"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaFilter } from "react-icons/fa";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

interface Portfolio {
  firstname: string;
  portfolioRole: string;
  portfolioSrc: string;
  portfolioLink: string;
}

const FindFreelancers: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleTitleClick = (title: string) => {
    const sectionId = title.toLowerCase().replace(/ /g, '-');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchPortfolios = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://career-net-server.vercel.app/api/auth/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        console.log('data',data);
        
        // Filter and map the data to match our Portfolio interface
        const portfolioData = data
          .filter((user: any) => user.portfolioSrc && user.portfolioRole)
          .map((user: any) => ({
            firstname: user.firstname,
            portfolioRole: user.portfolioRole,
            portfolioSrc: user.portfolioSrc,
            portfolioLink: user.portfolioLink || '#',
          }));

        setPortfolios(portfolioData);
      } catch (err) {
        setError('Failed to load portfolios. Please try again later.');
        console.error('Error fetching portfolios:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const title = ['Graphic Design', 'Cartoon Animation', 'Illustration', 'Web Development', 'Logo Design', 'Social Graphics', 'Article Writing', 'Video Editing', 'App Development', 'AI & ML', 'UI & UX', 'Digital Marketing', 'Photography', 'Others'];

  return (
    <div className="bg-blue-300 min-h-screen">
      <Navbar />
      <div className='flex justify-center my-10'>
        <div className="flex flex-col sm:flex-row items-center w-full md:max-w-3xl">
          <input
            type="text"
            placeholder="Search Here"
            className="py-3 px-4 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 sm:mb-0 sm:mr-4 w-full"
          />
          <div className="relative">
            <button
              className="bg-blue-500 flex gap-2 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300"
              onClick={toggleDropdown}
            >
              <div>Filter</div>
              <span className="mt-1"><FaFilter /></span>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-xl w-64 p-4 z-10" ref={dropdownRef}>
                <ul className="space-y-2">
                  {title.map((item, index) => (
                    <li key={index} className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg" onClick={() => handleTitleClick(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="px-4 py-10">
        {isLoading ? (
          <div className="text-center">Loading portfolios...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="relative">
            <div className="flex justify-center">
              <div className="flex gap-6 md:gap-10 overflow-x-auto w-[1200px] scrollbar-hide scroll-smooth snap-x mx-6 md:mx-20">
                {portfolios.map((portfolio, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden p-4 snap-center min-w-[300px] md:min-w-[400px] flex-shrink-0"
                  >
                    <Image
                      src={portfolio.portfolioSrc}
                      alt={portfolio.firstname}
                      width={360}
                      height={360}
                      className="w-full rounded-lg object-cover"
                    />
                    <div className="mt-4 text-center flex justify-between mx-4">
                      <div>
                        <h3 className="text-xl font-semibold">{portfolio.firstname}</h3>
                        <p className="text-gray-500">{portfolio.portfolioRole}</p>
                      </div>
                      <div className="mt-4">
                        <a href={portfolio.portfolioLink} className="text-blue-500 font-semibold">
                          →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default FindFreelancers;


