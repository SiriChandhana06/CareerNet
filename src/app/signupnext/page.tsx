"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../Assests/logo.png";
import login from "../../Assests/login.png";
import { useState } from 'react';

const signUpNextpage: React.FC = () => {
    const [imageSrc, setImageSrc] = useState('/profileimage.webp');
    const [step, setStep] = useState(1);
    const [languages, setLanguages] = useState([]);
    const [languageInput, setLanguageInput] = useState('');
    const [dob, setDob] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setImageSrc(event.target.result); // Set the image preview
            };

            reader.readAsDataURL(file); // Convert the image to base64 string for preview
        }
    };

    const handleAddLanguage = () => {
        if (languageInput.trim() !== '') {
            setLanguages([...languages, languageInput]);
            setLanguageInput(''); // Clear the input after adding the language
        }
    };

    const removeLang = (index) => {
        const newLanguages = [...languages]; // Create a copy of the languages array
        newLanguages.splice(index, 1); // Remove the language at the specified index
        setLanguages(newLanguages); // Update the state with the new list
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            // Move to the next step when Next is clicked
            setStep(2);
        }
        if (step === 2) {
            setStep(3);
        }
        if (step === 3) {
            setStep(4);
        }
        else {
            // Handle final form submission
            console.log('Form submitted');
        }
    };

    return (
        <div>
            <div>
                <div className="bg-blue-300">
                    <Link href="/">
                        <div className="flex justify-start">
                            <button className="bg-gray-200 mt-4 ml-10 rounded-xl px-4 py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                >
                                    <path fill="black" d="M20 9v6h-8v4.84L4.16 12L12 4.16V9z" />
                                </svg>
                            </button>
                        </div>
                    </Link>

                    <div className="lg:grid lg:grid-cols-2 bg-blue-300 h-screen lg:h-full py-10 md:py-20 px-10">
                        <div className="flex justify-center items-center ">
                            <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
                                <div className="flex justify-center">
                                    <div className="text-lg font-bold flex items-center gap-2">
                                        <Link href="/">
                                            <Image src={logo} height={80} width={80} alt="logo" />
                                        </Link>
                                        <h1 className="ml-2 text-2xl md:text-4xl drop-shadow-xl">
                                            Career<span className="text-blue-500">Net</span>
                                        </h1>
                                    </div>
                                </div>

                                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                                    Create Your Profile
                                </h1>
                                {step === 1 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="flex flex-col items-center justify-center">
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shadow-md">
                                                    <img
                                                        src={imageSrc}
                                                        alt="Upload"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </label>

                                            <input
                                                id="file-upload"
                                                type="file"
                                                accept="image/*" // Accept only images
                                                className="hidden" // Hide the file input itself
                                                onChange={handleFileChange}
                                            />

                                            <p className="mt-2 text-gray-600">Click to upload image</p>
                                        </div>

                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="username"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    </form>
                                )}

                                {step === 2 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 text-md mb-2">Date of Birth</label>
                                            <input
                                                type="date"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-md mb-2">Languages Known</label>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={languageInput}
                                                    onChange={(e) => setLanguageInput(e.target.value)}
                                                    placeholder="Enter a language"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddLanguage}
                                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                        {/* Display Added Languages */}
                                        {languages.length > 0 && (
                                            <div className="mt-4">
                                                <h3 className="text-gray-700 text-lg font-semibold mb-2">Languages Known:</h3>

                                                <div className="flex flex-wrap space-x-2 space-y-2 my-2">
                                                    {languages.map((lang, index) => (
                                                        <div key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">

                                                            <span>{lang}</span>
                                                            <button
                                                                type="button"
                                                                className="text-white text-sm font-bold"
                                                                onClick={() => removeLang(index)}
                                                            >
                                                                ❌
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    </form>
                                )}

                                {step === 3 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <h1 className="block text-gray-700 text-lg ">Enter Social Links</h1>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            placeholder="LinkedIn Url"
                                            type="url" />
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            placeholder="Github Url"
                                            type="url" />
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            placeholder="Twitter Url"
                                            type="url" />
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            placeholder="Telegram Url"
                                            type="url" />
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    </form>
                                )}

                                {step === 4 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <h1 className="block text-gray-700 text-lg ">Education</h1>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            placeholder="Education"
                                            type="text" />
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center justify-center">
                            <Image
                                src={login}
                                height={350}
                                width={450}
                                alt="illustration"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signUpNextpage;
