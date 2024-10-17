import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor para agregar el token de autorización a cada solicitud
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agregar token a los headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
