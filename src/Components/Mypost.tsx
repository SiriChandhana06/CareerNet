"use client";
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { IoWarningOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


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
    category: string;
}

const MyPosts: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // const randomImages = [
    //     '/Assests/article.png',
    //     '/Assests/cartoon.png',
    //     '/Assests/flyers.png',
    //     '/Assests/graphics.png',
    //     '/Assests/illustartion.png',
    //     '/Assests/logo design.png',
    //     '/Assests/randomimage1.png',
    //     '/Assests/randomimage2.png',
    //     '/Assests/randomimage3.jpg',
    //     '/Assests/randomimage4.jpg',
    //     '/Assests/social.png',
    //     '/Assests/video.png',
    //   ];

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
                const projects = Array.isArray(data.project) ? data.project : [data.project];
                setJobs(projects);
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching jobs.');
                setLoading(false); // Ensure loading is set to false on error
            }
        };

        // Check for Firebase Auth user or fallback to local storage
        const user = JSON.parse(localStorage.getItem('firebaseUser') || 'null');
        console.log('Firebase User:', user); // Log the user data
        const email = user?.email || localStorage.getItem('userEmail'); // Get email from Firebase Auth or local storage
        console.log('Email:', email); // Log the email being used
        fetchJobs(email);
    }, []);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) {
        return <p>Loading your posts...</p>;
    }

    console.log(jobs);


    const toggleDropdown = (id: string) => {
        setIsDropdownOpen((prevId) => (prevId === id ? null : id));
    };

    const handleEdit = () => {
        console.log("Edit clicked");
    };

    const handleShare = () => {
        console.log("Share clicked");
    };

    // const handleCopyLink = () => {
    //     console.log("Copy link clicked");
    // };

    const handleCopyLink = (id: string) => {
        const postUrl = `https://career-net-server.vercel.app/api/projects/posts/${id}`; // Replace with the actual post URL format
        navigator.clipboard.writeText(postUrl)
            .then(() => {
                console.log("Link copied to clipboard:", postUrl);
                toast.success("Link copied to clipboard!");
            })
            .catch((error) => {
                console.error("Failed to copy link:", error);
                toast.error("Failed to copy the link. Please try again.");
            });
    };

    // const handleDelete = () => {
    //     console.log("Deleted");
    // };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this post?"
        );
        if (!confirmed) return;
    
        try {
          const response = await fetch(
            `https://career-net-server.vercel.app/api/projects/mypost/${id}`,
            {
              method: "DELETE",
            }
          );
    
          if (response.ok) {
            toast.success("Project deleted successfully.");
            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
          } else {
            toast.error("Failed to delete the project.");
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        }
      };
    


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Posted Jobs</h1>
            {jobs.length === 0 ? (
                <p className='flex justify-center gap-1'> <IoWarningOutline className='text-4xl text-blue-500 ' /> <span className='font-semibold mt-2'>You haven&apos;t posted any jobs yet.</span></p>
            ) : (
                <div className="flex flex-wrap justify-center gap-6 p-6">
                    {jobs.map((job) => (
                        <div key={job._id} className="w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center" ref={dropdownRef}>
                            {/* <div className='flex justify-end'>
                            <button><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path fill="#3b82f5" d="M9 15.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m0-5a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m0-5a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0"/></svg></button>
                            </div> */}
                            <div className="relative">
                                <div className="flex justify-end">
                                    <button onClick={() => toggleDropdown(job._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20">
                                            <path fill="#3b82f5" d="M9 15.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m0-5a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m0-5a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Dropdown Menu */}
                                {isDropdownOpen === job._id && (
                                    <div className="absolute -right-4 mt-2 w-54 bg-white border rounded shadow-lg z-10">
                                        <button
                                            onClick={handleEdit}
                                            className="flex gap-1 w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#3b82f5" d="m5 16l-1 4l4-1L18 9l-3-3z" opacity="0.16" /><path stroke="#3b82f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8" /></g></svg> <span className='text-lg'> Edit </span>
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="flex gap-1 w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14"><g fill="none" stroke="#3b82f5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 .88C3.665.88.88 3.67.88 7.002a6.14 6.14 0 0 0 1.025 3.39L.877 13.127l3.439-.622A6.1 6.1 0 0 0 7 13.121c3.338.002 6.127-2.784 6.127-6.118c0-3.33-2.79-6.126-6.127-6.124Z" /><path d="M7.337 9.7c.829.531 1.692.144 2.294-.305c.415-.31.402-.907.047-1.285l-.7-.745c-.265.265-.783.397-1.142.287c-.773-.235-1.097-.637-1.36-1.047c-.301-.47.04-1.172.305-1.437l-.78-.712c-.329-.3-.828-.35-1.115-.01c-.568.673-.92 1.696-.503 2.347c.75 1.169 1.785 2.156 2.954 2.906Z" /></g></svg><span className='text-lg'> Share On Whatsapp</span>
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="flex gap-1 w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="#3b82f5" d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518a3.3 3.3 0 0 0 1.447-1.817a6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429a3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218a3.2 3.2 0 0 1-.865.115a3 3 0 0 1-.614-.057a3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" /></svg> <span className='text-lg'> Share On Twitter</span>
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="flex gap-1 w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#3b82f5" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02" /></svg> <span className='text-lg'> Share On Facebook</span>
                                        </button>
                                        <button
                                            // onClick={handleCopyLink}
                                            onClick={() => handleCopyLink(job._id)}
                                            className="flex gap-1 w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#3b82f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></g></svg> <span className='text-lg'> Copy Link </span>
                                        </button>
                                        <button
                                            // onClick={handleDelete}
                                            onClick={() => handleDelete(job._id)} 
                                            className="flex gap-1 w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
                                        >
                                            <MdDelete className='text-blue-500 text-2xl' /><span className='text-lg'> Delete </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {job.fileUrl && (
                                <div>
                                    {/* <strong>Project Image:</strong> */}
                                    <Image src={job.fileUrl && job.fileUrl.trim() !== '' ? job.fileUrl : '/Assests/article.png'} alt={job.projectName} className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full" height={200} width={200} />
                                </div>
                            )}
                            <h2 className="text-xl font-semibold">{job.projectName}</h2>
                            <p className="text-gray-600 mt-2  text-center">{job.description}</p>
                            {/* <p><strong>Skills:</strong> {job.skills.join(', ')}</p> */}
                            <div className="flex flex-wrap justify-center space-x-2 my-2">
                                {job.skills.map((skill: string, index: number) => (
                                    <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full my-1">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <p className='mt-2'>
                                <strong>Category:</strong> <span className="">{job.category}</span>
                            </p>
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
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="colored"
            />
            {/* <ToastContainer /> */}
        </div>
    );
};

export default MyPosts;
