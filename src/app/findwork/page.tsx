"use client";
import Navbar from '@/Components/Navbar';
import React from 'react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaFilter } from "react-icons/fa";
import Footer from '@/Components/Footer';

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
  category: string;
};

const Findwork: React.FC = () => {

  const [projectData, setProjectData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  //   const toggleDropdown = (id: string) => {
  //     setIsDropdownOpen((prevId) => (prevId === id ? null : id));
  // };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleTitleClick = (title: string) => {
    const sectionId = title.toLowerCase().replace(/ /g, '-'); // Convert title to valid ID
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
    }
    setDropdownOpen(false); // Close dropdown after clicking
  };



  // useEffect(() => {
  //   const storedProject = localStorage.getItem('postedProject');
  //   if (storedProject) {
  //     setProjectData(JSON.parse(storedProject));
  //   }
  // }, []);


  // const randomImages = [
  //   '/Assests/article.png',
  //   '/Assests/cartoon.png',
  //   '/Assests/flyers.png',
  //   '/Assests/graphics.png',
  //   '/Assests/illustartion.png',
  //   '/Assests/logo design.png',
  //   '/Assests/randomimage1.png',
  //   '/Assests/randomimage2.png',
  //   '/Assests/randomimage3.jpg',
  //   '/Assests/randomimage4.jpg',
  //   '/Assests/social.png',
  //   '/Assests/video.png',
  // ];


  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://career-net-server.vercel.app/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data = await response.json();
        setProjectData(data);
        console.log(data);

      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get("search");
    if (query) {
      setSearchQuery(decodeURIComponent(query));
    }
  }, []);


  const filteredProjects = projectData.filter(project =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/findwork?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };




  // if (loading) {
  //   return (
  //     <div className="bg-gray-900 text-white min-h-screen">
  //       <div className="container mx-auto p-4">
  //         <div className="animate-pulse p-4">
  //           <div className="h-10 bg-gray-400 rounded mb-4"></div>
  //           <div className="h-4 bg-gray-400 rounded mb-2"></div>
  //           <div className="h-4 bg-gray-400 rounded mb-2"></div>
  //           <div className="h-8 bg-gray-400 rounded mb-4"></div>
  //           <div className="h-40 bg-gray-400 rounded"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }




  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // if (projectData.length === 0 ) {
  //   return <p className="text-center text-gray-600">No projects posted yet.</p>;
  // }


  const title = ['Graphic Design', 'Cartoon Animation', 'Illustration', 'Web Development', 'Logo Design', 'Social Graphics', 'Article Writing', 'Video Editing', 'App Development', 'AI & ML', 'UI & UX', 'Digital Marketing', 'Photography', 'Others'];



  return (
    <div className='bg-blue-300 h-full'>
      <div><Navbar /></div>
      <div className='flex justify-center my-10'>
        <div className="flex flex-col sm:flex-row items-center w-full md:max-w-3xl ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search Here"
            className="py-3 px-4 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 sm:mb-0 sm:mr-4 w-full"
          />
          <div className="relative">
            <button
              className="bg-blue-500 flex gap-2 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300"
              // onClick={toggleDropdown}
              onClick={toggleDropdown}
            >
              <div>Filter</div>
              <span className="mt-1"><FaFilter /></span>
            </button>

            {/* Dropdown menu */}
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
          {/* <button onClick={handleSearch} className="bg-blue-500 w-40 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300">
            Search
          </button> */}
        </div>
      </div>
      {/* <div className="m-4 md:m-20">
      {title.map((title, index) => (
        <div key={index} className="relative">
          <p className="text-lg mt-10 font-medium">{title}</p>
          <span className="absolute left-0 top-full mt-1 w-56 md:w-96 h-[2px] bg-blue-500"></span>
        </div>
      ))}
    </div>
    <div className="flex justify-center p-2 md:p-6">
  {loading ? (
    // Render loading skeleton only for the cards section
    <div className="h-screen">
      <div className="animate-pulse p-4">
        <div className="w-96 h-54 bg-gray-400 rounded-full mb-4 "></div>
        <div className="h-6 bg-gray-400 rounded mb-2"></div>
        <div className="h-16 bg-gray-400 rounded mb-2"></div>
        <div className="h-8 bg-gray-400 rounded mb-4"></div>
        <div className="h-40 bg-gray-400 rounded"></div>
      </div>
    </div>
  ) : filteredProjects.length === 0 ? (
    <div className="h-screen">
      <p className="text-center text-gray-600">No projects posted yet.</p>
    </div>
  ) : (
    <div className="flex gap-6 overflow-x-auto p-2 md:p-6 w-[350px] md:w-full scrollbar-hide">
      {filteredProjects.map((project: Project, index) => (
        <div
          key={index}
          className="w-80 md:w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center flex-shrink-0"
        >
          <Image
            src={
              project.fileUrl && project.fileUrl.trim() !== ""
                ? project.fileUrl
                : "/Assests/article.png"
            }
            alt="image"
            height={200}
            width={200}
            className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full"
          />
          <h3 className="text-xl font-semibold">{project.projectName}</h3>
          <p className="text-gray-600 mt-2 text-center">
            {project.description}
          </p>

          <div className="flex flex-wrap justify-center space-x-2 my-2">
            {project.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-2 py-1 rounded-full my-1"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold mt-4">
                {project.isHourly ? "Per Hour" : "Fixed Payment"}
              </p>
              <p className="text-lg font-semibold">
                {project.payment} {project.currency}
              </p>
            </div>
            <div>
              <a
                href={`mailto:${project.email}`}
                className="text-blue-500 mt-8 block hover:underline"
              >
                Apply now
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div> */}


      <div className="m-4 md:m-20">
        {loading && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        )}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            <p>No data found for {searchQuery}.</p>
          </div>
        )}
        {title.map((currentTitle, index) => {
          // Convert title to a valid HTML ID
          const id = currentTitle.toLowerCase().replace(/ /g, '-');

          // Filter the projects for the current category
          const filteredProjectsForCategory = filteredProjects.filter(
            (project: Project) => project.category === currentTitle
          );

          // Only render section if there are projects
          if (filteredProjectsForCategory.length === 0) return null;

          return (
            <section key={index} id={id} className="py-10">
              <div className="">
                <div className="relative">
                  <p className="text-lg mt-10 font-medium">{currentTitle}</p>
                  <span className="absolute left-0 top-full mt-1 w-56 md:w-96 h-[2px] bg-blue-500"></span>
                </div>

                {/* Display the filtered projects */}
                <div className="flex gap-6 overflow-x-auto p-2 md:p-6 w-[350px] md:w-full scrollbar-hide">
                  {filteredProjectsForCategory.map((project: Project, index) => (
                    <div
                      key={index}
                      className="w-80 md:w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center flex-shrink-0"
                    >
                      <Image
                        src={
                          project.fileUrl && project.fileUrl.trim() !== ""
                            ? project.fileUrl
                            : "/Assests/article.png"
                        }
                        alt="image"
                        height={200}
                        width={200}
                        className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full"
                      />
                      <h3 className="text-xl font-semibold">{project.projectName}</h3>
                      <p className="text-gray-600 mt-2 text-center">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap justify-center space-x-2 my-2">
                        {project.skills.map((skill: string, index: number) => (
                          <span
                            key={index}
                            className="bg-blue-500 text-white px-2 py-1 rounded-full my-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p className="text-lg font-semibold mt-4">
                            {project.isHourly ? "Per Hour" : "Fixed Payment"}
                          </p>
                          <p className="text-lg font-semibold">
                            {project.payment} {project.currency}
                          </p>
                        </div>
                        <div>
                          <a
                            href={`mailto:${project.email}`}
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
            </section>
          );
        })}
      </div>


      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Findwork;
