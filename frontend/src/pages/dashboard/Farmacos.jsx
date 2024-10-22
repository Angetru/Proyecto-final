import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import FarmacoForm from '../../components/FarmacoForm';
import FarmacoList from '../../components/FarmacoList';

function Farmacos() {
  const [farmacos, setFarmacos] = useState([]);
  const [farmacoEnEdicion, setFarmacoEnEdicion] = useState(null); // Estado para edición
  const [mensaje, setMensaje] = useState(''); // Mensaje de éxito o error

  // Función para mostrar el mensaje
  const mostrarMensaje = (msg) => {
    setMensaje(msg);
    setTimeout(() => {
      setMensaje(''); // Oculta el mensaje después de 3 segundos
    }, 3000);
  };

  const fetchFarmacos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/farmacos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFarmacos(response.data.farmacos || []);
    } catch (error) {
      console.error('Error al obtener los fármacos:', error);
    }
  };

  useEffect(() => {
    fetchFarmacos();
  }, []);

  const addFarmaco = async (farmaco) => {
    const token = localStorage.getItem('token');
    try {
      if (farmacoEnEdicion) {
        // Actualizar un fármaco existente
        const response = await axios.patch(`/farmacos/${farmacoEnEdicion._id}`, farmaco, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFarmacos(farmacos.map((f) =>
          f._id === response.data.updatedFarmaco._id ? response.data.updatedFarmaco : f
        ));
        mostrarMensaje('Fármaco actualizado exitosamente');
      } else {
        // Agregar un nuevo fármaco
        const response = await axios.post('/farmacos', farmaco, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFarmacos([...farmacos, response.data]);
        mostrarMensaje('Fármaco creado exitosamente');
      }
      setFarmacoEnEdicion(null);
      fetchFarmacos();
    } catch (error) {
      console.error('Error al agregar/actualizar el fármaco:', error);
    }
  };

  const handleEdit = (farmaco) => {
    setFarmacoEnEdicion(farmaco); // Selecciona el fármaco para editar
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al formulario de edición
  };

  const deleteFarmaco = async (id) => {
    const token = localStorage.getItem('token');
    console.log('Eliminando fármaco con ID:${id}'); 
    try {
      const response = await axios.delete(`/farmacos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFarmacos()
      mostrarMensaje('Fármaco eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el fármaco:', error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold MB-4 mt-20">Fármacos</h2>
      <Link to="/dashboard">
        <button className="bg-gray-500 text-white p-2 rounded">Volver al Dashboard</button>
      </Link>
      <Link to="/dashboard/listas">
        <button className="bg-emerald-500 text-white p-2 rounded">Ir a Tratamientos</button>
      </Link>

      {mensaje && (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-2 z-50">
          {mensaje}
        </div>
      )}

      <FarmacoForm onSave={addFarmaco} farmacoEnEdicion={farmacoEnEdicion} />
      <FarmacoList farmacos={farmacos} updateFarmaco={handleEdit} deleteFarmaco={deleteFarmaco} />
    </div>
  );
}

export default Farmacos;
