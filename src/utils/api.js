import axios from 'axios';

// You can replace this with your actual API base URL
const API_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up interceptor that gets store lazily to avoid circular dependency
export const setupInterceptors = (store) => {
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
