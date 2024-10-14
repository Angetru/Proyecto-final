import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import ListaForm from '../../components/ListaForm';
import ListaList from '../../components/ListaList';

function Listas() {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const fetchListas = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/listas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListas(response.data);
    };

    fetchListas();
  }, []);

  const addLista = (lista) => {
    setListas([...listas, lista]);
  };

  const updateLista = (updatedLista) => {
    setListas(listas.map(lista => (lista._id === updatedLista._id ? updatedLista : lista)));
  };

  const deleteLista = (id) => {
    setListas(listas.filter(lista => lista._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Tratamientos</h2>
      <ListaForm addLista={addLista} />
      <ListaList listas={listas} updateLista={updateLista} deleteLista={deleteLista} />
    </div>
  );
}

export default Listas;