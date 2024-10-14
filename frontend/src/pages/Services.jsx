import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
      navigate('/cart');
  };

  return (
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center mb-20">
        <h1 className="text-xl mb-4 text-white bg-emerald-600 bg-opacity-100 px-10 py-1 rounded-lg">¡Bienvenido, elije un plan!</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <h2 className="text-2xl font-bold">Servico Básico</h2>
          <h3>Servicio gratuito por 1 mes.</h3>
          <p>Prueba la aplicación de forma gratuita con todas sus funcionalidades</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => handleServiceSelect('basic')}
          >
            Plan Básico
          </button>
        </div>
        <div className="border p-4">
          <h2 className="text-2xl font-bold">Servicio Pro</h2>
          <h3>Servicio ilimitado</h3>
          <p>Registra tus fármacos y tratamientos de forma ilimitada</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => handleServiceSelect('pro')}
          >
            Plan Pro
          </button>
        </div>
      </div>
  );
}

export default Services;