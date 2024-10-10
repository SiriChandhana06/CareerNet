"use client";
import Navbar from '@/Components/Navbar';
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const findwork: React.FC = () => {

  const [projectData, setProjectData] = useState<any>(null);
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
        const response = await fetch('http://localhost:5000/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data = await response.json();
        setProjectData(data); // Set the fetched data (an array of projects)
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (projectData.length === 0) {
    return <p className="text-center text-gray-600">No projects posted yet.</p>;
  }


  return (
    <div className='bg-blue-300'>
      <div>
        <Navbar />
      </div>
      <div>
        {projectData.map((project, index) => (
          <div key={index} className="w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center">
            <Image
              src={project.fileUrl || '/default-image.jpg'}
              alt='image'
              width={10}
              height={10}
              className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-full"
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
        ))}
      </div>
    </div>
  )
}

export default findwork;
