import { useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';
import axios from '../api/axios'; 

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  
  const token = localStorage.getItem('token');
  let userId;

  if (token) {
    try {
      const decodedToken = jwt_decode(token); // Decodifica el token para obtener el userId
      userId = decodedToken?.id || null; // Asegúrate de que el token contenga el ID del usuario
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    userId = null;
  }

  useEffect(() => {
    // Si no hay userId, no intentamos obtener los datos del usuario
    if (!userId) return;

    // Obtener los datos del usuario al cargar la página
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: '', // No mostrar la contraseña por seguridad
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/users/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error actualizando el perfil');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Deja en blanco si no quieres cambiarla"
            />
          </div>
          <button type="submit" className="bg-emerald-700 text-white py-2 px-4 rounded hover:bg-emerald-600">
            Actualizar Perfil
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
