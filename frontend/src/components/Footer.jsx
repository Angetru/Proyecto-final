function Footer() {
    return (
      <footer className="bg-emerald-700 text-white p-3 mt-auto">
        <div className="flex flex-col items-center space-y-2 mb-2">
        <div className="flex space-x-4"> 
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <p>&copy; 2024 MedAlert. Todos los derechos reservados - Bootcamp UDD DWFS14.</p>
      </div>
      </footer>
    );
  }
  
  export default Footer;