"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../Assests/logo.png";
import login from "../../Assests/login.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth, provider } from "../../Firebaseauth";
import { User } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type Errors = {
  firstName?: string; 
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: boolean;
};

const SignupPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      toast.success('Login successful!');
      setTimeout(() => {
        router.push('/signupnext');
      }, 2000);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(`Error signing in with Google:${error}`);
    }
  };


  const validate = () => {
    const newErrors: any = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
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
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(); 
    if (Object.keys(validationErrors).length === 0) {
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
              }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('userEmail', data.user.email);
                console.log("User registered successfully", data);
                toast.success('Sign Up!');
                setTimeout(() => {
                  router.push('/signupnext');
                }, 2000);
            } else {
                console.error("Error registering user:", data.message);
                toast.error('Error');
            }
        } catch (error) {
            console.error("Error submitting form", error);
        }
    } else {
        console.error("Form validation failed:", validationErrors);
        toast.error(`Form validation failed: ${validationErrors}`)
        setErrors(validationErrors); 
    }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
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

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.firstName ? "focus:ring-red-500" : "focus:ring-blue-400"
                  }`}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.lastName ? "focus:ring-red-500" : "focus:ring-blue-400"
                  }`}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-blue-400"
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
                  className={`w-full px-4 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password
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
                  className={`w-full px-4 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
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
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <Image
            src={login}
            height={600}
            width={600}
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
