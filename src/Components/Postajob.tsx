"use client";
import Image from 'next/image';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import computer from '@/Assests/computer.png';
import Modal from './Model';

const Postajob: React.FC = () => {
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        file: null,
        skills: [],
        payment: '',
        currency: 'USD',
        isHourly: true,
        email: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleSkillAdd = () => {
        if (skillInput && formData.skills.length < 10) {
            setFormData({ ...formData, skills: [...formData.skills, skillInput] });
            setSkillInput('');
        }
        else {
            toast.error('you have reached the limit')
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.projectName || !formData.description || !formData.payment || !formData.skills.length || !formData.file || !formData.email) {
            toast.error('Please fill all the required fields.');
            return;
        }
        toast.warning('Review the Form')
        console.log('Form submitted');
        setSubmitted(true);
        setIsModalOpen(true);
        
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

    const handleReviewSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success('You have posted the project successfully!');
                localStorage.setItem('postedProject', JSON.stringify(formData)); 
                setIsModalOpen(false);
            } else {
                toast.error(result.message || 'Failed to post project.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error posting project.');
        }
    };
    


    return (
        <div className="mx-auto p-6 bg-white/30 rounded-lg shadow-md space-y-4">
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
                                    toast.error("you have reached limit")
                                }
                            }}
                            className="w-full h-20 border border-gray-300 p-2 rounded"
                            placeholder='Description about the project'
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Upload image </label>
                        <div className="flex items-center border border-gray-300 p-2 rounded">
                            <input type="file" accept='.png, .jpg, .jpeg, .bmp, .tiff' onChange={handleFileChange} className="hidden" id="fileInput" />
                            <label htmlFor="fileInput" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                Select File
                            </label>
                            <span className="ml-4">{formData.file ? formData.file.name : 'No file selected'}</span>
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
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Are these details correct ?</h2>
                        <div className="border bg-blue-300 p-4 rounded-lg shadow-lg flex space-x-4">
                            <div className=" border-r-2 border-black pl-4 pr-8 py-10">
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
                            <div className='px-10'>
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
                            <button onClick={handleReviewSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-xl">Yes, Post My Project</button>
                        </div>
                        <div>
                            <hr className='border border-gray-500' />
                            <h1 className='mt-2'>By clicking &apos;Yes, post my project&apos;, you agree to the <span className='text-blue-500 hover:underline'>Terms & Conditions</span> and <span className='text-blue-500 hover:underline'>Privacy Policy</span></h1>
                            <h1 className='mt-2'>Copyright © 2024 CareerNet Technology Pvt Limited</h1>
                        </div>
                    </div>
                </Modal>
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
    );
}
export default Postajob
