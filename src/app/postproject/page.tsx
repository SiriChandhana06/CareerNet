"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import computer from '@/Assests/computer.png';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { User } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/Components/Navbar';
import { useRouter } from "next/navigation";

const firebaseConfig = {
    apiKey: "AIzaSyCsbWMLGCfVS0g6F2HMQTQrq1lKO_XTxSI",
    authDomain: "careernet-8baba.firebaseapp.com",
    projectId: "careernet-8baba",
    storageBucket: "careernet-8baba.appspot.com",
    messagingSenderId: "392064431851",
    appId: "1:392064431851:web:a873f6f6fdcec2896b30ae",
    measurementId: "G-81J4JH6M6M"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


interface FormData {
    projectName: string;
    description: string;
    skills: string[];
    payment: string;
    currency: string;
    isHourly: boolean;
    email: string;
    file: File | null;
    fileBase64: string | null;
    fileName: string;
}


const Postajob: React.FC = () => {
    const [file, setfile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        projectName: '',
        description: '',
        skills: [],
        payment: '',
        currency: 'USD',
        isHourly: true,
        email: "",
        file: null,
        fileBase64: null,
        fileName: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setFormData({ ...formData, file: e.target.files[0] });
    //     }
    // };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);



    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files && e.target.files[0] || null;

    //     // Check if the file is valid
    //     if (file) {
    //         const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/tiff'];
    //         if (!validTypes.includes(file.type)) {
    //             toast.error('Invalid file type. Please upload an image.');
    //             return;
    //         }

    //         if (file.size > 10485760) { // 10MB limit
    //             toast.error('File size exceeds 10MB.');
    //             return;
    //         }


    //         setFormData((prevData) => ({
    //             ...prevData,
    //             file
    //         }));
    //     }
    // };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0] || null;

        // Check if the file is valid
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/tiff'];
            if (!validTypes.includes(file.type)) {
                toast.error('Invalid file type. Please upload an image.');
                return;
            }

            if (file.size > 10485760) { // 10MB limit
                toast.error('File size exceeds 10MB.');
                return;
            }

            // If the user is not authenticated, convert the file to base64
            if (!user) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setFormData((prevData) => ({
                        ...prevData,
                        fileBase64: base64String,
                        fileName: file.name, // Store the file name for display
                        file: null,
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                // If authenticated, set the file directly
                setFormData((prevData) => ({
                    ...prevData,
                    file,
                    fileBase64: null,
                    fileName: file.name, // Store the file name for display
                }));
            }
        }
    };


    const handleSkillAdd = () => {
        if (skillInput && !formData.skills.includes(skillInput) && formData.skills.length < 10) {
            setFormData({ ...formData, skills: [...formData.skills, skillInput] });
            setSkillInput('');
        }
        else {
            toast.error('Skill already added or limit reached!');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.projectName || !formData.description || !formData.payment || !formData.skills.length || !formData.email) {
            toast.error('Please fill all the required fields.');
            console.log('2times');
            return;
        }
        else {
            toast.warning('Review the Form');
            console.log('Form submitted');
            setSubmitted(true);
        }
    };

    const handleEdit = () => {
        setSubmitted(false);
    };

    const removeSkill = (index: number) => {
        const newSkills = [...formData.skills];
        newSkills.splice(index, 1);
        setFormData({ ...formData, skills: newSkills });
    };

    // const handleReviewSubmit = () => {
    //     toast.success('You have posted the project successfully!');
    //     localStorage.setItem('postedProject', JSON.stringify(formData)); 
    //     setIsModalOpen(false);
    // }

    // const handleReviewSubmit = async () => {

    //     try {

    //         setIsUploading(true);

    //         let url = ' ';

    //         if (file) {
    //             const storageRef = ref(storage, `PostProjects/${file.name}`);
    //             await uploadBytes(storageRef, file);
    //             const url = await getDownloadURL(storageRef);
    //             setFileUrl(url);
    //         }
    //         const response = await fetch('https://career-net-server.vercel.app/api/projects', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ ...formData, fileUrl: url, userId: user?.uid }),
    //         });

    //         console.log(response.formData);

    //         const result = await response.json();

    //         if (response.ok) {
    //             toast.success('You have posted the project successfully!');
    //             setTimeout(() => {
    //                 router.push('/');
    //             }, 2000);
    //             localStorage.setItem('postedProject', JSON.stringify({ ...formData, fileUrl: url, userId: user?.uid }));
    //             console.log(formData);
    //         } else {
    //             toast.error(result.message || 'Failed to post project.');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         toast.error('Error posting project.');
    //     }
    //     finally {
    //         setIsUploading(false);
    //     }
    // };

    const handleReviewSubmit = async () => {
        try {
            setIsUploading(true);
            let fileUrl = ' ';

            if (formData.file && user) {
                // If user is authenticated, upload to Firebase Storage
                const storageRef = ref(storage, `PostProjects/${formData.file.name}`);
                await uploadBytes(storageRef, formData.file);
                fileUrl = await getDownloadURL(storageRef);
            } else if (formData.fileBase64) {
                // If user is not authenticated, store base64 string
                fileUrl = formData.fileBase64;
                console.log(formData.fileBase64);
            }

            // Post data to the backend
            const response = await fetch('https://career-net-server.vercel.app/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, fileUrl: fileUrl || '', userId: user?.uid }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('You have posted the project successfully!');
                setTimeout(() => {
                    router.push('/');
                }, 2000);
                localStorage.setItem('postedProject', JSON.stringify({ ...formData, fileUrl: fileUrl || '', userId: user?.uid }));
            } else {
                toast.error(result.message || 'Failed to post project.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error posting project.');
        } finally {
            setIsUploading(false);
        }
    };



    return (
        <div className='bg-blue-300 h-full md:h-screen lg:h-full'>
            <Navbar />
            <div className='mx-4 md:mx-20 py-10'>
                <div className=" p-6 bg-white/50 rounded-lg shadow-md space-y-4">
                    <h2 className="text-xl md:text-2xl text-black text-center font-semibold mb-4">Post <span className='text-blue-500'>Project</span></h2>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Project Name</label>
                                <input
                                    type="text"
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    placeholder='eg: E-Commerce Website'
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Project Description {"(50 Words)"}</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => {
                                        const words = e.target.value.split(/\s+/).filter(Boolean);
                                        if (words.length <= 50) {
                                            setFormData({ ...formData, description: e.target.value });
                                        }
                                        else {
                                            toast.error("you have reached limit");
                                        }
                                    }}
                                    className="w-full h-20 border border-gray-300 p-2 rounded"
                                    placeholder='Description about the project'
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Upload image (Optional)</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded">
                                    <input
                                        type="file"
                                        accept=".png, .jpg, .jpeg, .bmp, .tiff"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="fileInput"
                                    />
                                    <label htmlFor="fileInput" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                        Select File
                                    </label>
                                    <span className="ml-4">{formData.fileName || 'No file selected'}</span>
                                </div>
                            </div>


                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Skills (Max 10)</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        placeholder='eg: Web Development'
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSkillAdd}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap space-x-2 space-y-2 my-2">
                                    {formData.skills.map((skill, index) => (
                                        <div key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                                            <span>{skill}</span>
                                            <button
                                                type="button"
                                                className="text-white text-sm font-bold"
                                                onClick={() => removeSkill(index)}
                                            >
                                                ❌
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Payment</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        value={formData.payment}
                                        onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        placeholder='eg: 50'
                                    />
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                        className="border border-gray-300 p-2 rounded"
                                    >
                                        <option value="USD">USD</option>
                                        <option value="INR">INR</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Payment Type</label>
                                <div className="flex items-center space-x-4">
                                    <label>
                                        <input
                                            type="radio"
                                            checked={formData.isHourly}
                                            onChange={() => setFormData({ ...formData, isHourly: true })}
                                        />
                                        <span className="ml-2">Per Hour</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            checked={!formData.isHourly}
                                            onChange={() => setFormData({ ...formData, isHourly: false })}
                                        />
                                        <span className="ml-2">Fixed Payment</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2"> Contact Details</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    placeholder='eg: john@gmail.com'
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                                Submit
                            </button>
                        </form>
                    ) : (
                        <div>
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">Are these details correct ?</h2>
                                <div className="border bg-blue-300 p-4 rounded-lg shadow-lg md:flex space-x-4">
                                    <div className="border-b-2 md:border-b-0 md:border-r-2 border-black pl-4 pr-8 py-10">
                                        <div className='flex justify-center'>
                                            <Image src={computer} alt='computer' className='h-20 w-auto' />
                                        </div>
                                        <p className="mt-2">
                                            <strong>File:</strong> {formData.file ? formData.file.name : 'No file selected'}
                                        </p>
                                        <p className="mt-2">
                                            <strong>Payment:</strong> {formData.payment} {formData.currency} ({formData.isHourly ? 'Per Hour' : 'Fixed Payment'})
                                        </p>
                                    </div>
                                    <div className='px-10 mt-4 md:mt-0'>
                                        <h3 className="text-lg font-bold">{formData.projectName}</h3>
                                        <p className='mt-2'>{formData.description}</p>
                                        <p className=" mt-2">
                                            <strong>Skills:</strong>
                                            <div className="flex flex-wrap space-x-2 space-y-2 mt-1">
                                                {formData.skills.map((skill, index) => (
                                                    <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </p>
                                        <p className='mt-2'><strong>Contact Info: </strong>{formData.email}</p>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button onClick={handleEdit} className="bg-gray-500 text-white px-4 py-2 rounded-xl">
                                        Edit Details
                                    </button>
                                    <button onClick={handleReviewSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-xl"> {isUploading ? 'Uploading...' : 'Yes, Post My Project'}</button>
                                </div>
                                <div>
                                    <hr className='border border-gray-500' />
                                    <h1 className='mt-2'>By clicking &apos;Yes, post my project&apos;, you agree to the <span className='text-blue-500 hover:underline'>Terms & Conditions</span> and <span className='text-blue-500 hover:underline'>Privacy Policy</span></h1>
                                    <h1 className='mt-2'>Copyright © 2024 CareerNet Technology Pvt Limited</h1>
                                </div>
                            </div>
                        </div>
                    )
                    }
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
                </div >
            </div>
        </div>
    );
}
export default Postajob;
