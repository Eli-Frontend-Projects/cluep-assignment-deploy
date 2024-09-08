import { useState } from 'react';
import axios from 'axios';

const useSendMessage = (userId, token) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!userId || !token || !message) return; 

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/user/${userId}/msg`, { message }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, error, loading };
};

export default useSendMessage;
