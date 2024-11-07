"use client";
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import grapic from "@/Assests/graphics.png";
import Image from 'next/image';


type Project = {
  fileUrl: string;
  title: string;
  description: string;
  projectName: string;
  skills: [string];
  isHourly: boolean;
  payment: number;
  currency: string;
  email: string;
};

const works = [
  {
    title: "Logo Design",
    description: "Need a professional logo with writing underneath for our jewellery company",
    bid: "$500",
    link: "#",
    icon: grapic,
  },
  {
    title: "Graphic Design",
    description: "We need a graphic designer with UI/UX skills for our Furniture company",
    bid: "$500",
    link: "#",
    icon: grapic,
  },
  {
    title: "Need a SEO",
    description: "Need an SEO for our company who will lift our company to a higher level",
    bid: "$300",
    link: "#",
    icon: grapic,
  },
  {
    title: "Web Development",
    description: "Looking for a full-stack web developer for our ecommerce platform",
    bid: "$700",
    link: "#",
    icon: grapic,
  },
  {
    title: "Content Writing",
    description: "Need a content writer for product descriptions and blogs",
    bid: "$400",
    link: "#",
    icon: grapic,
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch('https://career-net-server.vercel.app/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data = await response.json();
        console.log(data);
        setProjectData(data.slice(-5).reverse()); // Fetch latest 5 projects and reverse them to show newest first
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);


  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? works.length - 3 : prevIndex - 1
  //   );
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === works.length - 3 ? 0 : prevIndex + 1
  //   );
  // };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectData.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projectData.length - 3 ? 0 : prevIndex + 1
    );
  };


  return (
    <div className='mx-10 md:mx-24'>
      <h2 className="text-gray-500 text-xl md:text-2xl text-left">The latest freelance work!</h2>
      <div className='flex justify-between'>
        <div>
          <h1 className="text-xl md:text-3xl lg:text-5xl font-semibold mt-2">
            Recently Posted <span className="text-blue-600">Works</span>
          </h1>
        </div>
        <div className='flex gap-2 md:gap-4'>
          <button
            onClick={handlePrev}
            className="bg-white text-blue-600 p-2 md:p-4 lg:p-6 rounded-full hover:bg-blue-700 hover:text-white transition"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white p-2 md:p-4 lg:p-6 rounded-full hover:bg-white hover:text-blue-600 transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      {loading ? (
        <div className='h-screen'>
          <div className="animate-pulse p-4">
            <div className="w-96 h-54 bg-gray-400 rounded-full mb-4 "></div>
            <div className="h-6 bg-gray-400 rounded mb-2"></div>
            <div className="h-16 bg-gray-400 rounded mb-2"></div>
            <div className="h-8 bg-gray-400 rounded mb-4"></div>
            <div className="h-40 bg-gray-400 rounded"></div>
          </div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex py-2">
          <div className="relative mt-8 w-full ">
            <div className='hidden lg:block'>
              <div className="flex space-x-6 items-center overflow-hidden w-full justify-center ">
                {projectData.slice(currentIndex, currentIndex + 3).map((work, index) => (
                  <div
                    key={index}
                    className="w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center"
                  >
                    <Image
                      src={work.fileUrl && work.fileUrl.trim() !== '' ? work.fileUrl : '/Assests/article.png'}
                      alt={work.projectName}
                      height={200}
                      width={200}
                      className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full"
                    />
                    <h3 className="text-xl font-semibold">{work.projectName}</h3>
                    <p className="text-gray-600 mt-2">{work.description}</p>
                    <div className="flex flex-wrap justify-center space-x-2 my-2">
                      {work.skills.map((skill: string, index: number) => (
                        <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full my-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className='flex justify-between'>
                      <div>
                        <p className="text-lg font-semibold mt-4">
                          {work.isHourly ? 'Per Hour' : 'Fixed Payment'}
                        </p>
                        <p className="text-lg font-semibold">
                          {work.payment} {work.currency}
                        </p>
                      </div>
                      <div>
                        <a
                          href={`mailto:${work.email}`}
                          className="text-blue-500 mt-8 block hover:underline"
                        >
                          Apply now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-6 items-center overflow-hidden w-full justify-center  lg:hidden">
              {projectData.slice(currentIndex, currentIndex + 1).map((work, index) => (
                <div
                  key={index}
                  className="w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center"
                >
                  <Image
                    src={work.fileUrl && work.fileUrl.trim() !== '' ? work.fileUrl : '/Assests/article.png'}
                    alt={work.projectName}
                    height={200}
                    width={200}
                    className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full"
                  />
                  <h3 className="text-xl font-semibold">{work.projectName}</h3>
                  <p className="text-gray-600 mt-2">{work.description}</p>
                  <div className="flex flex-wrap justify-center space-x-2 my-2">
                    {work.skills.map((skill: string, index: number) => (
                      <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full my-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <p className="text-lg font-semibold mt-4">
                        {work.isHourly ? 'Per Hour' : 'Fixed Payment'}
                      </p>
                      <p className="text-lg font-semibold">
                        {work.payment} {work.currency}
                      </p>
                    </div>
                    <div>
                      <a
                        href={`mailto:${work.email}`}
                        className="text-blue-500 mt-8 block hover:underline"
                      >
                        Apply now
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
