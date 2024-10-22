import { useRef } from "react";
import Image from "next/image";
import porfolio from "@/Assests/potfolio.webp";

const portfolios = [
  {
    name: "Bunny.design",
    role: "UI/UX Designer",
    image: porfolio,
  },
  {
    name: "Bhaskar Tiwari",
    role: "Graphic Designer",
    image: porfolio,
  },
  {
    name: "Aksara Joshi",
    role: "Graphic Designer",
    image: porfolio,
  },
  {
    name: "Designer 4",
    role: "Graphic Designer",
    image: porfolio,
  },
];

const PortfolioSection = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // const scrollLeft = () => {
  //   carouselRef.current.scrollBy({
  //     left: -carouselRef.current.offsetWidth,
  //     behavior: "smooth",
  //   });
  // };

  // const scrollRight = () => {
  //   carouselRef.current.scrollBy({
  //     left: carouselRef.current.offsetWidth,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <section className="px-4 py-10 ">
      <div className="text-center mb-8">
        <div className="text-sm md:text-2xl font-bold">
        <p className="text-gray-500">Logos, websites, book covers & more!</p>
        <h2 className="text-3xl md:text-5xl my-4">
          Checkout The Best <span className="text-blue-600 font-bold">Portfolios</span> Here
          </h2>
        </div> 
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {/* <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
          onClick={scrollLeft}
        >
          &#8249;
        </button> */}

        {/* Carousel */}
        <div className="flex justify-center">
        <div
          ref={carouselRef}
          className="flex gap-6 md:gap-10 overflow-x-auto w-[1200px] scrollbar-hide scroll-smooth snap-x mx-6 md:mx-20"
        >
          {portfolios.map((portfolio, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4 snap-center min-w-[300px] md:min-w-[400px] flex-shrink-0"
            >
              <Image
                src={portfolio.image}
                alt={portfolio.name}
                width={24}
                height={12}
                className="w-full rounded-lg object-cover"
              />
              <div className="mt-4 text-center flex justify-between mx-4">
                <div>
                <h3 className="text-xl font-semibold">{portfolio.name}</h3>
                <p className="text-gray-500">{portfolio.role}</p>
                </div>
                <div className="mt-4">
                  <a href="#" className="text-blue-500 font-semibold">
                    →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Right Arrow */}
        {/* <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
          onClick={scrollRight}
        >
          &#8250;
        </button> */}
      </div>
    </section>
  );
};

export default PortfolioSection;
