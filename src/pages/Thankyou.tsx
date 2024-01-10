import React, { useEffect, useState } from 'react';
import { IonContent, IonButton, IonPage } from '@ionic/react';
import axios from 'axios';
import '../styles/pages/thankyou.scss';
import { Link, useParams } from 'react-router-dom';
import { apiBaseUrl } from '../services/axios';
import { IonItem, IonLabel, IonSpinner } from '@ionic/react';

const Thankyou: React.FC = () => {
    const { id  }: any = useParams();

    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem("token")

    useEffect(() => {
        const updatesuccess = async () => {
            const { data, status } = await axios.patch(`${apiBaseUrl}api/Booking/update/${id}`, {
                token,
                payment_status: "Success"
            })
            setLoading(false)
        }

        updatesuccess()
    }, [])

    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                { loading ? 
                    <div style={{display:'flex', justifyContent:'center', height:'100%', alignItems:'center'}}>
                        <IonSpinner style={{width:'60px', height:'60px'}}/>
                    </div>:
                    <div className="app-page-thankyou">
                        <div className="app-page-thankyou-wrapper">
                            <img src="/assets/images/checked.svg" />
                            <h1>Thankyou</h1>
                            <p>Your payment is successfull</p>
                            <div className="app-page-thankyou-wrapper-btns">
                                <Link to="/bookings">
                                    <IonButton shape="round" class="app-custom-button">View Booking</IonButton>
                                </Link>
                                {/* <IonButton fill="clear" className="app-clear-button">Download Receipt</IonButton> */}
                            </div>
                        </div>
                    </div>
                }
                </IonContent>
            </IonPage>
        </>
    );
};

export default Thankyou;
