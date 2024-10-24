import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Job {
    projectName: string;
    description: string;
    skills: string[];
    payment: string;
    currency: string;
    fileUrl: string;
    isHourly: boolean;
    email: string;
    _id: string;
}

const MyPosts: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async (userEmail: string | null) => {
            const token = localStorage.getItem('token');
            if (!userEmail) return;
            try {
                const response = await fetch('https://career-net-server.vercel.app/api/projects/mypost', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userEmail }),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data); // Log the entire response
                setJobs(data.posts || []); // Ensure data.posts exists
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching jobs.');
            } finally {
                setLoading(false);
            }
        };
        const userEmail = '';
        fetchJobs(userEmail);
    }, []);

    if (loading) {
        return <p>Loading your posts...</p>;
    }

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
                                    <img src={job.fileUrl} alt={job.projectName} className="w-full h-40 object-cover" />
                                </div>
                            )}
                            <p><strong>Contact:</strong> {job.email}</p>
                        </div>
                    ))}
                </div>
            )}
            {/* <ToastContainer /> */}
        </div>
    );
};

export default MyPosts;
