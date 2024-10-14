import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../api/axios';

function ListaForm({ onSave }) {
  const [name, setName] = useState('');
  const [items, setItems] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.post('/listas', { name, items }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onSave(response.data);
    setName('');
    setItems('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="form-input mt-1 block w-full"
      />
      <input
        type="text"
        value={items}
        onChange={(e) => setItems(e.target.value)}
        placeholder="Items"
        className="form-input mt-1 block w-full"
      />
      <button type="submit" className="btn btn-primary mt-4">Add Lista</button>
    </form>
  );
}
ListaForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ListaForm;