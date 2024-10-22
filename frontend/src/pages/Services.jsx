import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);

    // Navegar a /cart y pasar el servicio seleccionado en el estado
    navigate('/cart', { state: { service } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-5">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3"> 
        <h1 className="text-3xl font-bold mb-10 mt-4 text-center">¡Bienvenido, elige un Servicio!</h1>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="border p-4 mb-4 rounded-lg shadow flex-1 mx-2">
            <h2 className="text-2xl font-bold">Plan Básico</h2>
            <h3 className="text-lg">Servicio gratuito por 1 mes.</h3>
            <p className="italic mt-2">Prueba la aplicación de forma gratuita con todas sus funcionalidades.</p>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              onClick={() => handleServiceSelect({
                id: 'basic',
                name: 'Plan Básico',
                price: 0, // Servicio gratuito
              })}
            >
              Añadir a Carro - Plan Básico
            </button>
          </div>

          <div className="border p-4 mb-4 rounded-lg shadow flex-1 mx-2">
            <h2 className="text-2xl font-bold">Plan Pro</h2>
            <h3 className="text-lg">Servicio mensual - Ilimitado</h3>
            <p className="italic mt-2">Registra tus fármacos y tratamientos de forma ilimitada para que luego generes las alertas.</p>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              onClick={() => handleServiceSelect({
                id: 'pro',
                name: 'Plan Pro',
                price: 10, // Precio del servicio pro
              })}
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
