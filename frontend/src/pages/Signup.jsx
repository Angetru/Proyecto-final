import { useState } from 'react';
import axios from '../api/axios';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '' });
  const [success, setSuccess] = useState(false); // Estado para éxito
  const [errorMessage, setErrorMessage] = useState(''); // Estado para error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/signUp', formData);
      console.log(response.data);
      setSuccess(true); // Registro exitoso
      setErrorMessage(''); // Limpia el mensaje de error
    } catch (error) {
      setSuccess(false);
      // Verifica si hay una respuesta del backend con un mensaje de error
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Muestra el mensaje de error del backend
      } else {
        setErrorMessage('Hubo un error al registrarse. Inténtalo de nuevo.'); // Mensaje por defecto
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {success ? ( // Si el registro es exitoso
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
            <p>¡Registro exitoso! Ahora puedes iniciar sesión.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Registro</h2>
            {errorMessage && ( // Muestra el mensaje de error
              <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                <p>{errorMessage}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
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
              <button type="submit" className="w-full text-white bg-emerald-700 mt-4 rounded-lg p-2">
                Registrarse
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
