import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

interface PaymentFormProps {
    bookingId: string | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ bookingId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState<any>(null);

    useEffect(() => {
        // Optionally, you can load Stripe.js here if you haven't already loaded it in your app setup.
        // const loadStripeJs = async () => {
        //   const stripeJs = await loadStripe('YOUR_PUBLISHABLE_KEY');
        //   setStripe(stripeJs);
        // };
        // loadStripeJs();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            return;
        }

        try {
            const { token, error } = await stripe.createToken(cardElement);

            if (error) {
                setPaymentError(error.message);
                return;
            }

            const response = await axios.post('/Payments/create-checkout', {
                token: token.id,
                amount: 1000, // Amount in cents
            });

            // Handle the payment success
            console.log('Payment successful:', response.data);
        } catch (error) {
            // Handle payment error
            console.error('Payment error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="card-element">Credit or debit card</label>
                <CardElement
                    id="card-element"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                            },
                        },
                    }}
                />
            </div>
            <button type="submit">Pay</button>
            {paymentError && <div className="error">{paymentError}</div>}
        </form>
    );
};

export default PaymentForm;
