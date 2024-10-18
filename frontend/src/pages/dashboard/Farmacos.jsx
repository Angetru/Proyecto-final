import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import FarmacoForm from '../../components/FarmacoForm';
import FarmacoList from '../../components/FarmacoList';

function Farmacos() {
  const [farmacos, setFarmacos] = useState([]);

  // Función para obtener los fármacos
  const fetchFarmacos = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/farmacos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFarmacos(Array.isArray(response.data.farmacos) ? response.data.farmacos : []);
  };

  useEffect(() => {
    fetchFarmacos();
  }, []);

  const addFarmaco = (farmaco) => {
    setFarmacos([...farmacos, farmaco]);
    fetchFarmacos(); // Llama nuevamente a fetchFarmacos después de añadir el fármaco
  };

  const updateFarmaco = (updatedFarmaco) => {
    setFarmacos(farmacos.map(farmaco => (farmaco._id === updatedFarmaco._id ? updatedFarmaco : farmaco)));
  };

  const deleteFarmaco = (id) => {
    setFarmacos(farmacos.filter(farmaco => farmaco._id !== id));
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold MB-4 mt-20">Farmacos</h2>
      <Link to="/dashboard">
        <button className="bg-gray-500 text-white p-2 rounded">Volver al Dashboard</button>
      </Link>
      <Link to="/dashboard/listas">
        <button className="bg-emerald-500 text-white p-2 rounded">Ir a Tratamientos</button>
      </Link>
      <FarmacoForm onSave={addFarmaco} />
      <FarmacoList farmacos={farmacos} updateFarmaco={updateFarmaco} deleteFarmaco={deleteFarmaco} />
    </div>
  );
}

export default Farmacos;
