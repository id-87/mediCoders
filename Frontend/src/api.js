import axios from 'axios';

// Create axios instance with base configuration
// Create axios instance with base configuration
const baseURL = 'https://medicoders.onrender.com'; // Force localhost for debugging
console.log('API Base URL:', baseURL);

const api = axios.create({
    baseURL: baseURL,
    timeout: 5000, // 5 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or unauthorized
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userType');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
