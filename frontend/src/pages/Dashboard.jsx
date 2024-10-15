import { Link, Route, Routes } from 'react-router-dom';
import Farmacos from './dashboard/Farmacos';
import Listas from './dashboard/Listas';

function Dashboard() {
  return (
    <div className="container mx-auto mt-20 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      
      {/* Barra de navegación para Farmacos y Tratamientos */}
      <nav className="flex justify-center space-x-4 mb-6">
        <Link 
          to="farmacos" 
          className="text-white bg-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-600"
        >
          Fármacos
        </Link>
        <Link 
          to="listas" 
          className="text-white bg-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-600"
        >
          Tratamientos
        </Link>
      </nav>

      {/* Definición de las rutas del Dashboard */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <Routes>
          <Route path="farmacos/*" element={<Farmacos />} />
          <Route path="listas/*" element={<Listas />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
