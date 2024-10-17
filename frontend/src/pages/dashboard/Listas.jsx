import { useState, useEffect } from 'react';
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
  const addLista = (nuevaLista) => {
    setListas([...listas, nuevaLista]);
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
    <div className="mt-10">
      <h1>Listas de Tratamiento</h1>

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

