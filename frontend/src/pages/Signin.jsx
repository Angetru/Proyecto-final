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
      navigate('/dashboard');
    } catch (error) {
        console.error('Error en Login:', error);
        if (error.response) {
          console.error('Error data:', error.response.data);
        }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="form-input mt-1 block w-full"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="form-input mt-1 block w-full"
        />
        <button type="submit" className="btn btn-primary mt-4">Login</button>
      </form>
    </div>
  );
}

export default Signin;