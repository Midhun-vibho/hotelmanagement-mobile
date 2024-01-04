import React, { useEffect } from 'react';
import { IonContent, IonButton, IonPage } from '@ionic/react';
import axios from 'axios';
import '../styles/pages/thankyou.scss';
import { Link, useParams } from 'react-router-dom';
import { apiBaseUrl } from '../services/axios';

const Thankyou: React.FC = () => {
    const { bookingId }: any = useParams();

    const token = localStorage.getItem("token")

    useEffect(() => {
        const updatesuccess = async () => {
            const { data, status } = await axios.patch(`${apiBaseUrl}api/Booking/update/${bookingId}`, {
                token,
                payment_status: "Success"
            })
        }

        updatesuccess()
    }, [])

    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                    <div className="app-page-thankyou">
                        <div className="app-page-thankyou-wrapper">
                            <img src="/assets/images/checked.svg" />
                            <h1>Thankyou</h1>
                            <p>Your payment is successfull</p>
                            <div className="app-page-thankyou-wrapper-btns">
                                <Link to="/bookings">
                                    <IonButton shape="round" class="app-custom-button">View Booking</IonButton>
                                </Link>
                                <IonButton fill="clear" className="app-clear-button">Download Receipt</IonButton>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Thankyou;
