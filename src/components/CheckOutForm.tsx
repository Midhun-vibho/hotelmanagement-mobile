import React, { useState } from "react";
import { IonButton } from "@ionic/react";
import { Stripe } from "@capacitor-community/stripe";
import axios from '../services/axios';
import { useHistory } from "react-router";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            lineHeight: "27px",
            color: "#212529",
            fontSize: "1.1rem",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

const StripeCheckoutButton = (props: any) => {
    const [loading, setLoading] = useState(false);
    const navigate = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState("");
    const [name, setName] = useState("");

    const totalPaid = (navigate.location.state as { amount: number })?.amount;

    // const handleCheckout = async () => {
    //     setLoading(true);


    //     try {
    //         const response = await axios.post("/Payments/payment-intent", {
    //             amount: totalPaid, currency: "INR"
    //         }
    //         );

    //         console.log('resp0nse====>', response, response?.data?.clientSecret)

    //         await Stripe.createPaymentSheet({
    //             paymentIntentClientSecret: response?.data?.clientSecret,
    //             merchantDisplayName: "Inclusive Innovation Incubator",
    //         });


    //         const { paymentResult } = await Stripe.presentPaymentSheet();
    //         console.log(paymentResult);

    //     } catch (error) {
    //         console.error("Payment failed:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);
        setErrorMsg("");
        const response = await axios.post("/Payments/payment-intent", {
            amount: props.totalPaid * 100, currency: "INR"
        }
        );
        console.log(response?.data?.clientSecret, '00000000')

        const clientSecret = response?.data?.clientSecret;
        const paymentMethodObj: any = {
            type: "card",
            card: elements.getElement(CardNumberElement),
            billing_details: {
                name,
                // address: {
                //     state: deliverAddress?.state,
                //     city: deliverAddress?.city_district,
                //     postal_code: deliverAddress?.pincode,
                //     country: "IE",
                //     line1: deliverAddress?.address,
                //     line2: deliverAddress?.address,
                // },
            },
        };
        const paymentMethodResult: any = await stripe.createPaymentMethod(
            paymentMethodObj
        );

        console.log(paymentMethodResult, '1111111111')
        const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethodResult.paymentMethod.id,
        });
        console.log(confirmCardPayment, '2222222222')

        if (confirmCardPayment.error) {
            toast.error('something went wrong...')
        } else {
            if (confirmCardPayment?.paymentIntent?.status === "succeeded") {
                navigate.push(`/thankyou/${props.bookingId}`);
            }
        }
    };

    return (
        <Modal
            open={props.openCardModal}
            onClose={props.handleCloseCardModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col-md-12 form-group">
                        <label className="form-label font-weight-bold small">
                            Name on card
                        </label>
                        <input
                            placeholder="Enter name on card"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 form-group">
                        <label className="form-label font-weight-bold small">
                            Card number
                        </label>
                        <div className="input-group">
                            <CardNumberElement
                                id="cc-number"
                                className="form-control"
                                options={CARD_ELEMENT_OPTIONS}
                            />
                            <div className="input-group-append">
                                <button
                                    id="button-addon2"
                                    type="button"
                                    className="btn btn-outline-secondary"
                                >
                                    <i className="icofont-credit-card" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 form-group">
                        <label className="form-label font-weight-bold small">
                            Valid through(MM/YY)
                        </label>
                        <CardExpiryElement
                            id="expiry"
                            className="form-control"
                            options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                    <div className="col-md-4 form-group">
                        <label className="form-label font-weight-bold small">
                            CVV
                        </label>
                        <CardCvcElement
                            id="cvc"
                            className="form-control"
                            options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                </div>
                <div >
                    <div >
                        <button
                            className="btn btn-success btn-block btn-lg"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <div
                                    className="spinner-border spinner-border-sm text-light"
                                    role="status"
                                ></div>
                            ) : (
                                `PAY ${props.totalPaid}`
                            )}
                        </button>
                    </div>
                </div>

                {errorMsg && (
                    <div className="text-danger mt-2">{errorMsg}</div>
                )}
            </form>
        </Modal>
    );
};

export default StripeCheckoutButton;