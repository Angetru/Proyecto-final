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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3"> 
        <h1 className="text-3xl font-bold mb-4 text-center">¡Bienvenido, elige un plan!</h1>

        <div className="flex flex-col md:flex-row justify-between"> {/* Cambiar a flex-row para pantallas medianas y superiores */}
          <div className="border p-4 mb-4 rounded-lg shadow flex-1 mx-2"> {/* Espaciado entre los servicios */}
            <h2 className="text-2xl font-bold">Servicio Básico</h2>
            <h3 className="text-lg">Servicio gratuito por 1 mes.</h3>
            <p>Prueba la aplicación de forma gratuita con todas sus funcionalidades</p>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              onClick={() => handleServiceSelect('basic')}
            >
              Añadir a Carro - Plan Básico
            </button>
          </div>

          <div className="border p-4 mb-4 rounded-lg shadow flex-1 mx-2"> {/* Espaciado entre los servicios */}
            <h2 className="text-2xl font-bold">Servicio Pro</h2>
            <h3 className="text-lg">Servicio ilimitado</h3>
            <p>Registra tus fármacos y tratamientos de forma ilimitada</p>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              onClick={() => handleServiceSelect('pro')}
            >
              Añadir a Carro - Plan Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
