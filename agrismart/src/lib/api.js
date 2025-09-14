import axios from 'axios';

// Backend API configuration
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh',
  
  // User Management
  USER_PROFILE: '/api/user/profile',
  UPDATE_PROFILE: '/api/user/profile',
  
  // Pest Detection
  PEST_DETECTION: '/api/pest/detect',
  PEST_HISTORY: '/api/pest/history',
  PEST_GALLERY: '/api/pest/gallery',
  
  // Soil Health
  SOIL_HEALTH: '/api/soil/health',
  SOIL_RECOMMENDATIONS: '/api/soil/recommendations',
  SOIL_HISTORY: '/api/soil/history',
  
  // Weather
  WEATHER_CURRENT: '/api/weather/current',
  WEATHER_FORECAST: '/api/weather/forecast',
  WEATHER_ALERTS: '/api/weather/alerts',
  
  // Crop Management
  CROP_YIELD: '/api/crop/yield',
  CROP_SCHEDULE: '/api/crop/schedule',
  CROP_RECOMMENDATIONS: '/api/crop/recommendations',
  
  // Market Data
  MARKET_PRICES: '/api/market/prices',
  MARKET_TRENDS: '/api/market/trends',
  
  // Reports & Analytics
  REPORTS: '/api/reports',
  ANALYTICS: '/api/analytics',
  
  // Community
  COMMUNITY_REPORTS: '/api/community/reports',
  COMMUNITY_POSTS: '/api/community/posts',
};

// API service functions
export const apiService = {
  // Authentication
  async login(credentials) {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token);
        localStorage.setItem('isAuthenticated', 'true');
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  async logout() {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Pest Detection
  async detectPest(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.post(API_ENDPOINTS.PEST_DETECTION, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Pest detection failed');
    }
  },

  async getPestHistory() {
    try {
      const response = await api.get(API_ENDPOINTS.PEST_HISTORY);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch pest history');
    }
  },

  async getPestGallery() {
    try {
      const response = await api.get(API_ENDPOINTS.PEST_GALLERY);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch pest gallery');
    }
  },

  // Soil Health
  async getSoilHealth() {
    try {
      const response = await api.get(API_ENDPOINTS.SOIL_HEALTH);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch soil health data');
    }
  },

  async getSoilRecommendations() {
    try {
      const response = await api.get(API_ENDPOINTS.SOIL_RECOMMENDATIONS);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch soil recommendations');
    }
  },

  // Weather
  async getCurrentWeather() {
    try {
      const response = await api.get(API_ENDPOINTS.WEATHER_CURRENT);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
  },

  async getWeatherForecast() {
    try {
      const response = await api.get(API_ENDPOINTS.WEATHER_FORECAST);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather forecast');
    }
  },

  // Crop Management
  async getCropYield() {
    try {
      const response = await api.get(API_ENDPOINTS.CROP_YIELD);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch crop yield data');
    }
  },

  async getCropSchedule() {
    try {
      const response = await api.get(API_ENDPOINTS.CROP_SCHEDULE);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch crop schedule');
    }
  },

  // Market Data
  async getMarketPrices() {
    try {
      const response = await api.get(API_ENDPOINTS.MARKET_PRICES);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch market prices');
    }
  },

  // Community
  async getCommunityReports() {
    try {
      const response = await api.get(API_ENDPOINTS.COMMUNITY_REPORTS);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch community reports');
    }
  },

  async submitCommunityReport(reportData) {
    try {
      const response = await api.post(API_ENDPOINTS.COMMUNITY_REPORTS, reportData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit community report');
    }
  },

  // Reports & Analytics
  async getReports() {
    try {
      const response = await api.get(API_ENDPOINTS.REPORTS);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reports');
    }
  },

  async getAnalytics() {
    try {
      const response = await api.get(API_ENDPOINTS.ANALYTICS);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch analytics');
    }
  },
};

export default api;
