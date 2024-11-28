import axios from 'axios';

const BASE_URL = 'https://2w8n4vrqeb.execute-api.us-east-1.amazonaws.com';

export const registerUser = async (userData: { email: string; password: string; role: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('User registered:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const confirmUser = async (email: string, confirmation_code: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/confirm`,
      { email, confirmation_code },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('User confirmed:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error confirming user:', error);
    throw error;
  }
};

export const loginUser = async (loginData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};