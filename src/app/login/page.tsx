"use client";
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../Assests/logo.png';
import login from '../../Assests/login.png';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { auth, provider } from '../../Firebaseauth';
import { User } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";

const LoginPage: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      toast.success('Login successful!');
      localStorage.setItem('firebaseUser', JSON.stringify({ email: user.email }));
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(`Error signing in with Google:${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      const response = await fetch('https://career-net-server.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data.user.email);
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        toast.success('Login successful!');
        setTimeout(() => {
          router.push('/');
        }, 2000);
       
      } else {
        setError(data.message);
        toast.error(`Error: ${error}`);
      }
  setLoading(false);
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Something went wrong. Please try again later.');
      toast.error(`Error logging in: ${err}`)
    }
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
    <div className='bg-blue-300'>
      <Link href="/">
      <div className='flex justify-start'>
        <button className='bg-gray-200 mt-4 ml-10 rounded-xl px-4 py-3'>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="black" d="M20 9v6h-8v4.84L4.16 12L12 4.16V9z"/></svg>
      </button>
      </div>
      </Link>
      <div className='lg:grid lg:grid-cols-2 bg-blue-300 h-screen py-10 md:py-20 lg:py-0 px-10'>
        <div className="flex justify-center items-center ">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
            <div className=''>
              <div>
                <div className='flex justify-center'>
                  <div className="text-lg font-bold flex items-center gap-2">
                    <Link href="/">
                      <Image src={logo} height={80} width={80} alt="logo" />
                    </Link>
                    <h1 className="ml-2 text-2xl md:text-4xl drop-shadow-xl">Career<span className='text-blue-500'>Net</span></h1>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-center text-2xl font-bold mt-4 mb-6">Welcome back</h1>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <div className="space-y-4">
              <button  onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 text-md md:text-xl rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" /><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
                Continue with Google
              </button>
            </div>
            <div className="grid grid-cols-3 my-6">
              <div>
                <hr className='border border-gray-500 mt-2' />
              </div>
              <div>
                <h1 className="text-gray-800 text-center">OR</h1>
              </div>
              <div>
                <hr className='border border-gray-500 mt-2' />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
            <hr className='border border-gray-500 mt-4' />
            <div className="mt-4 flex justify-center gap-1 text-center">
              <span>Don&apos;t have an account?</span>
              <Link href="/signup">
                <h1 className="text-blue-600 hover:underline">Sign up</h1>
              </Link>
            </div>
          </div>
        </div>
        <div className='lg:flex justify-center my-20 hidden '>
          <Image src={login} height={450} width={450} alt='login' />
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

export default LoginPage;
