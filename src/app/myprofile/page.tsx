"use client";
import Navbar from '@/Components/Navbar';
import React, { useEffect } from 'react';
import Image from 'next/image';
import profilePic from "@/Assests/profileimage.webp";
import coverImage from "@/Assests/coverphotoimage.webp";
// import image from '@/Assests/logo.png';
import { useState } from 'react';
import MyPosts from '@/Components/Mypost';
import Footer from '@/Components/Footer';
import { IoWarningOutline } from "react-icons/io5";
import { PiLinkedinLogoDuotone } from "react-icons/pi";
import { LuGithub } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
// import { MdMailOutline } from "react-icons/md";
import { LiaTelegram } from "react-icons/lia";
// import coi from '@/Assests/coverphoto.webp';
// import poi from '@/Assests/girl.png';
// import { StaticImageData } from "next/image";
import portfolioalt from "@/Assests/portfolioalt.webp";
import { RiGraduationCapFill } from "react-icons/ri";
import { HiMiniLanguage } from "react-icons/hi2";
import { FaBirthdayCake } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { SiNamecheap } from "react-icons/si";
import { TbListDetails } from "react-icons/tb";
// import { FaBuilding } from "react-icons/fa";
import EditDetails from '@/Components/EditDetails';

// interface UserDetails {
//   firstname: string;
//   lastname: string;
//   dob: string;
//   languages: string;
//   education: string,
//   email: string;
//   contactNumber: string,
//   _id: string;
//   coverSrc : string,
//   profileSrc:string,
//   bioTitle: string,
//   bio: string,
//   socialLinks: string[],
//   portfolioSrc: string,
//   portfolioRole: string,
//   portfolioLink: string,
// }

interface Experience {
  _id: string;
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  isCurrently: boolean;
}

interface XDetails {
  experiences: Experience[];
}

interface UserDetails {
  firstName: string;
  lastName: string;
  dob: string;
  languages: string;
  education: string[];
  email: string;
  contactNumber: string;
}

interface ProfileDetails {
  firstName: string;
  coverSrc: string;
  profileSrc: string;
  userName: string;
  bioTitle: string;
  bio: string;
  portfolioSrc: string;
  portfolioRole: string;
  portfolioLink: string;
  socialLinks: string[],
}


const MyProfile: React.FC = () => {

  const [activeTab, setActiveTab] = useState('Profile');
  // const [details, setDetails] = useState({});
  const [details, setDetails] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    dob: '',
    languages: '',
    education: [],
    email: '',
    contactNumber: '',
  });
  const [xDetails, setXDetails] = useState<XDetails>({ experiences: [] });
  // const [xDetails, setXDetails] = useState({});
  const [isDetailsProvided, setIsDetailsProvided] = useState(false);
  const [isXDetailsProvided, setIsXDetailsProvided] = useState(false);
  // const [PortDetails, setPortDetails] = useState({});
  const [PortDetails, setPortDetails] = useState<ProfileDetails>({
    firstName: '',
    coverSrc: '',
    profileSrc: '',
    userName: '',
    bioTitle: '',
    bio: '',
    portfolioSrc: '',
    portfolioRole: '',
    portfolioLink: '',
    socialLinks: [],
  });
  const [isPortDetailsProvided, setIsPortDetailsProvided] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  // const userDetails = [{
  //   firstname: 'siri', lastname: 'k', dob: '06-11-2003', languages: 'asdfghj, vghj ,vgh', school: 'sdfghj, dcfvgbn', college: 'sdfghj', higherEducation: 'fgh', jobTitle: 'asdfgh', company: 'sdfg', roleDescription: 'fghj', email: 'ghj', contact: '4567676',
  // }]
  // const userDetails:UserDetails[] = [];
  // const userDetails:UserDetails[] = [{
  //   firstname: 'siri', lastname: 'k', dob: '06-11-2003', languages: '',school: 'sdfghj, dcfvgbn', college: 'sdfghj', higherEducation: 'fgh', jobTitle: 'asdfgh', company: 'sdfg', roleDescription: 'fghj', email: 'ghj', contact: '4567676',
  // }]

  // const details = userDetails[0];
  // const isDetailsProvided = Object.values(details).some((value) => value);
  // const isDetailsProvided = details 
  // ? Object.values(details).some((value) => value)
  // : false;

  // const x:XDetails[] =[{
  //   roleTitle:'aswd', companyName:'fdg', description:'dfg', from:'32-23-2032', to:'23-23-5040',
  // }]

  // const x:XDetails[]  = [];

  // const xdetails= x[0];
  // const isxDetailsProvided = Object.values(xdetails).some((value) => value);
  // const isxDetailsProvided = xdetails 
  // ? Object.values(xdetails).some((value) => value)
  // : false;

  // const port =[{
  //     img: image ,Title:'aswd', role:'fdg', link:'23-23-5040',
  //   }]

  // const port:PortfolioDetails[] = [];

  // const portdetails = port[0];
  // const isportdetailsProvided = Object.values(portdetails).some((value) => value);
  // const isportdetailsProvided = portdetails 
  // ? Object.values(portdetails).some((value) => value)
  // : false;


  // const bio:BioDetails[] = [{
  //   biotitle: 'aswd', bio: 'fdg', sl1: 'sdfcv', sl2: 'sdfg', sl3: 'sdfg', sl4: 'dfcvg', sl5: 'sdfgv',
  // }]

  // const bio:BioDetails[] = [];

  // const biodetails = bio[0];
  // const isbiotextProvided = Object.values(biodetails).some((value) => value);
  // const isbiotextProvided = biodetails 
  // ? Object.values(biodetails).some((value) => value)
  // : false;


  // const ima = [{ ci: coi , pi: poi }]

  // const ima:ImageDetails[] = [{ ci: coi, pi: poi }];

  // const ima:ImageDetails[] = [];

  // const imadetails = ima[0];
  // const isimadetailsprovided = Object.values(imadetails).some((value) => value);
  // const isimadetailsprovided = portdetails 
  // ? Object.values(portdetails).some((value) => value)
  // : false;


  // useEffect(()=>{
  //   if (activeTab === 'Profile') {
  //     fetch('http://localhost:5000/api/auth/users') // Replace with your API endpoint
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setDetails(data);
  //         console.log(data);
  //         setIsDetailsProvided(!!Object.keys(data).length); // Check if data exists
  //       })
  //       .catch((error) => console.error('Error fetching profile details:', error));
  //   }

  //   // Fetch Experience Details
  //   if (activeTab === 'Experience') {
  //     fetch('http://localhost:5000/api/auth/users') // Replace with your API endpoint
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setXDetails(data);
  //         console.log(data);
  //         setIsXDetailsProvided(!!Object.keys(data).length); // Check if data exists
  //       })
  //       .catch((error) => console.error('Error fetching experience details:', error));
  //   }

  //   else {
  //     fetch('http://localhost:5000/api/auth/users') // Replace with your API endpoint
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setPortDetails(data);
  //         console.log(data);
  //         setIsPortDetailsProvided(!!Object.keys(data).length); // Check if data exists
  //       })
  //       .catch((error) => console.error('Error fetching experience details:', error));
  //   }
  // }, [activeTab]);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch('http://localhost:5000/api/auth/users'); // Replace with your API endpoint
  //       const data = await response.json();

  //       console.log('Fetched data:', data);

  //       const storedEmail = localStorage.getItem('userEmail');
  //       let matchedData = null;

  //       if (Array.isArray(data)) {
  //         // Case 3: data is an array of users
  //         matchedData = data.find((item) => item.email === storedEmail);
  //       } else if (data.users && Array.isArray(data.users)) {
  //         // Case 1: data.users is an array of users
  //         matchedData = data.users.find((item: any) => item.email === storedEmail);
  //       } else if (data.email) {
  //         // Case 2: data is a single user object
  //         matchedData = data.email === storedEmail ? data : null;
  //       }

  //       if (matchedData) {
  //         console.log("Matched Data", matchedData);

  //         // Set portDetails irrespective of activeTab
  //         setPortDetails(matchedData);
  //         setIsPortDetailsProvided(!!Object.keys(matchedData).length);

  //         // Handle activeTab logic
  //         if (activeTab === 'Profile') {
  //           setDetails(matchedData);
  //           setIsDetailsProvided(!!Object.keys(matchedData).length);
  //         } else if (activeTab === 'Experience') {
  //           setXDetails(matchedData);
  //           setIsXDetailsProvided(!!Object.keys(matchedData).length);
  //         }

  //       } else {
  //         console.warn('No data found for the stored email:', storedEmail);
  //       }
  //       // setLoading(false);
  //     }
  //     catch (error) {
  //       console.error('Error fetching details:', error);
  //       // setLoading(false);
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [activeTab]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Check Firebase Auth user or fallback to local storage
        const user = JSON.parse(localStorage.getItem('firebaseUser') || 'null');
        console.log('Firebase User:', user);
        const email = user?.email || localStorage.getItem('userEmail'); // Get email from Firebase Auth or local storage
        console.log('Email being used:', email);

        if (!email) {
          console.warn('No email available for fetching data.');
          setLoading(false);
          return;
        }

        const response = await fetch('https://career-net-server.vercel.app/api/auth/users');
        const data = await response.json();

        console.log('Fetched data:', data);

        // Match data based on the email
        let matchedData = null;
        if (Array.isArray(data)) {
          matchedData = data.find((item) => item.email === email);
        } else if (data.users && Array.isArray(data.users)) {
          matchedData = data.users.find((item: any) => item.email === email);
        } else if (data.email) {
          matchedData = data.email === email ? data : null;
        }

        if (matchedData) {
          console.log('Matched Data:', matchedData);

          const hasPortfolioData = !!(
            matchedData.portfolioSrc || 
            matchedData.portfolioRole || 
            matchedData.portfolioLink
          );

          // Set details based on activeTab
          setPortDetails(matchedData);
          // setIsPortDetailsProvided(!!Object.keys(matchedData).length);
          setIsPortDetailsProvided(hasPortfolioData); 

          if (activeTab === 'Profile') {
            setDetails(matchedData);
            setIsDetailsProvided(!!Object.keys(matchedData).length);
          } else if (activeTab === 'Experience') {
            setXDetails(matchedData);
            // setIsXDetailsProvided(!!Object.keys(matchedData).length);
            setIsXDetailsProvided(!!matchedData.experiences && matchedData.experiences.length > 0);
          }
        } else {
          console.warn('No data found for the email:', email);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);



  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div>
          <div className="flex justify-between mx-4 md:mx-10">
            <h1 className="text-2xl font-semibold lg:text-4xl flex gap-2"><TbListDetails /><span>Details</span></h1>
            <button 
              className="flex underline text-xl hover:text-blue-500 hover:cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : (isDetailsProvided ? "Edit Details" : "Fill Details")}
              {isEditing? <svg className='mt-1' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#cd0303" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>: <svg
                className="underline hover:text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  d="M5 18.08V19h.92l9.06-9.06l-.92-.92z"
                  opacity="0.3"
                />
                <path
                  fill="black"
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06l.92.92zM20.71 5.63l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41"
                />
              </svg> }
              
            </button>
          </div>
          <div>
            {isEditing ? (
              <EditDetails details={details} setDetails={setDetails} setIsEditing={setIsEditing} />
            ) : (
              isDetailsProvided ? (
                <div>
                  <div className="md:mx-32">
                    <h1 className="text-2xl font-semibold mt-5 flex gap-2"><SiNamecheap className='text-blue-500 text-3xl'/><span>Name :</span></h1>
                    <div className="flex gap-2 mt-2 ml-6 md:ml-12 ">
                      <h1 className="text-xl font-semibold">{details.firstName || "No Data Provide"}</h1>
                      <h1 className="text-xl font-semibold">{details.lastName}</h1>
                    </div>
                  </div>
                  <div className="md:mx-32">
                    <h1 className="text-2xl font-semibold mt-5  flex gap-2"><FaBirthdayCake className='text-blue-500 text-3xl' /> <span>Date Of Birth :</span></h1>
                    <div className="flex gap-2 mt-2 ml-6 md:ml-12 ">
                      <h1 className="text-xl font-semibold"> {details.dob ? new Date(details.dob).toLocaleDateString() : "No Data Provided"}</h1>
                    </div>
                  </div>
                  <div className="md:mx-32">
                    <h1 className="text-2xl font-semibold mt-5 flex gap-2"> <HiMiniLanguage className='text-blue-500 text-3xl' /> <span>Languages Known :</span></h1>
                    <div className="mt-2 ml-6 md:ml-12">
                      <h1 className="text-xl font-semibold">
                        {typeof details.languages === 'string' && details.languages.trim()
                          ? details.languages
                          : 'No details provided'}
                      </h1>
                    </div>
                  </div>
                  <div className="md:mx-32">
                    <h1 className="text-2xl font-semibold mt-5 flex gap-2"><RiGraduationCapFill className='text-blue-500 text-3xl'/><span>Education :</span></h1>
                    <div className="mt-2 ml-6 md:ml-12">
                      <h1 className="text-xl font-semibold">
                        {details.education && Array.isArray(details.education) && details.education.length > 0 ? (
                          details.education.map((item, index) => (
                            <div key={index}>{item}</div> 
                          ))
                        ) : (
                          <span>No education data available</span>
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className="md:mx-32">
                    <h1 className="text-2xl font-semibold mt-5 flex gap-2"> <BiSolidContact className='text-blue-500 text-3xl' /> <span>Contact Info:</span></h1>
                    <div className="mt-2 ml-6 md:ml-12">
                      {details.email && (
                        <h1 className="text-xl font-semibold">Email Id: {details.email}</h1>
                      )}
                      {details.contactNumber && (
                        <h1 className="text-xl mt-2 font-semibold">
                          Contact Number: {details.contactNumber}
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <h1 className="text-center mt-5 flex justify-center gap-1">
                  <IoWarningOutline className='text-4xl text-blue-500 ' /> <span className='mt-2 font-semibold'>No details provided</span>
                </h1>
              )
            )}
          </div>
        </div>
        );
      case 'Experience':
        return (
          <div>
            <div className='flex justify-between mx-4 md:mx-10'>
            <h1 className="text-2xl font-semibold lg:text-4xl flex gap-2"><TbListDetails /><span>Details</span></h1>
              <h1 className='flex underline text-xl hover:text-blue-500 hover:cursor-pointer'> {isXDetailsProvided ? "Edit Details" : "Fill Details"} <svg className='underline hover:text-blue-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" d="M5 18.08V19h.92l9.06-9.06l-.92-.92z" opacity="0.3" /><path fill="black" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06l.92.92zM20.71 5.63l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41" /></svg></h1>
            </div>
            {isXDetailsProvided && xDetails.experiences?.length > 0 ? (
              <div className="flex justify-center items-center">
                {/* <div className="bg-white/30 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-10"> */}
                {/* Map through the experience data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
                  {xDetails.experiences.map((exp, index: Number) => (
                    <div
                      key={exp._id}
                      className="bg-white/30 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-5"
                    >
                      <h2 className="text-xl font-semibold">🧑‍💻 Role: <span className='font-medium'>{exp.title}</span> </h2>
                      <h3 className="text-lg font-semibold"> 🏢 CompanyName: <span className='font-medium'>{exp.companyName}</span> </h3>
                      <div className="flex justify-between gap-10 text-sm text-gray-700 mt-2">
                        <p>From: {new Date(exp.startDate).toLocaleDateString()}</p>
                        <p>To: {exp.isCurrently ? "Present" : new Date(exp.endDate).toLocaleDateString()}</p>
                      </div>

                      {/* Checkbox for current job */}
                      {/* {exp.isCurrently && (
                        <div className="flex items-center space-x-2 mt-3">
                          <input
                            type="checkbox"
                            id={`checkbox-${exp._id}`}
                            checked={exp.isCurrently}
                            readOnly
                            className="h-5 w-5 text-blue-600 border-gray-300 bg-blue-200 rounded"
                          />
                          <label htmlFor={`checkbox-${exp._id}`} className="text-gray-700 text-xl font-medium">
                            I&apos;m Currently Working
                          </label>
                        </div>
                      )} */}
                    </div>
                  ))}
                </div>
                {/* </div> */}
              </div>
            ) : (
              <h1 className="text-center mt-5 flex justify-center gap-1">
                <IoWarningOutline className='text-4xl text-blue-500 ' /> <span className='mt-2 font-semibold'>No details provided</span>
              </h1>
            )}
          </div>
        );
      case 'My Post':
        return (
          <p><MyPosts /></p>
          //       <div>
          //         <div className="container mx-auto px-4 py-8">
          //   <h1 className="text-3xl font-semibold text-center mb-8">My Posted Projects</h1>

          //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          //     {projects.length === 0 ? (
          //       <p className="text-center text-gray-600">No projects posted yet.</p>
          //     ) : (
          //       projects.map((project, index) => (
          //         <div key={index} className="w-96 h-54 bg-white shadow-lg rounded-xl p-6 text-center">
          //           <Image
          //             src={project.fileUrl || '/default-image.jpg'}  // Default image if no fileUrl
          //             alt="Project image"
          //             width={100}
          //             height={100}
          //             className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full"
          //           />
          //           <h3 className="text-xl font-semibold">{project.projectName}</h3>
          //           <p className="text-gray-600 mt-2 text-center">{project.description}</p>

          //           <div className="flex flex-wrap justify-center space-x-2 my-2">
          //             {project.skills.map((skill, index) => (
          //               <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full">
          //                 {skill}
          //               </span>
          //             ))}
          //           </div>

          //           <div className="flex justify-between">
          //             <div>
          //               <p className="text-lg font-semibold mt-4">
          //                 {project.isHourly ? 'Per Hour' : 'Fixed Payment'}
          //               </p>
          //               <p className="text-lg font-semibold">
          //                 {project.payment} {project.currency}
          //               </p>
          //             </div>
          //             <div>
          //               <a
          //                 href={`mailto:${project.email}`}
          //                 className="text-blue-500 mt-8 block hover:underline"
          //               >
          //                 Apply now
          //               </a>
          //             </div>
          //           </div>
          //         </div>
          //       ))
          //     )}
          //   </div>
          // </div>
          //       </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className='bg-blue-300'>
      <div>
        <Navbar />
      </div>
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-700"></div>
        </div>
      )}
      <div className='mx-2 lg:mx-20 mt-16 lg:mt-20'>
        <div className=''>
          <div className="bg-blue-300 flex flex-col items-center">
            <div className="w-full relative">
              <Image
                src={PortDetails.coverSrc || coverImage}
                // src={isimadetailsprovided ? imadetails.ci : coverImage}
                alt="Cover Image"
                layout='responsive'
                className="rounded-lg w-full h-48 md:h-64 z-0 object-cover block md:hidden"
              />
              <Image
                src={PortDetails.coverSrc || coverImage}
                // src={isimadetailsprovided ? imadetails.ci : coverImage}
                alt="Cover Image"
                className="rounded-lg w-full h-64 object-cover z-0 hidden md:block"
              />
              <div className="absolute -bottom-16 md:-bottom-20 left-24 md:left-48 transform -translate-x-1/2">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-black overflow-hidden">
                  <Image
                    src={PortDetails.profileSrc || profilePic}
                    // src={isimadetailsprovided ? imadetails.pi : profilePic}
                    alt="Profile Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-2 right-5  md:right-10">
                <div>
                  <button className='bg-white text-sm md:text-xl px-4 md:px-8 py-2 rounded-lg'>Upload Cover Photo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:flex justify-between'>
          <div className='md:flex gap-4 lg:gap-10 mt-2 md:mt-4 ml-48 md:ml-80'>
            <h1 className='text-lg md:text-xl lg:text-3xl'>{PortDetails.firstName}</h1>
            {/* <h1 className='text-lg md:text-xl lg:text-3xl mt-2 md:mt-0'>  {PortDetails.userName && `@${PortDetails.userName}`}</h1> */}
            <h1 className='text-lg md:text-xl lg:text-3xl mt-2 md:mt-0'> {PortDetails.userName}</h1>
          </div>
          <div className='flex gap-4 m-4'>
            <div id='share'>
              <svg className='mt-0 md:mt-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><circle cx="18" cy="5" r="1" fill="black" opacity="0.3" /><circle cx="6" cy="12" r="1" fill="black" opacity="0.3" /><circle cx="18" cy="19.02" r="1" fill="black" opacity="0.3" /><path fill="black" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92M18 4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M6 13c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m12 7.02c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1" /></svg>
            </div>
            <div>
              <button className='bg-white text-sm md:text-xl px-4 md:px-8 py-2 rounded-lg'>Edit Profile</button>
            </div>
          </div>
        </div>
        {/* <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='ml-1'>
            <h1 className='text-2xl font-bold ml-28 mt-4'>Web Developer</h1>
            <h1 className='ml-4 mt-4 mr-4 lg:mr-40 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam cupiditate praesentium facilis autem suscipit facere adipisci eum, officia voluptatem expedita sit quas impedit blanditiis dicta cumque ducimus!</h1>
          </div>
          <div className='mx-4 lg:ml-80 mt-4 md:mt-8 lg:mt-4'>
            <div><h1 className='text-center font-semibold text-xl'>Social Links</h1></div>
            <div className='flex gap-8 bg-white border rounded-md py-2 px-8 mt-4'>
              <div id='linkedin'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60" /><rect width="256" height="256" fill="#0a66c2" rx="60" /><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4" /></g></svg>
              </div>
              <div id='github'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill-rule="evenodd" clip-rule="evenodd"><path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" /><path d="M19.1833 45.4716C18.9898 45.2219 18.9898 42.9973 19.1833 38.798C17.1114 38.8696 15.8024 38.7258 15.2563 38.3667C14.437 37.828 13.6169 36.1667 12.8891 34.9959C12.1614 33.8251 10.5463 33.64 9.89405 33.3783C9.24182 33.1165 9.07809 32.0496 11.6913 32.8565C14.3044 33.6634 14.4319 35.8607 15.2563 36.3745C16.0806 36.8883 18.0515 36.6635 18.9448 36.2519C19.8382 35.8403 19.7724 34.3078 19.9317 33.7007C20.1331 33.134 19.4233 33.0083 19.4077 33.0037C18.5355 33.0037 13.9539 32.0073 12.6955 27.5706C11.437 23.134 13.0581 20.2341 13.9229 18.9875C14.4995 18.1564 14.4485 16.3852 13.7699 13.6737C16.2335 13.3589 18.1347 14.1343 19.4734 16.0001C19.4747 16.0108 21.2285 14.9572 24.0003 14.9572C26.772 14.9572 27.7553 15.8154 28.5142 16.0001C29.2731 16.1848 29.88 12.7341 34.5668 13.6737C33.5883 15.5969 32.7689 18.0001 33.3943 18.9875C34.0198 19.9749 36.4745 23.1147 34.9666 27.5706C33.9614 30.5413 31.9853 32.3523 29.0384 33.0037C28.7005 33.1115 28.5315 33.2855 28.5315 33.5255C28.5315 33.8856 28.9884 33.9249 29.6465 35.6117C30.0853 36.7362 30.117 39.948 29.7416 45.247C28.7906 45.4891 28.0508 45.6516 27.5221 45.7347C26.5847 45.882 25.5669 45.9646 24.5669 45.9965C23.5669 46.0284 23.2196 46.0248 21.837 45.8961C20.9154 45.8103 20.0308 45.6688 19.1833 45.4716Z" /></g></svg>
              </div>
              <div id='twitter'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 448 512"><path fill="black" d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z" /></svg>
              </div>
              <div id='email'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="black" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm3.519 0L12 11.671L18.481 6zM20 7.329l-7.341 6.424a1 1 0 0 1-1.318 0L4 7.329V18h16z" /></svg>
              </div>
              <div id='telegram'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><defs><linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2aabee" /><stop offset="100%" stop-color="#229ed9" /></linearGradient></defs><path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0" /><path fill="#fff" d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072" /></svg>
              </div>
            </div>
          </div>
        </div> */}

        {isPortDetailsProvided ? (
          <div className='grid grid-cols-1 md:grid-cols-2'>

            {PortDetails.bioTitle || PortDetails.bio ? (
              <div className="ml-1">
                <h1 className="text-2xl font-bold ml-28 mt-4">{PortDetails.bioTitle || "Title"}</h1>
                <p className="ml-4 mt-4 mr-4 lg:mr-40 text-justify">{PortDetails.bio || "Bio content is not provided."}</p>
              </div>
            ) : (
              <div className="ml-1 w-96 bg-white border rounded-md py-2 px-8 mt-4 md:mt-10">
                <p className="text-center mt-1">Bio content is not provided.</p>
              </div>
            )}

            {PortDetails.socialLinks?.length > 0 ? (
              <div className="mx-4 lg:ml-80 mt-4 md:mt-8 lg:mt-4">
                <h1 className="text-center font-semibold text-xl">Social Links</h1>
                <div className="flex justify-center gap-8 bg-white border rounded-md py-2 px-8 mt-4">
                  {PortDetails.socialLinks.map((link: any) => (
                    <div key={link._id}>
                      {link.url ? (
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {/* Display the icon with a link */}
                          {link.platform === "LinkedIn" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60" /><rect width="256" height="256" fill="#0a66c2" rx="60" /><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4" /></g></svg>
                          )}
                          {link.platform === "GitHub" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill-rule="evenodd" clip-rule="evenodd"><path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" /><path d="M19.1833 45.4716C18.9898 45.2219 18.9898 42.9973 19.1833 38.798C17.1114 38.8696 15.8024 38.7258 15.2563 38.3667C14.437 37.828 13.6169 36.1667 12.8891 34.9959C12.1614 33.8251 10.5463 33.64 9.89405 33.3783C9.24182 33.1165 9.07809 32.0496 11.6913 32.8565C14.3044 33.6634 14.4319 35.8607 15.2563 36.3745C16.0806 36.8883 18.0515 36.6635 18.9448 36.2519C19.8382 35.8403 19.7724 34.3078 19.9317 33.7007C20.1331 33.134 19.4233 33.0083 19.4077 33.0037C18.5355 33.0037 13.9539 32.0073 12.6955 27.5706C11.437 23.134 13.0581 20.2341 13.9229 18.9875C14.4995 18.1564 14.4485 16.3852 13.7699 13.6737C16.2335 13.3589 18.1347 14.1343 19.4734 16.0001C19.4747 16.0108 21.2285 14.9572 24.0003 14.9572C26.772 14.9572 27.7553 15.8154 28.5142 16.0001C29.2731 16.1848 29.88 12.7341 34.5668 13.6737C33.5883 15.5969 32.7689 18.0001 33.3943 18.9875C34.0198 19.9749 36.4745 23.1147 34.9666 27.5706C33.9614 30.5413 31.9853 32.3523 29.0384 33.0037C28.7005 33.1115 28.5315 33.2855 28.5315 33.5255C28.5315 33.8856 28.9884 33.9249 29.6465 35.6117C30.0853 36.7362 30.117 39.948 29.7416 45.247C28.7906 45.4891 28.0508 45.6516 27.5221 45.7347C26.5847 45.882 25.5669 45.9646 24.5669 45.9965C23.5669 46.0284 23.2196 46.0248 21.837 45.8961C20.9154 45.8103 20.0308 45.6688 19.1833 45.4716Z" /></g></svg>
                          )}
                          {link.platform === "Twitter" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 448 512"><path fill="black" d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z" /></svg>
                          )}
                          {link.platform === "Telegram" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><defs><linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2aabee" /><stop offset="100%" stop-color="#229ed9" /></linearGradient></defs><path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0" /><path fill="#fff" d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072" /></svg>
                          )}
                        </a>
                      ) : (
                        // Display the icon without a link if the URL is empty
                        <div className="cursor-help">
                          {link.platform === "LinkedIn" && (
                            <PiLinkedinLogoDuotone className="bg-gray-500 p-1 rounded-md text-3xl" />
                          )}
                          {link.platform === "GitHub" && (
                            <LuGithub className="bg-gray-500 text-3xl p-1 rounded-md" />
                          )}
                          {link.platform === "Twitter" && (
                            <FaXTwitter className="bg-gray-500 text-3xl p-1 rounded-md" />
                          )}
                          {link.platform === "Telegram" && (
                            <LiaTelegram className="bg-gray-500 text-3xl p-1 rounded-md" />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-4 lg:ml-80 mt-4 md:mt-8 lg:mt-10 bg-white border rounded-md py-2 px-8">
                {/* <h1 className="text-center font-semibold text-xl">Social Links</h1> */}
                <h1 className='text-center mt-1'>No Social Links provided</h1>
              </div>
            )}

          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2'>

            <div className="ml-1 w-96 bg-white border rounded-md py-2 px-8 mt-4 md:mt-10">
              <p className="text-center mt-1">Bio content is not provided.</p>
            </div>

            <div className="mx-4 lg:ml-80 mt-4 md:mt-8 lg:mt-10 bg-white border rounded-md py-2 px-8">
              {/* <h1 className="text-center font-semibold text-xl">Social Links</h1> */}
              <h1 className='text-center mt-1'>No Social Links provided</h1>
            </div>

          </div>
        )}


        <div className=''>
          <div className='flex justify-between md:mx-10 mt-10'>
            <h1 className='text-2xl font-semibold lg:text-4xl'>Portfolio</h1>
            <h1 className='flex underline text-xl hover:text-blue-500 hover:cursor-pointer'> {isPortDetailsProvided ? "Manage Portfolio" : "Fill Portfolio"} <svg className='underline hover:text-blue-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" d="M5 18.08V19h.92l9.06-9.06l-.92-.92z" opacity="0.3" /><path fill="black" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06l.92.92zM20.71 5.63l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41" /></svg></h1>
          </div>
          {(PortDetails.portfolioSrc || PortDetails.portfolioRole || PortDetails.portfolioLink) ? (
            <div className="flex justify-center">
              <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 my-4 w-[350px] md:w-[450px]">
                <Image
                  src={PortDetails.portfolioSrc || portfolioalt}
                  width={10}
                  height={10}
                  alt="Title"
                  className="w-full h-56 object-cover"
                />
                <div className="mt-4 text-center flex justify-between mx-4">
                  <div>
                    <p className="text-gray-500">{PortDetails.portfolioRole}</p>
                  </div>
                  <div className="mt-4">
                    {PortDetails.portfolioLink && (
                      <a href={PortDetails.portfolioLink} className="text-blue-500 font-semibold">
                        →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <h1 className="bg-white shadow-md rounded-lg overflow-hidden p-4 my-4 w-[350px] md:w-[450px] flex justify-center">
                <IoWarningOutline className="text-4xl text-blue-500" />{" "}
                <span className="mt-2 font-semibold">No details provided</span>
              </h1>
            </div>
          )}

        </div>

        <div>
          <div className="flex flex-col items-center mx-2 md:mx-10">
            {/* Navigation Bar */}
            <div className="w-full mt-10">
              <nav className="flex justify-between border-2 rounded-lg border-gray-200">
                {['Profile', 'Experience', 'My Post'].map((tab, index) => (
                  <button
                    key={tab}
                    className={`flex-1 text-center py-2 text-xl font-semibold ${activeTab === tab
                      ? 'bg-blue-500 rounded-lg text-white'
                      : 'bg-blue-200 text-gray-600'
                      } hover:text-gray-800 ${index !== 0 ? 'border-l-2  border-gray-200' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="w-full max-w-6xl my-6 bg-blue-200 p-6 rounded-lg shadow-lg">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default MyProfile;
