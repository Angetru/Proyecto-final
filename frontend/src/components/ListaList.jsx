import axios from '../api/axios';
import PropTypes from 'prop-types';

function ListaList({ listas, updateLista, deleteLista }) {
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/listas/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    deleteLista(id);
  };

  return (
    <ul>
      {Array.isArray(listas) && listas.map(lista => (
        <li key={lista._id} className="border p-2 mb-2">
          <h3 className="text-xl">{lista.name}</h3>
          <p>{lista.items}</p>
          <button onClick={() => updateLista(lista)} className="btn btn-secondary mr-2">Edit</button>
          <button onClick={() => handleDelete(lista._id)} className="btn btn-danger">Delete</button>
        </li>
      ))}
    </ul>
  );
}
ListaList.propTypes = {
  listas: PropTypes.array.isRequired,
  updateLista: PropTypes.func.isRequired,
  deleteLista: PropTypes.func.isRequired
};

export default ListaList;