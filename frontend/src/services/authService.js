import axios from 'axios';
 
const API_BASE_URL = process.env.API_BACKEND;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    return response.data.token; 
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, { username, email, password });
    return response.data; 
  } catch (error) {
    throw new Error('Signup failed. Please try again later.');
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};
