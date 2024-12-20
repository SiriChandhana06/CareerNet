// import { useRef } from "react";
// import Image from "next/image";
// import porfolio from "@/Assests/potfolio.webp";

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

// const PortfolioSection = () => {
//   // const carouselRef = useRef<HTMLDivElement | null>(null);

//   // const scrollLeft = () => {
//   //   carouselRef.current.scrollBy({
//   //     left: -carouselRef.current.offsetWidth,
//   //     behavior: "smooth",
//   //   });
//   // };

//   // const scrollRight = () => {
//   //   carouselRef.current.scrollBy({
//   //     left: carouselRef.current.offsetWidth,
//   //     behavior: "smooth",
//   //   });
//   // };

//   return (
//     <section className="px-4 py-10 ">
//       <div className="text-center mb-8">
//         <div className="text-sm md:text-2xl font-bold">
//         <p className="text-gray-500">Logos, websites, book covers & more!</p>
//         <h2 className="text-3xl md:text-5xl my-4">
//           Checkout The Best <span className="text-blue-600 font-bold">Portfolios</span> Here
//           </h2>
//         </div> 
//       </div>

//       <div className="relative">
//         {/* Left Arrow */}   
//         {/* <button
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
//           onClick={scrollLeft}
//         >
//           &#8249;
//         </button> */}

//         {/* Carousel */}
//         <div className="flex justify-center">
//         <div
//           // ref={carouselRef}
//           className="flex gap-6 md:gap-10 overflow-x-auto w-[1200px] scrollbar-hide scroll-smooth snap-x mx-6 md:mx-20"
//         >
//           {portfolios.map((portfolio, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-lg overflow-hidden p-4 snap-center min-w-[300px] md:min-w-[400px] flex-shrink-0"
//             >
//               <Image
//                 src={portfolio.image}
//                 alt={portfolio.name}
//                 width={360}
//                 height={360}
//                 className="w-full rounded-lg object-cover"
//               />
//               <div className="mt-4 text-center flex justify-between mx-4">
//                 <div>
//                 <h3 className="text-xl font-semibold">{portfolio.name}</h3>
//                 <p className="text-gray-500">{portfolio.role}</p>
//                 </div>
//                 <div className="mt-4">
//                   <a href="#" className="text-blue-500 font-semibold">
//                     →
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         </div>

//         {/* Right Arrow */}
//         {/* <button
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
//           onClick={scrollRight}
//         >
//           &#8250;
//         </button> */}
//       </div>
//     </section>
//   );
// };

// export default PortfolioSection;



"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Portfolio {
  firstName: string;
  portfolioRole: string;
  portfolioSrc: string;
  portfolioLink: string;
}

const PortfolioSection = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://career-net-server.vercel.app/api/auth/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        console.log('Fetched data:', data); 

        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format received');
        }

        let usersArray: any[];
        if (Array.isArray(data)) {
          usersArray = data;
        } else if (data.users && Array.isArray(data.users)) {
          usersArray = data.users;
        } else {
          throw new Error('Fetched data does not contain a valid users array');
        }

        const portfolioData = usersArray
          .filter((user: any) => user.portfolioSrc && user.portfolioRole)
          .map((user: any) => ({
            firstName: user.firstName || 'Unknown',
            portfolioRole: user.portfolioRole,
            portfolioSrc: user.portfolioSrc,
            portfolioLink: user.portfolioLink || '#',
          }));

        // Ensure data is an array and filter for portfolios with required fields
        setPortfolios(portfolioData.slice(0, 5));
        // Get the first 5 portfolios
        // setPortfolios(validPortfolios);
      } catch (err) {
        setError('Failed to load portfolios. Please try again later.');
        console.error('Error fetching portfolios:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // if (isLoading) {
  //   return <h1 className="text-center text-2xl font-bold py-10">Loading...</h1>;
  // }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="px-4 py-10">
      <div className="text-center mb-8">
        <div className="text-sm md:text-2xl font-bold">
          <p className="text-gray-500">Logos, websites, book covers & more!</p>
          <h2 className="text-3xl md:text-5xl my-4">
            Checkout The Best <span className="text-blue-600 font-bold">Portfolios</span> Here
          </h2>
        </div> 
      </div>

      {isLoading &&(
        <div className="text-center text-2xl font-bold py-10">Loading...</div>
      )}

      <div className="relative">
        <div className="flex justify-center">
          <div className="flex gap-6 md:gap-10 overflow-x-auto w-[1200px] scrollbar-hide scroll-smooth snap-x mx-6 md:mx-20">
            {portfolios.map((portfolio, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 snap-center w-[300px] md:w-[400px] flex-shrink-0"
              >
                <Image
                  src={portfolio.portfolioSrc}
                  alt={portfolio.firstName}
                  width={360}
                  height={360}
                  className="w-full rounded-lg object-cover"
                />
                <div className="mt-4 text-center flex justify-between mx-4">
                  <div>
                    <h3 className="text-xl font-semibold">{portfolio.firstName}</h3>
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
    </section>
  );
};

export default PortfolioSection;

