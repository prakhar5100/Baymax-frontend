import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from "react-confetti";

const SignUp = ({ onDelete, next }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConfettiRunning(false);
      setIsVisible(false); // Stop confetti after 5 seconds
    }, 15000); // 5000ms = 5 seconds

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('/api/authentication/register/', {
        username: email, // Assuming the backend expects 'username' instead of 'email'
        password
      });
      setIsConfettiRunning(true);
      alert('Sign Up successful!', response.data);

      // Hide the login section after successful submission
      // Here you can add logic to handle successful login (e.g., storing tokens, redirecting)
    } catch (error) {
      alert('Error sign up');
      // Here you can add logic to handle login errors (e.g., showing error messages)
    }
  };

  if (!isVisible) {
    return null; // Render nothing if the component is not visible
  }

  return (
    <section className='bg-black bg-opacity-35 absolute inset-0 h-screen font '>
            {isConfettiRunning && <Confetti />}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#e2e8f0]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="flex justify-between text-xl font-bold leading-tight tracking-tight text-[#263246] md:text-2xl">
              Sign up to your account
              <div onClick={onDelete}>
                <svg className="cursor-pointer w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
              </div>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-white"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-[#263246]">Remember me</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
              <p className="text-sm font-light text-[#263246]">
                Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={next}>Sign In</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
