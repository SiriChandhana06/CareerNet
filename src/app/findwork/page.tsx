"use client";
import Navbar from '@/Components/Navbar';
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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

const Findwork: React.FC = () => {

  const [projectData, setProjectData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // useEffect(() => {
  //   const storedProject = localStorage.getItem('postedProject');
  //   if (storedProject) {
  //     setProjectData(JSON.parse(storedProject));
  //   }
  // }, []);

  useEffect(() => {
    const fetchProjectData = async () => {
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


  return (
    <div className='bg-blue-300 h-full lg:h-screen'>
      <div><Navbar /></div>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {loading ? (
          // Render loading skeleton only for the cards section
          <div className="animate-pulse p-4">
            <div className="w-96 h-54 bg-gray-400 rounded-full mb-4 "></div>
            <div className="h-6 bg-gray-400 rounded mb-2"></div>
            <div className="h-16 bg-gray-400 rounded mb-2"></div>
            <div className="h-8 bg-gray-400 rounded mb-4"></div>
            <div className="h-40 bg-gray-400 rounded"></div>
          </div>
        ) : projectData.length === 0 ? (
          <p className="text-center text-gray-600">No projects posted yet.</p>
        ) : (
          projectData.map((project: Project, index) => (
            <div key={index} className="w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center">
              <Image
                src={project.fileUrl || '/default-image.jpg'}
                alt='image'
                width={20}
                height={20}
                className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full"
              />
              <h3 className="text-xl font-semibold">{project.projectName}</h3>
              <p className="text-gray-600 mt-2  text-center">{project.description}</p>

              {/* <div className="flex flex-wrap space-x-2 space-y-2 my-2">
              {projectData.skills.map((skill: string, index: number) => (
                <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div> */}

              <div className="flex flex-wrap justify-center space-x-2 my-2">
                {project.skills.map((skill: string, index: number) => (
                  <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <div className='flex justify-between'>
                <div>
                  <p className="text-lg font-semibold mt-4">
                    {project.isHourly ? 'Per Hour' : 'Fixed Payment'}
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
          ))
        )}
      </div>
    </div>
  )
}

export default Findwork;
