// hooks/useFetchUsername.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const useFetchUsername = () => {
  const [username, setUsername] = useState(null);
  const token = localStorage.getItem('authToken');
  const userId = jwtDecode(token).id;

  useEffect(() => {
    const fetchUsername = async () => {
      if (userId) {
        try {
          const response = await axios.get(`user/${userId}`);
          setUsername(response.data.username); 
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
