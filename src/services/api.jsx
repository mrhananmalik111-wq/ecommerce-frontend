// src/services/api.js
const API_URL = 'http://localhost:5000/api';

// API Service
const apiService = {
  // Register User
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  },

  // Login User
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/users/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },

  // Get User Profile (Protected)
  getProfile: async (token) => {
    try {
      const response = await fetch(`${API_URL}/users/getMe`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get Profile Error:', error);
      throw error;
    }
  }
};

export default apiService;