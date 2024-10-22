import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state || {};
  const [isPayPalReady, setIsPayPalReady] = useState(false);

  useEffect(() => {
    if (service) {
      setIsPayPalReady(true);
    }
  }, [service]);

  // Mensaje de advertencia, para que usuario seleccione un servicio
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3">
          <h1 className="text-3xl font-bold mb-4 text-center">Carro de Compras</h1>
          <p className="text-xl mb-4 text-center">No has seleccionado ningún servicio.</p>
          <p className="text-xl mb-4 text-center">Por favor, selecciona un servicio para continuar con el pago.</p>
          <button
            onClick={() => navigate('/services')} // Redirige a la página de servicios
            className="bg-emerald-600 text-white py-2 px-4 rounded mt-4 w-full"
          >
            Seleccionar Servicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3">
        <h1 className="text-3xl font-bold mb-4 text-center">Resumen del Pedido</h1>
        <p className="text-xl mb-4">Has seleccionado: {service.name}</p>
        <p className="text-xl mb-4">Precio: ${service.price.toFixed(2)}</p>

{/* Si el servicio tiene un precio mayor a 0, muestra el botón de PayPal */}
        {service.price > 0 ? (
          isPayPalReady && (
          <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              fundingSource="paypal"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: service.price.toFixed(2),
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(details => {
                  alert(`Transacción completada por ${details.payer.name.given_name}`);
                });
              }}
            />
          </PayPalScriptProvider>
          )
        ) : (
          // Si el servicio es gratuito, muestra un mensaje de confirmación
          <div className="text-center mt-4">
            <p className="text-green-600 font-bold">¡El servicio es gratuito! No es necesario realizar un pago.</p>
            <button 
              className="bg-emerald-600 text-white py-2 px-4 rounded mt-4"
              onClick={() => alert('Servicio activado exitosamente!')}>
              Activar Servicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
