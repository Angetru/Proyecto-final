import { useState } from 'react';
import PropTypes from 'prop-types';

function ListaForm({ farmacos, addLista }) {
  const [categoria, setCategoria] = useState('');
  const [farmacosSeleccionados, setFarmacosSeleccionados] = useState([]);

  // Verifica si los farmacos están llegando correctamente
  console.log('Farmacos en ListaForm:', farmacos);

  const handleSelectFarmaco = (id) => {
    if (farmacosSeleccionados.includes(id)) {
      setFarmacosSeleccionados(farmacosSeleccionados.filter(f => f !== id));
    } else {
      setFarmacosSeleccionados([...farmacosSeleccionados, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaLista = {
      categoria,
      farmacos: farmacosSeleccionados,
    };
    addLista(nuevaLista);
    setCategoria('');
    setFarmacosSeleccionados([]);
  };

  // Solo renderiza cuando haya farmacos disponibles
  if (!farmacos || farmacos.length === 0) {
    return <p>Cargando fármacos...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mt-10 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Crear Nueva Lista de Tratamiento</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Nombre de la Lista (Categoría)
          </label>
          <input
            id="categoria"
            name="categoria"
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Ej. Tratamiento para la Gripe"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Seleccionar Fármacos</h2>
          <ul className="space-y-2">
            {farmacos.map((farmaco) => (
              <li key={farmaco._id} className="flex items-center">
                <input
                  id={`farmaco-${farmaco._id}`}
                  type="checkbox"
                  checked={farmacosSeleccionados.includes(farmaco._id)}
                  onChange={() => handleSelectFarmaco(farmaco._id)}
                  className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor={`farmaco-${farmaco._id}`} className="ml-3 text-sm text-gray-700">
                  {farmaco.name || 'Sin nombre'}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Crear Lista
        </button>
      </form>
    </div>
  );
}

ListaForm.propTypes = {
  farmacos: PropTypes.array.isRequired,
  addLista: PropTypes.func.isRequired,
};

export default ListaForm;
