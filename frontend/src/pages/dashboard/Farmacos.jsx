import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import FarmacoForm from '../../components/FarmacoForm';
import FarmacoList from '../../components/FarmacoList';

function Farmacos() {
  const [farmacos, setFarmacos] = useState([]);

  useEffect(() => {
    const fetchFarmacos = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/farmacos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFarmacos(Array.isArray(response.data) ? response.data : []);
    };

    fetchFarmacos();
  }, []);

  const addFarmaco = (farmaco) => {
    setFarmacos([...farmacos, farmaco]);
  };

  const updateFarmaco = (updatedFarmaco) => {
    setFarmacos(farmacos.map(farmaco => (farmaco._id === updatedFarmaco._id ? updatedFarmaco : farmaco)));
  };

  const deleteFarmaco = (id) => {
    setFarmacos(farmacos.filter(farmaco => farmaco._id !== id));
  };

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold MB-4">Farmacos</h2>
      <FarmacoForm onSave={addFarmaco} />
      <FarmacoList farmacos={farmacos} updateFarmaco={updateFarmaco} deleteFarmaco={deleteFarmaco} />
    </div>
  );
}

export default Farmacos;