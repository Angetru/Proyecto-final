import { Link, Route, Routes } from 'react-router-dom';
import Farmacos from './dashboard/Farmacos';
import Listas from './dashboard/Listas';

function Dashboard() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <nav>
        <Link to="farmacos" className="mr-4">Farmacos</Link>
        <Link to="listas">Tratamientos</Link>
      </nav>
      <Routes>
        <Route path="farmacos/*" element={<Farmacos />} />
        <Route path="listas/*" element={<Listas />} />
      </Routes>
    </div>
  );
}

export default Dashboard;