import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Signin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/signIn', formData);
      
      // Verifica si el token está en la respuesta
      if (response.data && response.data.token) {
        // Almacena el token correctamente
        localStorage.setItem('token', response.data.token);
        console.log('Token almacenado:', localStorage.getItem('token'));
        
        // Redirige al dashboard o a la página que desees
        navigate('/dashboard');
      } else {
        // Si no hay token, muestra un mensaje de error
        setErrorMessage('Error: No se recibió un token de autenticación.');
        console.error('Error: No se recibió un token de autenticación.');
      }
      
    } catch (error) {
      console.error('Error en Login:', error);
      // Si hay una respuesta de error específica, la muestra
      if (error.response && error.response.data) {
        setErrorMessage(`Error: ${error.response.data.message || 'Error al iniciar sesión'}`);
      } else {
        setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button type="submit" className="w-full text-white bg-emerald-700 mt-4 rounded-lg p-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
