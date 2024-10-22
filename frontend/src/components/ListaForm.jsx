import { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types';

function ListaForm({ farmacos, addLista, listaEnEdicion }) {
  const [categoria, setCategoria] = useState('');
  const [farmacosSeleccionados, setFarmacosSeleccionados] = useState([]);

  // Cargar la lista en edición
  useEffect(() => {
    if (listaEnEdicion) {
      setCategoria(listaEnEdicion.categoria);
      setFarmacosSeleccionados(listaEnEdicion.farmacos.map(farmaco => farmaco._id));
    } else {
      setCategoria('');
      setFarmacosSeleccionados([]);
    }
  }, [listaEnEdicion]);

  const handleSelectFarmaco = (id) => {
    if (farmacosSeleccionados.includes(id)) {
      // Eliminar fármaco de la selección
      setFarmacosSeleccionados(farmacosSeleccionados.filter(f => f !== id));
    } else {
      // Agregar fármaco a la selección
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

  if (!farmacos || farmacos.length === 0) {
    return <p>Cargando fármacos...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mt-5 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {listaEnEdicion ? 'Editar Lista de Tratamiento' : 'Ingresar Tratamiento'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="categoria" className="block text-lg font-medium text-gray-700">
            Nombre del tratamiento
          </label>
          <input
            id="categoria"
            name="categoria"
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Ej. Tratamiento para Gripe"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Seleccionar Fármacos:</h2>
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
          {listaEnEdicion ? 'Actualizar Tratamiento' : 'Crear Tratamiento'}
        </button>
      </form>
    </div>
  );
}

ListaForm.propTypes = {
  farmacos: PropTypes.array.isRequired,
  addLista: PropTypes.func.isRequired,
  listaEnEdicion: PropTypes.object, 
};

export default ListaForm;
