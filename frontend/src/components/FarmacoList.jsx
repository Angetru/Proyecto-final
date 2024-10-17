import PropTypes from 'prop-types';
import axios from '../api/axios';
import { useEffect, useState } from 'react'; // Asegúrate de que useEffect y useState están importados

function FarmacoList({ updateFarmaco, deleteFarmaco }) {
  const [farmacos, setFarmacos] = useState([]); // Asegúrate de que el estado de farmacos esté definido
  const [error, setError] = useState(null); // Estado para manejar errores

  // useEffect para obtener los fármacos al cargar el componente
  useEffect(() => {
    const fetchFarmacos = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/farmacos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fármacos recibidos:', response.data);
        setFarmacos(response.data.farmacos); // Almacena los fármacos en el estado
      } catch (error) {
        console.error('Error al obtener los fármacos:', error);
        setError('Error al obtener los fármacos');
      }
    };

    fetchFarmacos(); // Ejecuta la función para obtener los datos
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/farmacos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      deleteFarmaco(id); // Actualiza el estado en el componente padre
    } catch (error) {
      console.error('Error al eliminar el fármaco:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Lista de Fármacos</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Muestra el error si lo hay */}
        <ul>
          {Array.isArray(farmacos) && farmacos.length > 0 ? (
            farmacos.map(farmaco => (
              <li key={farmaco._id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-md">
                <h3 className="text-xl font-semibold mb-2">{farmaco.name}</h3>
                <p className="text-gray-700"><span className="font-bold">Descripción:</span> {farmaco.description}</p>
                <p className="text-gray-700"><span className="font-bold">Dosis:</span> {farmaco.dose}</p>
                <p className="text-gray-700"><span className="font-bold">Frecuencia:</span> {farmaco.frequency}</p>
                <p className="text-gray-700"><span className="font-bold">Horarios:</span> {farmaco.times}</p>
                <p className="text-gray-700"><span className="font-bold">Fecha de inicio:</span> {farmaco.startdate}</p>
                <p className="text-gray-700"><span className="font-bold">Fecha de término:</span> {farmaco.enddate}</p>
                <div className="mt-4 flex">
                  <button
                    onClick={() => updateFarmaco(farmaco)} // Enviar el fármaco para editar
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(farmaco._id)} // Llamar a la función de eliminar
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay fármacos disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

FarmacoList.propTypes = {
  updateFarmaco: PropTypes.func.isRequired,
  deleteFarmaco: PropTypes.func.isRequired,
};

export default FarmacoList;
