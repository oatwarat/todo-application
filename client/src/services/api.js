import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001'
});

// Add token to headers if it exists
if (localStorage.token) {
  api.defaults.headers.common['x-auth-token'] = localStorage.token;
}

export default api;