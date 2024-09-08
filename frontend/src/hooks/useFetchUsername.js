// hooks/useFetchUsername.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const useFetchUsername = () => {
  const [username, setUsername] = useState(null); // Default username
  const token = localStorage.getItem('authToken');
  const userId = token ? jwtDecode(token).sub : null;

  useEffect(() => {
    const fetchUsername = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/user/${userId}`);
          setUsername(response.data.username); // Assuming the API returns the username field
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };

    fetchUsername();
  }, [userId]);

  return username;
};

export default useFetchUsername;
