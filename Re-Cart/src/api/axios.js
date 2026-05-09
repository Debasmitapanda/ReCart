import axios from 'axios';

const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  'https://recart-backend-lcry.onrender.com';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach the JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;