import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-emerald-700 p-2bg-emerald-700 p-2 text-white fixed top-0 w-full">
      <ul className="flex justify-end space-x-4 items-center">
        <li className="mr-5">
          <Link to="/">
            <img src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728678502/Medalerticon_fl7n6q.jpg" alt="Logo" className="h-8 w-8 rounded-md" />
          </Link>
        </li>
        <li className="border border-white rounded-md p-2 w-32 text-center bg-emerald-700">
          <Link to="/signup" className="text-white">Registro</Link>
        </li>
        <li className="border border-white rounded-md p-2 w-32 text-center bg-emerald-700">
          <Link to="/signin" className="text-white">Login</Link>
        </li>
        <li className="border border-white rounded-md p-2 w-32 text-center bg-emerald-700">
          <Link to="/services" className="text-white">Servicios</Link>
        </li>
        <li className="border border-white rounded-md p-2 w-32 text-center bg-emerald-700">
          <Link to="/cart" className="text-white">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;