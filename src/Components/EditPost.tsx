"use client";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Initialize Firebase (make sure to use your own config)
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

interface EditPostProps {
  job: Job;
  onClose: () => void;
  onUpdate: (updatedJob: Job) => void;
}

interface Job {
  _id: string;
  projectName: string;
  description: string;
  skills: string[];
  payment: number;
  currency: string;
  isHourly: boolean;
  email: string;
  fileUrl?: string;
  category: string;
}

const EditPost: React.FC<EditPostProps> = ({ job, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Job>(job);
  const [skillInput, setSkillInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (skillInput && !formData.skills.includes(skillInput) && formData.skills.length < 10) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput] }));
      setSkillInput('');
    } else {
      toast.error('Skill already added or limit reached!');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/tiff', 'image/webp'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Invalid file type. Please upload an image.');
        return;
      }
      if (selectedFile.size > 10485760) { // 10MB limit
        toast.error('File size exceeds 10MB.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let updatedFileUrl = formData.fileUrl;
      if (file) {
        const storageRef = ref(storage, `PostProjects/${file.name}`);
        await uploadBytes(storageRef, file);
        updatedFileUrl = await getDownloadURL(storageRef);
      }

      const updatedJob = { ...formData, fileUrl: updatedFileUrl };
      const response = await fetch(`https://career-net-server.vercel.app/api/projects/${job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });

      if (response.ok) {
        toast.success('Job updated successfully!');
        onUpdate(updatedJob);
        onClose();
      } else {
        toast.error('Failed to update job.');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('An error occurred while updating the job.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl font-bold mb-4">Edit Job Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills</label>
            <div className="flex mt-1">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm"
              />
              <button type="button" onClick={handleSkillAdd} className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md">
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {skill}
                  <button type="button" onClick={() => removeSkill(index)} className="ml-1 text-red-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment</label>
            <input
              type="number"
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Type</label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isHourly"
                  checked={formData.isHourly}
                  onChange={() => setFormData(prev => ({ ...prev, isHourly: true }))}
                  className="form-radio"
                />
                <span className="ml-2">Hourly</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="isHourly"
                  checked={!formData.isHourly}
                  onChange={() => setFormData(prev => ({ ...prev, isHourly: false }))}
                  className="form-radio"
                />
                <span className="ml-2">Fixed</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Update Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditPost;