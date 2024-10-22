import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import ListaForm from '../../components/ListaForm';
import ListaList from '../../components/ListaList';

function Listas() {
  const [listas, setListas] = useState([]);
  const [farmacos, setFarmacos] = useState([]);
  const [listaEnEdicion, setListaEnEdicion] = useState(null); // Estado para la lista en edición

  // Función para obtener farmacos
  useEffect(() => {
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

    fetchFarmacos();
  }, []);

  // Define `fetchListas` para poder reutilizarla
  const fetchListas = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/listas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListas(response.data.listas || []);
    } catch (error) {
      console.error('Error al obtener las listas:', error);
    }
  };

  // Llamar `fetchListas` cuando se monte el componente
  useEffect(() => {
    fetchListas();
  }, []);

  // Agregar o actualizar una lista
  const addLista = async (nuevaLista) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    try {
      if (listaEnEdicion) {
        // Actualizar lista existente
        const response = await axios.patch(`/listas/${listaEnEdicion._id}`, {
          user: userId,
          ...nuevaLista,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Actualiza las listas después de la edición
        fetchListas(); 
      } else {
        // Crear una nueva lista
        const response = await axios.post('/listas', {
          user: userId,
          ...nuevaLista,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Actualiza las listas después de crear una nueva
        fetchListas(); // 
      }
      setListaEnEdicion(null); // Resetear la edición después de crear o actualizar
    } catch (error) {
      console.error('Error al crear/actualizar la lista:', error);
    }
  };

  // Eliminar lista
  const deleteLista = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/listas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchListas(); // Llamar a fetchListas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la lista:', error);
    }
  };

  // Editar lista
  const handleEdit = (lista) => {
    setListaEnEdicion(lista); // Pasa la lista a editar
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold MB-4 mt-20">Listas de Tratamientos</h1>
      <Link to="/dashboard">
        <button className="bg-gray-500 text-white p-2 rounded">Volver al Dashboard</button>
      </Link>
      <Link to="/dashboard/farmacos">
        <button className="bg-emerald-600 text-white p-2 rounded">Ir a Farmacos</button>
      </Link>


      <ListaForm farmacos={farmacos} addLista={addLista} listaEnEdicion={listaEnEdicion} />

      {listas.length > 0 ? (
        <ListaList listas={listas} onDelete={deleteLista} onEdit={handleEdit} />
      ) : (
        <p className="text-gray-600">No hay tratamientos disponibles.</p>
      )}
    </div>
  );
}

export default Listas;