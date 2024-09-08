import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchMessages = (userId, token) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!userId || !token) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}/msg`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.map(msg => msg.message)); // Extracting the message from each response
    } catch (err) {
      setError('Failed to fetch messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, loading, error, refetch: fetchMessages };
};

export default useFetchMessages;
