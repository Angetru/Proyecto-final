import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import ListaForm from '../../components/ListaForm';
import ListaList from '../../components/ListaList';

function Listas() {
  const [listas, setListas] = useState([]);
  const [farmacos, setFarmacos] = useState([]);

  // Fetch farmacos
  useEffect(() => {
    const fetchFarmacos = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/farmacos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Fármacos recibidos:", response.data.farmacos); // Comprobar los datos recibidos
        setFarmacos(response.data.farmacos || []); // Asegura que sea un array
      } catch (error) {
        console.error('Error al obtener los fármacos:', error);
      }
    };

    fetchFarmacos();
  }, []);

  // Fetch listas
  useEffect(() => {
    const fetchListas = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/listas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setListas(response.data.listas || []); // Asegura que sea un array
      } catch (error) {
        console.error('Error al obtener las listas:', error);
      }
    };

    fetchListas();
  }, []);

  // Agregar una nueva lista
  const addLista = async (nuevaLista) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    try {
      // Enviar la nueva lista al backend
      const response = await axios.post('/listas', {
        user: userId,
        ...nuevaLista,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const listasActualizadas = await axios.get('/listas', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Actualizamos el estado con las listas obtenidas
      setListas(listasActualizadas.data.listas);
    } catch (error) {
      console.error('Error al crear la lista:', error);
    }
  };

  const deleteLista = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/listas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListas(listas.filter((lista) => lista._id !== id));
    } catch (error) {
      console.error('Error al eliminar la lista:', error);
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold MB-4 mt-20">Listas de Tratamiento</h1>
      <Link to="/dashboard">
        <button className="bg-gray-500 text-white p-2 rounded">Volver al Dashboard</button>
      </Link>
      <Link to="/dashboard/farmacos">
        <button className="bg-emerald-600 text-white p-2 rounded">Ir a Farmacos</button>
      </Link>

      {/* Formulario para crear listas siempre visible */}
      <ListaForm farmacos={farmacos} addLista={addLista} />

      {/* Mostrar las listas si existen */}
      {listas.length > 0 ? (
        <ListaList listas={listas} onDelete={deleteLista} onEdit={() => {}} />
      ) : (
        <p className="text-gray-600">No hay listas disponibles.</p>
      )}
    </div>
  );
}

export default Listas;

