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

export const getUserProfile = async (email: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile/${email}`);
    console.log('User profile:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export const updateUserProfile = async (email: string, profileData: { name: string; email: string; address: string; phone: string }) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/profile/${email}`, profileData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('User profile updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

