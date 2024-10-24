import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
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
    _id: string; // Assuming MongoDB ID
}

const MyPosts: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const response = await fetch(`https://career-net-server.vercel.app/api/projects?userId=${user.uid}`);
                    const result = await response.json();
                    
                    if (response.ok) {
                        setJobs(result);
                    } else {
                        toast.error(result.message || 'Failed to fetch jobs.');
                    }
                }
            } catch (error) {
                toast.error('Error fetching jobs.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
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
            <ToastContainer />
        </div>
    );
};

export default MyPosts;