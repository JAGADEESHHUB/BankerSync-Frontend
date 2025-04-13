import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/bot`;

export const chatWithAI = async (prompt) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { prompt });
    return response.data;
  } catch (error) {
    console.error('Error chatting with AI:', error);
    throw error;
  }
};