import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-emerald-700 text-white p-3 mt-auto">
      <div className="flex flex-col items-center space-y-2 mb-2">
        {/* Sección de iconos de redes sociales */}
        <div className="flex space-x-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
        {/* Copyright */}
        <p className="text-sm italic">&copy; 2024 MedAlert. Todos los derechos reservados - Bootcamp UDD DWFS14.</p>
      </div>
    </footer>
  );
}

export default Footer;
