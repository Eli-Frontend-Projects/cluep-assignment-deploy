import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signUp = async (signUpData) => {
    setError(null);

    try {
      // Make the API request to sign up the user
      const response = await axios.post('http://localhost:5000/api/signup', signUpData);
      const { token } = response.data;
      
      // Save the token to localStorage or context
      localStorage.setItem('authToken', token);
      
      // Redirect to the home page after successful sign-up
      navigate('/home');
    } catch (err) {
      // Handle errors and set the error state
      setError('Sign up failed. Please check your details and try again.');
    }
  };

  return { signUp, error };
};

export default useSignUp;