"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../Assests/logo.png";
import login from "../../Assests/login.png";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { auth, provider } from "../../Firebaseauth";
import { User } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";



type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: boolean;
  userName?: string;
};

interface SocialLink {
  platform: string;
  url: string;
}

const SignupPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [imageSrc, setImageSrc] = useState('/profileimage.webp');
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    userName: "",
  });
  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState<string>('');
  const [dob, setDob] = useState('');
  const [socialLinks, setSocialLinks] =  useState<SocialLink[]>([
    { platform: "LinkedIn", url: "" },
    { platform: "GitHub", url: "" },
    { platform: "Twitter", url: "" },
    { platform: "Telegram", url: "" },
  ]);
  const [education, setEducation] = useState(['']);
  const [currentlyWorking, setCurrentlyWorking] = useState({
    currentlyWorkingCompany: "",
    currentlyWorkingRole: "",
    currentlyWorkingDescription: "",
  });
  const [countryCode, setCountryCode] = useState<string>(""); // Default to India
  const [contactNumber, setContactNumber] = useState('');
  const [portfolio, setPortfolio] = useState([
    {
      portfolioSrc: "",
      portfolioRole: "",
      portfolioLink: "",
      portfolioDomain:"",
    }
  ])
  const [portfolioimage, setPortfolioimage] = useState<File | null>(null);
  const [bioTitle, setBioTitle] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<string[]>([]); // Initialize as an array
  const [skillInput, setSkillInput] = useState<string>('');
  const [experiences, setExperiences] = useState([{ title: '', companyName: '', startDate: '', endDate: '', isCurrent: false }]);
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState('');
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      toast.success('Login successful!');
      localStorage.setItem('firebaseUser', JSON.stringify({ email: user.email }));
      setTimeout(() => {
        router.push('/signupnext');
      }, 2000);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(`Error signing in with Google:${error}`);
    }
  };


  const validate1 = async () => {
    // const newErrors: any = {};
    const newErrors: Record<string, string> = {};
    // if (step === 1) {
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.userName) newErrors.userName = "User name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }
    // }

    // if (step === 3) {
    // if (contactNumber && !/^\d{10}$/.test(contactNumber)) {
    //   newErrors.contactNumber = "Contact number must be 10 digits";
    // }
    // if (dob && isNaN(Date.parse(dob))) {
    //   newErrors.dob = "Date of Birth is invalid";
    // }
    // }

    if (formData.email && formData.userName && Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(
          "https://career-net-server.vercel.app/api/auth/check-availability",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              userName: formData.userName,
            }),
          }
        );
        const data = await response.json();

        if (response.status === 409) {
          if (data.errors.email) newErrors.email = data.errors.email;
          if (data.errors.userName) newErrors.userName = data.errors.userName;
        }
      } catch (error) {
        console.error("Error validating email and username:", error);
        newErrors.general = "Unable to validate email or username. Please try again.";
      }
    }

    return newErrors;
  };


  const validate3 = () => {
    const newErrors: any = {};

    if (dob && isNaN(Date.parse(dob))) {
      newErrors.dob = "Date of Birth is invalid";
    }
    return newErrors;

  }

  const validate7 = () => {
    const newErrors: any = {};

    if (contactNumber && !/^\d{10}$/.test(contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }
    return newErrors;

  }
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

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleAddLanguage = () => {
    if (languageInput.trim() !== '') {
      setLanguages([...languages, languageInput]);
      setLanguageInput('');
    }
  };

  const removeLang = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    setLanguages(newLanguages);
  };

  const handleSocialInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].url = event.target.value;
    setSocialLinks(updatedLinks);
  };

  const handleCurrentlyWorkingInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentlyWorking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleBioTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioTitle(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
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


  const category = [
    "Graphic Design",
    "Cartoon Animation",
    "Illustration",
    "Web Development",
    "Logo Design",
    "Social Graphics",
    "Article Writing",
    "Video Editing",
    "App Development",
    "AI & ML",
    "UI & UX",
    "Digital Marketing",
    "Photography",
    "Others",
  ];

  const handleBack = () => {
    if (step > 2) {
      setStep(step - 1);
    } else {
      console.log("Already at the first step");
      toast.info("Already at the first step");
    }
  };

  // const handleNextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const validationErrors = validate();

  //   const formattedErrors = Object.entries(validationErrors)
  //     .map(([field, message]) => `${message}`)
  //     .join(', ');

  //     if (step < 10) {
  //       setStep(step + 1);
  //   } else {
  //       console.log("Form submitted");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const response = await fetch("https://career-net-server.vercel.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          userName: formData.userName,
          dob: dob,
          languages: languages,
          socialLinks: socialLinks,
          education: education,
          currentlyWorking: currentlyWorking,
          countryCode: countryCode,
          contactNumber: contactNumber,
          bioTitle: bioTitle,
          bio: bio,
          bioSkills: skills,
          experiences: experiences,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userEmail', data.user.email);
        // toast.error("User registered successfully", data);
        console.log("User registered successfully", data.user.email);
        toast.success('Sign Up!');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        console.error("Error registering user:", data.message);
        // toast.error("Error registering user:",data.message);
        toast.error(`Error registering user: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred.");
    }
    // } else {
    //   console.error("Form validation failed:", formattedErrors);
    //   toast.error(`Form validation failed: ${formattedErrors}`)
    //   setErrors(validationErrors);
    // }
  };


  const handleNextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const validationErrors = validate1();
    // const validationErrors = validate(step);
    // let validationErrors = {};

    // if (step === 1) {
    //   validationErrors = validate1();
    // }
    //  else if (step === 3) {
    //   validationErrors = validate3(); // Call validation for step 2
    // }

    // if (Object.keys(validationErrors).length === 0) {
    // if (step < 10) {
    //   setStep(step + 1); 
    // } else {
    //   handleSubmit(e); 
    // }
    if (step === 1) {
      // const validationErrors = validate1();
      const validationErrors = await validate1();
      // validate1();
      if (Object.keys(validationErrors).length === 0) {
        setStep(2); // Only proceed to Step 2 if no validation errors
      } else {
        setErrors(validationErrors); // Set errors for display
        toast.error(
          `Form validation failed: ${Object.entries(validationErrors)
            .map(([field, message]) => `${message}`)
            .join(", ")}`
        );
      }
    }
    if (step === 2) {
      setStep(3);
    }
    if (step === 3) {
      // validate3();
      // setStep(4);
      const validationErrors = validate3();
      // validate1();
      if (Object.keys(validationErrors).length === 0) {
        setStep(4);
      } else {
        setErrors(validationErrors);
        toast.error(
          `Form validation failed: ${Object.entries(validationErrors)
            .map(([field, message]) => `${message}`)
            .join(", ")}`
        );
      }
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
      // setStep(8);
      const validationErrors = validate7();
      // validate1();
      if (Object.keys(validationErrors).length === 0) {
        setStep(8);
      } else {
        setErrors(validationErrors);
        toast.error(
          `Form validation failed: ${Object.entries(validationErrors)
            .map(([field, message]) => `${message}`)
            .join(", ")}`
        );
      }
    }
    if (step === 8) {
      setStep(9);
    }
    if (step === 9) {
      setStep(10);
    }
    if (step === 10) {
      console.log('Form submitted');
      handleSubmit(e);
    }
    // } else {
    //   setErrors(validationErrors);
    //   toast.error(
    //     `Form validation failed: ${Object.entries(validationErrors)
    //       .map(([field, message]) => `${message}`)
    //       .join(", ")}`
    //   );
    // }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('firebaseUser', JSON.stringify({ email: user.email }));
      } else {
        localStorage.removeItem('firebaseUser'); // Clear if user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-blue-300">
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
            {/* <form onSubmit={handleSubmit}> */}
            {step === 1 && (
              <div>
                {/* <Link href="/">
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
                  </Link> */}
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Welcome to CareerNet
                </h1>

                <div className="space-y-4">
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 text-md md:text-xl rounded-lg hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" /><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
                    Continue with Google
                  </button>
                </div>
                <div className="grid grid-cols-3 my-6">
                  <div>
                    <hr className="border border-gray-500 mt-2" />
                  </div>
                  <div>
                    <h1 className="text-gray-800 text-center">OR</h1>
                  </div>
                  <div>
                    <hr className="border border-gray-500 mt-2" />
                  </div>
                </div>
                <form className="space-y-4" onSubmit={handleNextSubmit}>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 ${errors.firstName ? "focus:ring-red-500" : "focus:ring-blue-400"
                        }`}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 ${errors.lastName ? "focus:ring-red-500" : "focus:ring-blue-400"
                        }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="userName"
                    placeholder="username"
                    value={formData.userName}
                    onChange={handleChange}
                    // className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    className={`w-full px-4 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 ${errors.lastName ? "focus:ring-red-500" : "focus:ring-blue-400"
                      }`}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500" : "focus:ring-blue-400"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 ${errors.password
                          ? "focus:ring-red-500"
                          : "focus:ring-blue-400"
                        }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword
                          ? "focus:ring-red-500"
                          : "focus:ring-blue-400"
                        }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4 items-center">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="h-5 w-5"
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the <span className="text-blue-600 hover:underline hover:cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:underline hover:cursor-pointer">Privacy Policy</span>
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Join CareerNet
                  </button>
                  <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login">
                      <span className="text-blue-600 hover:underline">Login</span>
                    </Link>
                  </p>
                </form>
              </div>
            )}
            {step === 2 && (
              <div>
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4 rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
                <form
                  onSubmit={handleNextSubmit}
                  // onSubmit={handleSubmit} 
                  className="space-y-4">
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
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Cover Image </label>
                    <div className="flex items-center border border-gray-300 p-2 rounded">
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .bmp, .tiff , .webp"
                        onChange={handleCoverFileChange}
                        className="hidden"
                        id="fileInput"
                      />
                      <label htmlFor="fileInput" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                        Select File
                      </label>
                      {/* <span className="ml-4">{fileName || 'No file selected'}</span> */}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                </form>
              </div>
            )}
            {step === 3 && (
              <form
                onSubmit={handleNextSubmit}
                // onSubmit={handleSubmit} 
                className="space-y-4">
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4 rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
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

            {step === 4 && (
              <form
                onSubmit={handleNextSubmit}
                //  onSubmit={handleSubmit} 
                className="space-y-4">
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4 rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
                {/* <h1 className="block text-gray-700 text-lg ">Enter Social Links</h1>
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
                </button> */}
                <h1 className="block text-gray-700 text-lg">Enter Social Links</h1>
                {socialLinks.map((link, index) => (
                  <div key={index} className="mb-4">
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      placeholder={`${link.platform} Url`}
                      type="url"
                      value={link.url}
                      onChange={(e) => handleSocialInputChange(index, e)}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-md md:text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Next
                </button>

              </form>
            )}

            {step === 5 && (
              <form
                onSubmit={handleNextSubmit}
                //  onSubmit={handleSubmit} 
                className="space-y-4">
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4 rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
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

            {step === 6 && (
              <form
                onSubmit={handleNextSubmit}
                //  onSubmit={handleSubmit} 
                className="space-y-4">
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4 rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
                <h1 className="block text-gray-700 text-lg ">Currently Working Job</h1>
                <input
                  type="text"
                  name="currentlyWorkingRole"
                  value={currentlyWorking.currentlyWorkingRole}
                  onChange={handleCurrentlyWorkingInputChange}
                  placeholder="eg: Web Developer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                />
                <input
                  type="text"
                  name="currentlyWorkingCompany"
                  value={currentlyWorking.currentlyWorkingCompany}
                  onChange={handleCurrentlyWorkingInputChange}
                  placeholder="company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                />
                <textarea
                  name="currentlyWorkingDescription"
                  value={currentlyWorking.currentlyWorkingDescription}
                  onChange={handleCurrentlyWorkingInputChange}
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

            {step === 7 && (
              <form
                onSubmit={handleNextSubmit}
                // onSubmit={handleSubmit} 
                className="space-y-4">
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4 rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
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

            {step === 8 && (
              <form
                onSubmit={handleNextSubmit}
                // onSubmit={handleSubmit} 
                className="space-y-4">
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4  rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
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
                <div className="">
                  <label htmlFor="titleDropdown" className="block text-lg font-medium mb-2">
                    Select Your Domain
                  </label>
                  <select
                    id="titleDropdown"
                    // value={formData.category}
                    // onChange={handleTitleChange}
                    // onChange={(e) =>
                    //     setFormData({ ...formData, category: e.target.value })
                    // }
                    className="border border-gray-300 p-2 rounded-md w-full"
                  >
                    <option value="" disabled>
                      -- Select an option --
                    </option>
                    {category.map((title, index) => (
                      <option key={index} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
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
              <form
                onSubmit={handleNextSubmit}
                // onSubmit={handleSubmit} 
                className="space-y-4">
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4 rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
                <input
                  type="text"
                  name="Title"
                  value={bioTitle} 
                  onChange={handleBioTitleChange}
                  placeholder="eg: Web Developer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                />
                <textarea
                  name="Bio"
                  value={bio} 
                  onChange={handleBioChange}
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

            {step === 10 && (
              <form
                onSubmit={handleNextSubmit}
                //  onSubmit={handleSubmit} 
                className="space-y-4">
                <div onClick={(e) => { e.preventDefault(); handleBack(); }}>
                  <div className="flex justify-start">
                    <button className="bg-gray-200 mt-4 rounded-xl px-4 py-3">
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
                </div>
                <h1 className="text-center text-2xl font-bold mt-4 mb-6">
                  Create Your Profile
                </h1>
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
                  <button type="button"
                    onClick={handleAddExperience}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><defs><mask id="ipSAdd0"><g fill="none" stroke-linejoin="round" stroke-width="4"><rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3" /><path stroke="#000" stroke-linecap="round" d="M24 16v16m-8-8h16" /></g></mask></defs><path fill="#3b82f5" d="M0 0h48v48H0z" mask="url(#ipSAdd0)" /></svg></button>
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
            {/* </form> */}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <Image
            src={login}
            height={500}
            width={500}
            alt="illustration"
            className="object-contain"
          />
        </div>
      </div>
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
    </div>
  );
};

export default SignupPage;
