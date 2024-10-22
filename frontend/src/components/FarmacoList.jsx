import PropTypes from 'prop-types';
import axios from '../api/axios';
import { useEffect, useState, useRef } from 'react';

function FarmacoList({ updateFarmaco, deleteFarmaco }) {
  const [farmacos, setFarmacos] = useState([]);
  const [error, setError] = useState(null);
  const updateButtonRef = useRef(null); // Referencia para el botón "Actualizar Página"

  useEffect(() => {
    const fetchFarmacos = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/farmacos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFarmacos(response.data.farmacos || []);
      } catch (error) {
        setError('Error al obtener los fármacos');
      }
    };
    fetchFarmacos();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/farmacos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      deleteFarmaco(id);
      updateButtonRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll hacia el botón "Actualizar Lista"
    } catch (error) {
      console.error('Error al eliminar el fármaco:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <h1 className="text-2xl font-bold">Lista de Fármacos</h1>
          <button
            ref={updateButtonRef}
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Actualizar Lista
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(farmacos) && farmacos.length > 0 ? (
            farmacos.map((farmaco) => (
              <div key={farmaco._id} className="border rounded-lg p-4 bg-gray-50 shadow-md">
                <h3 className="text-xl font-semibold mb-2">{farmaco.name}</h3>
                <p className="text-gray-700">
                  <span className="font-bold">Descripción:</span> {farmaco.description}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Dosis:</span> {farmaco.dose}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Frecuencia:</span> {farmaco.frequency}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Horarios:</span> {farmaco.times}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Fecha de inicio:</span> {farmaco.startdate}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Fecha de término:</span> {farmaco.enddate}
                </p>
                <div className="mt-4 flex">
                  <button
                    onClick={() => updateFarmaco(farmaco)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(farmaco._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay fármacos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

FarmacoList.propTypes = {
  updateFarmaco: PropTypes.func.isRequired,
  deleteFarmaco: PropTypes.func.isRequired,
};

export default FarmacoList;
