"use client";
import Navbar from '@/Components/Navbar';
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const findwork: React.FC = () => {
  const [projectData, setProjectData] = useState<any>(null);

  useEffect(() => {
    const storedProject = localStorage.getItem('postedProject');
    if (storedProject) {
      setProjectData(JSON.parse(storedProject));
    }
  }, []);

  return (
    <div className='bg-blue-300'>
      <div>
        <Navbar />
      </div>
      <div>
        {projectData ? (
          <div className="w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center">
            <Image
              src={projectData.file}
              alt='image'
              className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-full"
            />
            <h3 className="text-xl font-semibold">{projectData.projectName}</h3>
            <p className="text-gray-600 mt-2  text-center">{projectData.description}</p>

            <div className="flex flex-wrap space-x-2 space-y-2 my-2">
              {projectData.skills.map((skill: string, index: number) => (
                <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <div className='flex justify-between'>
              <div>
                <p className="text-lg font-semibold mt-4">
                  {projectData.isHourly ? 'Per Hour' : 'Fixed Payment'}
                </p>
                <p className="text-lg font-semibold">
                  {projectData.payment} {projectData.currency}
                </p>
              </div>
              <div>
                <a
                  href={`mailto:${projectData.email}`}
                  className="text-blue-500 mt-8 block hover:underline"
                >
                  Apply now
                </a>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No project posted yet.</p>
        )}
      </div>
    </div>
  )
}

export default findwork;
