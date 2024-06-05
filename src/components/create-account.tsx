import React, { useState, ChangeEvent, FormEvent } from 'react';
import { z } from 'zod';
import Swal from 'sweetalert2'; // Importing the Swal library for notifications

// Define a data validation scheme for the form
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  experience: z.enum(['0', '1', '2', '3', '>3']),
  remember: z.boolean(),
});

const Create: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // State to store email
  const [password, setPassword] = useState<string>(''); 
  const [experience, setExperience] = useState<string>(''); 
  const [remember, setRemember] = useState<boolean>(false); // State to store whether user wants to be remembered
  const [error, setError] = useState<boolean>(false); // State to manage password validation error

  // Handling password change
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError(newPassword.length < 6); // Checking password length to display error if necessary
  };

  // Handling form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Preventing page reload on form submission
    const result = schema.safeParse({ email, password, experience, remember });

    // If validation fails, display error message
    if (!result.success) {
      const errorMessage = result.error.errors.map((err) => err.message).join(', ');

      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: errorMessage,
        showConfirmButton: false,
        timer: 5000,
      });

      return;
    }

    // Displaying a success notification to the user
    Swal.fire({
      timer: 1500,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.fire({
          icon: 'success',
          title: 'Account created successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });

    // Logging the data to console (email, password, experience, and remember option)
    console.log(email, password, experience, remember);
};

  // JSX for Create component
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow">
      {/* Title of the form */}
      <h1 className="text-center text-xl" style={{ color: "#0072B5" }}>
        <strong>Create Account</strong>
      </h1>
      {/* Invitation message */}
      <p className="text-center my-5">Create your account in a second to receive our latest news!</p>
      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Email field */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password field */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-700">At least 6 characters</span>
          </div>
          <input
            type="password"
            id="password"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {/* Error message display if validation fails */}
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <strong><i className="bi bi-exclamation-triangle-fill"></i> Error: </strong>Password must be at least 6 characters long.
            </p>
          )}
        </div>
        {/* Selecting experience */}
        <div className="mb-5">
          <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year of experience</label>
          <select
            id="experience"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          >
            <option value="">Please select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value=">3">more than 3</option>
          </select>
        </div>
        {/* Remember Me option */}
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              className="w-5 h-5 border border-blue-300 rounded-2xl"
              style={{ backgroundColor: remember ? "#0072B5" : "#EDF2F7" }}
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remember Me
          </label>
        </div>
        {/* Submit button */}
        <div className="mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ background: "#0072B5" }}>Create Account</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
