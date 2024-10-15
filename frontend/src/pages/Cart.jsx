import { useEffect } from 'react';

function Cart() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=PAYPAL_CLIENT_ID';
    script.addEventListener('load', () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '10.00'
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }
      }).render('#paypal-button-container');
    });
    document.body.appendChild(script);
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Carro de Compras</h1>
      <div id="paypal-button-container"></div>
    </div>
  );
}

export default Cart;