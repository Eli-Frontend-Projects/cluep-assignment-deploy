import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

function SignUp() {
  const navigate = useNavigate();
  const { signUp, loading, error } = useSignUp();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const result = await signUp(formData);
    if (result) {
      navigate('/home');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 sm:mx-6 md:mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Sign Up</h1>
        <form onSubmit={handleSignUpSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            className="text-indigo-600 font-semibold hover:underline"
            onClick={() => navigate('/')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;