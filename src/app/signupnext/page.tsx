"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../Assests/logo.png";
import login from "../../Assests/login.png";
import { useState } from 'react';


const SignUpNextpage: React.FC = () => {
    const [imageSrc, setImageSrc] = useState('/profileimage.webp');
    const [step, setStep] = useState(1);
    const [languages, setLanguages] = useState<string[]>([]);
    const [languageInput, setLanguageInput] = useState<string>('');
    const [dob, setDob] = useState('');
    const [education, setEducation] = useState(['']);
    const [countryCode, setCountryCode] = useState<string>(""); // Default to India
    const [contactNumber, setContactNumber] = useState('');
    const [portfolioimage, setPortfolioimage] = useState<File | null>(null);
    const [skills, setSkills] = useState<string[]>([]); // Initialize as an array
    const [skillInput, setSkillInput] = useState<string>('');
    const [experiences, setExperiences] = useState([{ title: '', companyName: '', startDate: '', endDate: '', isCurrent: false }]);
    const [error, setError] = useState('');


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const result = event.target?.result;
                if (typeof result === 'string') {
                    setImageSrc(result); // Set the image preview
                }

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

    const removeLang = (index: number) => {
        const newLanguages = [...languages]; // Create a copy of the languages array
        newLanguages.splice(index, 1); // Remove the language at the specified index
        setLanguages(newLanguages); // Update the state with the new list
    };

    const handleEducationChange = (index: number, value: string) => {
        const updatedEducation = [...education];
        updatedEducation[index] = value;
        setEducation(updatedEducation);
    };

    const addEducationInput = () => {
        if (education[education.length - 1] !== '') {
            setEducation([...education, '']); // Add new empty input only when last input is not empty
        }
    };

    const removeEducationInput = (index: number) => {
        const updatedEducation = [...education];
        updatedEducation.splice(index, 1); // Remove the input at the specific index
        setEducation(updatedEducation);
    };



    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountryCode(e.target.value); 
    };


    const handleContactNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContactNumber(e.target.value);
    };

    const handleSkillAdd = () => {
        // Add skill if it's not empty, not already included, and under the limit of 10
        if (skillInput && !skills.includes(skillInput) && skills.length < 10) {
            setSkills([...skills, skillInput]);
            setSkillInput('');
        } else {
            console.log('Skill already added or limit reached!');
        }
    };

    const removeSkill = (index: number) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    };


    const handleAddExperience = () => {
        // Validate the last experience fields
        const lastExperience = experiences[experiences.length - 1];

        if (!lastExperience.title || !lastExperience.companyName || !lastExperience.startDate) {
            // Show error message if any required field is empty
            setError('Please fill out all required fields before adding another experience.');
            return;
        }

        // If all required fields are filled, clear error and add a new form
        setError('');
        setExperiences([...experiences, { title: '', companyName: '', startDate: '', endDate: '', isCurrent: false }]);
    };


    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const updatedExperiences = experiences.map((experience, i) => {
            if (i === index) {
                return {
                    ...experience,
                    [name]: type === 'checkbox' ? checked : value,
                };
            }
            return experience;
        });
        setExperiences(updatedExperiences);
    };




    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        if (step === 4) {
            setStep(5);
        }
        if (step === 5) {
            setStep(6);
        }
        if (step === 6) {
            setStep(7);
        }
        if (step === 7) {
            setStep(8);
        }
        if (step === 8) {
            setStep(9);
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
                                        {education.map((value, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                                    placeholder={`Education ${index + 1}`}
                                                    type="text"
                                                    value={value}
                                                    onChange={(e) => handleEducationChange(index, e.target.value)}
                                                />

                                                {education.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeEducationInput(index)}
                                                        className="text-red-600 hover:text-red-800 focus:outline-none"
                                                    >
                                                        ❌
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                onClick={addEducationInput}
                                                className={`${education[education.length - 1] === ''
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700'
                                                    } text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2`}
                                                disabled={education[education.length - 1] === ''} // Disable button if last input is empty
                                            >
                                                Add Another Education
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    </form>
                                )}

                                {step === 5 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <h1 className="block text-gray-700 text-lg ">Currently Working Job</h1>
                                        <input
                                            type="text"
                                            name="Role"
                                            placeholder="eg: Web Developer"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                        />
                                        <input
                                            type="text"
                                            name="companyname"
                                            placeholder="company name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                        />
                                        <textarea
                                            name="description"
                                            placeholder="Description about the role"
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

                                {step === 6 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <h1 className="block text-gray-700 text-lg ">Contact Info</h1>
                                        <div className="md:flex md:space-x-2">
                                            {/* Country Code Selector */}
                                            <select
                                                value={countryCode}
                                                onChange={handleCountryChange}
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            >

                                                <option value="+91">India (+91)</option>
                                                <option value="+1">USA (+1)</option>
                                                <option value="+44">UK (+44)</option>
                                            </select>

                                            {/* Contact Number Input */}
                                            <input
                                                type="number"
                                                name="contactNumber"
                                                value={contactNumber}
                                                onChange={handleContactNumberChange}
                                                placeholder="Contact Number"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 mt-2 md:mt-0"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    </form>
                                )}

                                {step === 7 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <h1 className="block text-gray-700 text-lg ">Portfolio</h1>
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Upload image </label>
                                            <div className="flex items-center border border-gray-300 p-2 rounded">
                                                <input type="file" accept='.png, .jpg, .jpeg, .bmp, .tiff' className="hidden" id="fileInput" />
                                                <label htmlFor="fileInput" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                                    Select File
                                                </label>
                                                <span className="ml-4">{portfolioimage ? portfolioimage.name : 'No file selected'}</span>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="Role"
                                            placeholder="eg: Web Developer"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                        />
                                        <input
                                            type="url"
                                            name="link"
                                            placeholder="Portfolio Link"
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

                                {step === 8 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            type="text"
                                            name="Title"
                                            placeholder="eg: Web Developer"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                        />
                                        <textarea
                                            name="Bio"
                                            placeholder="Bio"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                className="w-full border border-gray-300 p-2 rounded"
                                                placeholder='eg: React'
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
                                            {skills.map((skill, index) => (
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
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    </form>
                                )}

                                {step === 9 && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <h1>Add Experience</h1>
                                        {experiences.map((experience, index) => (
                                            <div key={index} className="space-y-4">
                                                <div className="md:flex gap-4">
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        placeholder="eg: Web Developer"
                                                        value={experience.title}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="companyName"
                                                        placeholder="Company name"
                                                        value={experience.companyName}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 mt-2 md:mt-0"
                                                    />
                                                </div>
                                                <div className='md:flex gap-10'>
                                                    <div className='md:flex gap-2'>
                                                        <h1 className='text-xl font-semibold mt-5'>Started Date:</h1>
                                                        <input
                                                            type="date"
                                                            name="startDate"
                                                            value={experience.startDate}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className='underline hover:underline border-b-2 mt-5 border-blue-500 font-semibold focus:outline-none focus:border-transparent'
                                                        />
                                                    </div>
                                                    <div className='md:flex gap-2'>
                                                        <h1 className='text-xl font-semibold mt-5'>End Date:</h1>
                                                        <input
                                                            type="date"
                                                            name="endDate"
                                                            value={experience.endDate}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className='underline hover:underline border-b-2 mt-5 border-blue-500 font-semibold focus:outline-none focus:border-transparent'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 items-center mt-4">
                                                    <input
                                                        type="checkbox"
                                                        name="isCurrent"
                                                        checked={experience.isCurrent}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="h-5 w-5"
                                                    />
                                                    <label className="text-sm text-gray-600">I&apos;m Currently Working</label>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-1">
                                            <button type="button" onClick={handleAddExperience}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><defs><mask id="ipSAdd0"><g fill="none" stroke-linejoin="round" stroke-width="4"><rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3" /><path stroke="#000" stroke-linecap="round" d="M24 16v16m-8-8h16" /></g></mask></defs><path fill="#3b82f5" d="M0 0h48v48H0z" mask="url(#ipSAdd0)" /></svg></button>
                                            <h1>Add Another Experience</h1>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Submit
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

export default SignUpNextpage;
