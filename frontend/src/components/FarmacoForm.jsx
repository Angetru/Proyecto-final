import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function FarmacoForm({ onSave, farmacoEnEdicion }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [times, setTimes] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');

  // Efecto para rellenar el formulario cuando se edita un fármaco
  useEffect(() => {
    if (farmacoEnEdicion) {
      setName(farmacoEnEdicion.name);
      setDescription(farmacoEnEdicion.description);
      setDose(farmacoEnEdicion.dose);
      setFrequency(farmacoEnEdicion.frequency);
      setTimes(farmacoEnEdicion.times);
      setStartdate(farmacoEnEdicion.startdate);
      setEnddate(farmacoEnEdicion.enddate);
    }
  }, [farmacoEnEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const farmaco = { name, description, dose, frequency, times, startdate, enddate };

    console.log("Datos enviados al guardar o actualizar:", farmaco); // Verifica los valores
    onSave(farmaco); // Llama a la función de guardar o actualizar
    setName('');
    setDescription('');
    setDose('');
    setFrequency('');
    setTimes('');
    setStartdate('');
    setEnddate('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">{farmacoEnEdicion ? 'Editar Fármaco' : 'Añadir Fármaco'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />

          <input
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />

          <input
            type="text"
            name="dose"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            placeholder="Dosis"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />

          <input
            type="text"
            name="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="Frecuencia (e.g., cada 8 horas)"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />

          <input
            type="text"
            name="times"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
            placeholder="Horarios (e.g., 08:00, 14:00, 20:00)"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />

          <input
            type="text"
            name="startdate"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
            placeholder="Fecha de inicio"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />

          <input
            type="text"
            name="enddate"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
            placeholder="Fecha de término"
            className="form-input mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
          
          <button type="submit" className="w-full text-white bg-emerald-700 mt-4 rounded-lg p-2 hover:bg-emerald-600">
            {farmacoEnEdicion ? 'Actualizar Fármaco' : 'Añadir Fármaco'}
          </button>
        </form>
      </div>
    </div>
  );
}

FarmacoForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  farmacoEnEdicion: PropTypes.object, 
};

export default FarmacoForm;

