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

        const email = 'sirisiri3006@gmail.com'; // You can fetch this from a context or other source
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job._id} className="border p-4 rounded shadow-md bg-white">
                            <h2 className="text-xl font-bold">{job.projectName}</h2>
                            <p>{job.description}</p>
                            <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                            <p><strong>Payment:</strong> {job.payment} {job.currency}</p>
                            <p><strong>Type:</strong> {job.isHourly ? 'Hourly' : 'Fixed'}</p>
                            {job.fileUrl && (
                                <div>
                                    <strong>Project Image:</strong>
                                    <Image src={job.fileUrl} alt={job.projectName} className="w-full h-40 object-cover" width={400} height={160} />
                                </div>
                            )}
                            <p><strong>Contact:</strong> {job.email}</p>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default MyPosts;
