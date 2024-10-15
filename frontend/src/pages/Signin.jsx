import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Signin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Enviando data');
      const response = await axios.post('/signIn', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      console.log('Token almacenado:', localStorage.getItem('token'));
      
      console.log('Navegando a Dashboard');
      navigate('/dashboard');
    } catch (error) {
        console.error('Error en Login:', error);
        if (error.response) {
          console.error('Error data:', error.response.data);
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100"> {/* Asegúrate de que el contenedor ocupe al menos toda la pantalla */}
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
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
        <button type="submit" className="w-full text-white bg-emerald-700 mt-4 rounded-lg p-2">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Signin;