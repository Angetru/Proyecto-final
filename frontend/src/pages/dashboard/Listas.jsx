import { useEffect, useState } from 'react';
import ListaForm from '../../components/ListaForm';
import ListaList from '../../components/ListaList';
import axios from '../../api/axios';

function Listas() {
  const [listas, setListas] = useState([]);
  const [selectedLista, setSelectedLista] = useState(null);

  const fetchListas = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/listas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListas(response.data.result); // Almacena las listas en el estado
    } catch (error) {
      console.error('Error fetching listas:', error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/listas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchListas(); // Refresca la lista después de eliminar
    } catch (error) {
      console.error('Error eliminando la lista:', error);
    }
  };

  useEffect(() => {
    fetchListas(); // Obtener listas al cargar el componente
  }, []);

  return (
    <div>
      <ListaForm 
        selectedLista={selectedLista} 
        setSelectedLista={setSelectedLista} 
        refreshListas={fetchListas} 
      />
      <ListaList 
        listas={listas} 
        onEdit={setSelectedLista} // Configura la lista seleccionada para editar
        onDelete={handleDelete} 
      />
    </div>
  );
}
export default Listas;
