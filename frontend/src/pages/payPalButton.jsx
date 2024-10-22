import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PropTypes from 'prop-types';

const PayPalButton = ({total}) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "VITE_PAYPAL_CLIENT_ID" }}>
            <PayPalButtons 
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: total,
                            },
                        },
                    ],
                });
            }} 
            onApprove={
                (data, actions) => {
                    return actions.order.capture().then((details)=> {
                    alert(`Transacción completada por: by ${details.payer.name.given_name}`);
                    });
            }}
            />
        </PayPalScriptProvider>
    );
};
PayPalButton.propTypes = {
    total: PropTypes.string.isRequired
};

export default PayPalButton;

