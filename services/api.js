import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from './tokenHelper';

const BASE_URL = process.env.API_BASE_URL;
console.log('API_BASE_URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Time in milliseconds
  headers: {'Content-Type': 'application/json'}
});

// Function to fetch data from the server
export const fetchData = async () => {
  try {
    const token = await getToken();
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await api.get('/data');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw {message: error.message, status: error.response.status};
  }
};

// Function to post data to the server
export const postData = async (endpoint, data = {}) => {
  console.log("endpoint:::", endpoint);
  try {
    const token = await getToken();
    
    if (token) {
      data = {...data, 'useraccesstoken': token};
    }  
    
    const response = await api.post(endpoint, data);
    console.log("test",response.data);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized: 401::', error.code);
      alert(error.response.data.message);
    } else {
        alert(error.response.data.message);
        throw {message: error.message, status: error.response.status};
    } 
    
  }
};
