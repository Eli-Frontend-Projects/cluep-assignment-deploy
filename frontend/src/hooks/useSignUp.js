import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signUp = async (signUpData) => {
    setError(null);

    try {
      const response = await axios.post('/user/signup', signUpData);
      const { token } = response.data;
      
      localStorage.setItem('authToken', token);
      navigate('/home');
    } catch (err) {
      console.log(error, "Adfadsfas");
      if (err.response && err.response.data && err.response.data.error) {
        // Set error message from backend
        setError(err.response.data.error);
      } else {
        // Handle unexpected errors
        setError('Sign up failed. Please try again.');
      }
    }
  };

  return { signUp, error };
};

export default useSignUp;
