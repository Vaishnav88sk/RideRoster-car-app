import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getCars = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/cars`);
  return response.data;
};

export const getCarDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/cars/${id}`);
  return response.data;
};

export const createCar = async (carData) => {
  const response = await axios.post(`${API_BASE_URL}/api/cars`, carData);
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/cars/${id}`);
  return response.data;
};
