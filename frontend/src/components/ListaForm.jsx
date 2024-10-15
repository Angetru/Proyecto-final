import { useEffect, useState } from 'react';
import axios from '../api/axios';

function ListaForm({ selectedLista, setSelectedLista, refreshListas }) {
  const [formData, setFormData] = useState({ farmacos: [], categoria: '' });

  useEffect(() => {
    if (selectedLista) {
      setFormData({
        farmacos: selectedLista.farmacos,
        categoria: selectedLista.categoria
      });
    } else {
      setFormData({ farmacos: [], categoria: '' });
    }
  }, [selectedLista]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (selectedLista) {
        // Actualiza lista existente
        await axios.put(`/listas/${selectedLista._id}`, { 
          farmacos: formData.farmacos, 
          categoria: formData.categoria 
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Crea nueva lista
        await axios.post('/listas', { 
          farmacos: formData.farmacos, 
          categoria: formData.categoria 
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      refreshListas(); // Refresca la lista después de crear o actualizar
      setSelectedLista(null); // Resetea el formulario
    } catch (error) {
      console.error('Error guardando la lista:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="categoria" 
        value={formData.categoria} 
        onChange={handleChange} 
        placeholder="Tratamiento" 
        required 
      />
      <input 
        type="text" 
        name="farmacos" 
        value={formData.farmacos.join(', ')} // Mostrar los fármacos como una cadena
        onChange={handleChange} 
        placeholder="Fármacos (separados por comas)" 
        required 
      />
      <button type="submit">
        {selectedLista ? 'Actualizar' : 'Crear'} Lista de tratamiento
      </button>
    </form>
  );
}

export default ListaForm;
