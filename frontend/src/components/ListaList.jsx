import PropTypes from 'prop-types';
import axios from '../api/axios';

function ListaList({ listas = [], onEdit, onDelete }) {
  // Función para generar alertas por email
  const handleSendAlert = async (listaId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`/listas/${listaId}/alerta`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Alerta enviada con éxito al usuario.');
    } catch (error) {
      console.error('Error enviando la alerta:', error);
      alert('Hubo un error al enviar la alerta.');
    }
  };

  // Aquí mostramos cómo llega la lista desde el backend
  console.log('Listas recibidas:', listas);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Listas de Tratamiento</h1>
        {listas.length > 0 ? (
          <ul className="space-y-4">
            {listas.map((lista) => (
              <li key={lista._id} className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{lista.categoria}</h3>
                    <p className="text-gray-700">
                      <span className="font-semibold">Fármacos:</span>{' '}
                      {Array.isArray(lista.farmacos) && lista.farmacos.length > 0
                        ? lista.farmacos.map((f) => f.nombre).join(', ')
                        : 'No hay fármacos'}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                      onClick={() => onEdit(lista)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => onDelete(lista._id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                      onClick={() => handleSendAlert(lista._id)}
                    >
                      Enviar Alerta
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No hay listas disponibles.</p>
        )}
      </div>
    </div>
  );
}

ListaList.propTypes = {
  listas: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListaList;

