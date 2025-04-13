import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/Login`;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user`, {
      userName: credentials.username,
      password: credentials.password
    });
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};