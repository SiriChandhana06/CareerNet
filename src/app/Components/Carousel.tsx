import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const works = [
  {
    title: "Logo Design",
    description: "Need a professional logo with writing underneath for our jewellery company",
    bid: "$500",
    link: "#",
    icon: "/path-to-logo-icon.png", // Add path to your logo
  },
  {
    title: "Graphic Design",
    description: "We need a graphic designer with UI/UX skills for our Furniture company",
    bid: "$500",
    link: "#",
    icon: "/path-to-graphic-icon.png", // Add path to your icon
  },
  {
    title: "Need a SEO",
    description: "Need an SEO for our company who will lift our company to a higher level",
    bid: "$300",
    link: "#",
    icon: "/path-to-seo-icon.png", // Add path to your SEO icon
  },
  {
    title: "Web Development",
    description: "Looking for a full-stack web developer for our ecommerce platform",
    bid: "$700",
    link: "#",
    icon: "/path-to-webdev-icon.png", // Add path to your webdev icon
  },
  {
    title: "Content Writing",
    description: "Need a content writer for product descriptions and blogs",
    bid: "$400",
    link: "#",
    icon: "/path-to-content-icon.png", // Add path to your content writer icon
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? works.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === works.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-gray-500 text-lg">The latest freelance work!</h2>
      <h1 className="text-4xl font-semibold mt-2">
        Recently Posted <span className="text-blue-600">Works</span>
      </h1>

      <div className="relative mt-8 w-full max-w-5xl">
        <div className="flex justify-between items-center w-full">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
          >
            <FaArrowLeft />
          </button>

          {/* Carousel Cards */}
          <div className="flex space-x-6 overflow-hidden w-full justify-center">
            {works.slice(currentIndex, currentIndex + 3).map((work, index) => (
              <div
                key={index}
                className="w-80 h-60 bg-white shadow-lg rounded-xl p-6 text-center"
              >
                <img
                  src={work.icon}
                  alt={work.title}
                  className="w-12 h-12 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{work.title}</h3>
                <p className="text-gray-600 mt-2">{work.description}</p>
                <p className="text-lg font-semibold mt-4">Highest bid {work.bid}</p>
                <a
                  href={work.link}
                  className="text-blue-500 mt-2 block hover:underline"
                >
                  Apply now
                </a>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
