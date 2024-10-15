import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Cart from './pages/Cart';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import Farmacos from './pages/dashboard/Farmacos';
import Listas from './pages/dashboard/Listas';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/farmacos" element={<Farmacos />} />
          <Route path="/dashboard/listas" element={<Listas />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
