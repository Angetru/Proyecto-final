import { useState, useEffect } from 'react';
import axios from '../api/axios';

function Profile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log(localStorage.getItem('userId')); 

      if (!userId || userId === 'undefined') {
      console.error('Error: User ID no disponible en localStorage');
        return;
    }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name || '');
        setEmail(response.data.email || '');
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };
  
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); 
    
    if (!userId) {
      console.error('User ID no disponible');
      setError('Error: User ID no disponible');
      return;
    }
    
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/${userId}`, {
        name, 
        email, 
        password,
      }, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      
      console.log('Perfil actualizado:', response.data);
      setMessage('¡Perfil actualizado exitosamente!');
      setError(''); // Limpia cualquier mensaje de error

    } catch (error) {
      console.error('Error actualizando el perfil:', error);
      setMessage(''); 
      setError('Error actualizando el perfil. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-20">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>

      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Nueva Contraseña</label>
          <input
            type="password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="Deja en blanco si no quieres cambiarla"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 text-white py-2 px-4 rounded-lg hover:bg-emerald-500"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default Profile;
