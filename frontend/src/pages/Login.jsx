import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [, setToken] = useAuth();
  const navigate = useNavigate();
  const { loginUser, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    // Validate form data before calling loginUser
    if (!email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      navigate('/');
    } catch (err) {
      setErrorMessage('Failed to login. Please check your email and password and try again.');
      console.error('Login error:', err); // Log the error for debugging
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 md:mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
