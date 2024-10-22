import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="bg-emerald-700 p-2 text-white fixed top-0 w-full z-10">
      <div className="flex justify-between items-center">
        <div className="ml-5">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728678502/Medalerticon_fl7n6q.jpg"
              alt="Logo"
              className="h-8 w-8 rounded-md"
            />
          </Link>
        </div>
        <ul className="flex space-x-6 mr-5">
          <li className="border border-white rounded-md p-2 w-32 text-center bg-emerald-700 hover:bg-emerald-600">
            <Link to="/signup" className="text-white">
              Registro
            </Link>
          </li>
          <li className="border border-white rounded-md p-2 w-32 text-center bg-emerald-700 hover:bg-emerald-600">
            <Link to="/signin" className="text-white">
              Login
            </Link>
          </li>
          <li className="border border-white rounded-md p-2 w-32 text-center bg-emerald-700 hover:bg-emerald-600">
            <Link to="/services" className="text-white">
              Servicios
            </Link>
          </li>
          <li className="border border-white rounded-md p-2 w-32 text-center bg-emerald-700 hover:bg-emerald-600">
            <Link to="/cart" className="text-white">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
