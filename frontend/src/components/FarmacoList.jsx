import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // Asegúrate de que axios esté configurado correctamente

function FarmacoList({ updateFarmaco }) {
  const [farmacos, setFarmacos] = useState([]);
  const [editingFarmaco, setEditingFarmaco] = useState(null); // Estado para almacenar el fármaco en edición

  // Función para obtener todos los fármacos
  const fetchFarmacos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/farmacos');
      setFarmacos(response.data.farmaco);
    } catch (error) {
      console.error('Error obteniendo los fármacos:', error);
    }
  };

  // Función para eliminar un fármaco
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/farmacos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFarmacos(farmacos.filter(farmaco => farmaco._id !== id));
    } catch (error) {
      console.error('Error eliminando el fármaco:', error);
    }
  };

  // Función para manejar la edición de un fármaco
  const handleEdit = (farmaco) => {
    setEditingFarmaco(farmaco); // Set el fármaco en edición
  };

  // Función para manejar la actualización del fármaco
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch(`/farmacos/${editingFarmaco._id}`, editingFarmaco, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFarmacos(farmacos.map(farmaco =>
        farmaco._id === response.data.updatedFarmaco._id ? response.data.updatedFarmaco : farmaco
      ));
      setEditingFarmaco(null); // Limpia el estado después de editar
    } catch (error) {
      console.error('Error actualizando el fármaco:', error);
    }
  };

  useEffect(() => {
    fetchFarmacos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Lista de Fármacos</h1>
        <ul>
          {Array.isArray(farmacos) && farmacos.map(farmaco => (
            <li key={farmaco._id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-md">
              {editingFarmaco && editingFarmaco._id === farmaco._id ? (
                // Formulario de edición
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={editingFarmaco.name}
                    onChange={(e) => setEditingFarmaco({ ...editingFarmaco, name: e.target.value })}
                    className="w-full p-2 mb-2 border"
                  />
                  <textarea
                    value={editingFarmaco.description}
                    onChange={(e) => setEditingFarmaco({ ...editingFarmaco, description: e.target.value })}
                    className="w-full p-2 mb-2 border"
                  />
                  <input
                    type="text"
                    value={editingFarmaco.dose}
                    onChange={(e) => setEditingFarmaco({ ...editingFarmaco, dose: e.target.value })}
                    className="w-full p-2 mb-2 border"
                  />
                  <input
                    type="text"
                    value={editingFarmaco.frequency}
                    onChange={(e) => setEditingFarmaco({ ...editingFarmaco, frequency: e.target.value })}
                    className="w-full p-2 mb-2 border"
                  />
                  <input
                    type="text"
                    value={editingFarmaco.times}
                    onChange={(e) => setEditingFarmaco({ ...editingFarmaco, times: e.target.value })}
                    className="w-full p-2 mb-2 border"
                  />
                  <input
                    type="text"
                    value={editingFarmaco.startdate}
                    onChange={(e) => setEditingFarmaco({ ...editingFarmaco, startdate: e.target.value })}
                    className="w-full p-2 mb-2 border"
                  />
                  <input
                    type="text"
                    value={editingFarmaco.enddate}
                    onChange={(e) => setEditingFarmaco({ ...editingFarmaco, enddate: e.target.value })}
                    className="w-full p-2 mb-2 border"
                  />
                  <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-600">
                    Guardar
                  </button>
                  <button onClick={() => setEditingFarmaco(null)} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">{farmaco.name}</h3>
                  <p className="text-gray-700"><span className="font-bold">Descripción:</span> {farmaco.description}</p>
                  <div className="mt-4 flex">
                    <button
                      onClick={() => handleEdit(farmaco)} // Editar fármaco
                      className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600">
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(farmaco._id)} // Eliminar fármaco
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FarmacoList;
