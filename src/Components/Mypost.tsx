"use client";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';


interface Job {
    projectName: string;
    description: string;
    skills: string[];
    payment: number;
    currency: string;
    fileUrl?: string;
    isHourly: boolean;
    email: string;
    _id: string;
}

const MyPosts: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const randomImages = [
        '/Assests/article.png',
        '/Assests/cartoon.png',
        '/Assests/flyers.png',
        '/Assests/graphics.png',
        '/Assests/illustartion.png',
        '/Assests/logo design.png',
        '/Assests/randomimage1.png',
        '/Assests/randomimage2.png',
        '/Assests/randomimage3.jpg',
        '/Assests/randomimage4.jpg',
        '/Assests/social.png',
        '/Assests/video.png',
      ];

    useEffect(() => {
        const fetchJobs = async (email: string | null) => {
            if (!email) return;

            try {
                const response = await fetch('https://career-net-server.vercel.app/api/projects/mypost', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log(data); // Log the entire response
                console.log(data.project);
                const projects = Array.isArray(data.project) ? data.project : [data.project];
                // Check if data.project is an array before setting state
                setJobs(projects);
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching jobs.');
                setLoading(false); // Ensure loading is set to false on error
            }
        };

        const email = localStorage.getItem('userEmail'); // You can fetch this from a context or other source
        fetchJobs(email);
    }, []);

    if (loading) {
        return <p>Loading your posts...</p>;
    }

    console.log(jobs);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Posted Jobs</h1>
            {jobs.length === 0 ? (
                <p>You haven&apos;t posted any jobs yet.</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-6 p-6">
                    {jobs.map((job) => (
                        <div key={job._id} className="w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center">
                            {job.fileUrl && (
                                <div>
                                    {/* <strong>Project Image:</strong> */}
                                    <Image src={job.fileUrl && job.fileUrl.trim() !== '' ? job.fileUrl : randomImages[Math.floor(Math.random() * randomImages.length)]} alt={job.projectName} className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full" height={200} width={200} />
                                </div>
                            )}
                            <h2 className="text-xl font-semibold">{job.projectName}</h2>
                            <p className="text-gray-600 mt-2  text-center">{job.description}</p>
                            {/* <p><strong>Skills:</strong> {job.skills.join(', ')}</p> */}
                            <div className="flex flex-wrap justify-center space-x-2 my-2">
                                {job.skills.map((skill: string, index: number) => (
                                    <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <p className="text-lg font-semibold mt-4">
                                        {job.isHourly ? 'Per Hour' : 'Fixed Payment'}
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {job.payment} {job.currency}
                                    </p>
                                </div>
                                <div className='mt-6'>
                                    <h1><strong>Contact:</strong> </h1>
                                    <p className="text-blue-500 block hover:underline">{job.email}</p>
                                </div>
                            </div>
                            {/* <p><strong>Payment:</strong> {job.payment} {job.currency}</p>
                            <p><strong>Type:</strong> {job.isHourly ? 'Hourly' : 'Fixed'}</p> */}
                            
                            {/* <p><strong>Contact:</strong> {job.email}</p> */}
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default MyPosts;
