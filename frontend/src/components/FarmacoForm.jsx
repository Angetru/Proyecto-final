import { useState } from 'react';
import axios from '../api/axios';
import PropTypes from 'prop-types';

function FarmacoForm({ onSave}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [times, setTimes] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.post('/farmacos', { name, description, dose, frequency, times, startdate, enddate}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onSave(response.data);
    setName('');
    setDescription('');
    setDose('');
    setFrequency('');
    setTimes('');
    setStartdate('');
    setEnddate('');
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="form-input mt-1 block w-full"
      />
      <input
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="form-input mt-1 block w-full"
      />
        <input
        type="text"
        name="dose"
        value={dose}
        onChange={(e) => setDose(e.target.value)}
        placeholder="Dosis"
        className="form-input mt-1 block w-full"
      />
        <input
        type="text"
        name="frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        placeholder="Frecuencia"
        className="form-input mt-1 block w-full"
        />
        <input
        type="text"
        name="times"
        value={times}
        onChange={(e) => setTimes(e.target.value)}
        placeholder="Horarios"
        className="form-input mt-1 block w-full"
        />
        <input
        type="text"
        name="startdate"
        value={startdate}
        onChange={(e) => setStartdate(e.target.value)}
        placeholder="Fecha de inicio"
        className="form-input mt-1 block w-full"
        />
        <input
        type="text"
        name="enddate"
        value={enddate}
        onChange={(e) => setEnddate(e.target.value)}
        placeholder="Fecha de término"
        className="form-input mt-1 block w-full"
        />

      <button type="submit" className="btn btn-primary mt-4">Añadir fármaco</button>
    </form>
  );
}
FarmacoForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default FarmacoForm;