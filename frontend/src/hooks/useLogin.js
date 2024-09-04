import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {email, password });
      const { token } = response.data;
      // Save token to localStorage or context
      localStorage.setItem('authToken', token);
      // Redirect to home page
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your email and password.');
    }
  };

  return { loginUser, error };
}