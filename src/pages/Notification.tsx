import React, { useState, useEffect } from 'react';
import { IonContent, IonButton, IonPage, IonHeader } from '@ionic/react';
import dayjs from 'dayjs';
import '../styles/pages/notifications.scss';
import { Link } from 'react-router-dom';
import axios from '../services/axios';
import { getLoggedUserData } from '../services/auth';

const Notification: React.FC = () => {
    const [notifications, setNotifications] = useState([]);

    const loggedUserData = getLoggedUserData();

    const token = localStorage.getItem('token');


    const getNotifications = async () => {
        const { data, status } = await axios.post("/Notification/fetch-notification", { token })
        if (status === 200 || status === 201) {
            setNotifications(data.notifications);
            console.log(data.notifications)
        }
    };

    useEffect(()=>{getNotifications();},[])

    useEffect(() => {
        if (loggedUserData?.id) {
            getNotifications();
        }
    }, [loggedUserData?.id]);

    console.log('=====>', notifications)

    const formatDateDDDMMMhmmFromString = (date: any) => {
        return dayjs(date).format('ddd, D MMM, h:mm A');
      };
      

    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                    <div className="app-page-notification">
                        <div className="app-page-dark-back-header">
                            <Link to="/home">
                                <IonButton>
                                    <img src="/assets/images/left-arrow.svg" />
                                </IonButton>
                            </Link>
                        </div>
                        {notifications.length !== 0 && (
                            <>
                                <div className="app-page-dark-back-heading">
                                    <div>
                                        <h1>Notifications</h1>
                                        <p>You have <span>{notifications.length} New Notifications</span></p>
                                    </div>
                                    <IonButton fill="clear">Clear all</IonButton>
                                </div>
                                <div className="app-page-notification-wrapper">
                                    <ul className="app-notification-list">
                                    {notifications.map((notification: any) => {
                                        return (
                                            <li
                                                key={notification._id}
                                                className="app-notification-list-item"
                                            >
                                                <div className="app-notification-card">
                                                    <div className="app-notification-card-header">
                                                        <img src="/assets/images/footer/calendar.svg" />
                                                        <span >
                                                            {formatDateDDDMMMhmmFromString(
                                                                notification.createdAt,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: "14px", color: "#ff6431", marginLeft: "15px", marginTop: "10px", fontWeight: "600" }}>
                                                        {notification.header}
                                                    </div>
                                                    <div className="app-notification-card-content">
                                                        <span>{notification.text}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                    </ul>
                                    
                                </div>
                            </>
                        )}
                        {/* {notifications.length !== 0 && (
                            <>
                                <div className="app-page-dark-back-heading">
                                    <div>
                                        <h1>Notifications</h1>
                                        <p>You have <span>{notifications.length} New Notifications</span></p>
                                    </div>
                                    <IonButton fill="clear">Clear all</IonButton>
                                </div>
                                <div className="app-page-notification-wrapper">
                                    <ul className="app-notification-list">
                                        <li className="app-notification-list-item">
                                            <div className="app-notification-card">
                                                <div className="app-notification-card-header">
                                                    <img src="/assets/images/footer/calendar.svg" />
                                                    <span>Feb 5, 02:20 PM</span>
                                                </div>
                                                <div className="app-notification-card-content">
                                                    <h6>Price drop alert at <span>Casata Residency</span></h6>
                                                    <p>68% OFF at this top rated hotel - Only for you</p>
                                                </div>
                                                <IonButton>Book Now</IonButton>
                                            </div>
                                        </li>
                                        <li className="app-notification-list-item">
                                            <div className="app-notification-card">
                                                <div className="app-notification-card-header">
                                                    <img src="/assets/images/footer/calendar.svg" />
                                                    <span>Feb 5, 02:20 PM</span>
                                                </div>
                                                <div className="app-notification-card-content">
                                                    <h6>Price drop alert at <span>Casata Residency</span></h6>
                                                    <p>68% OFF at this top rated hotel - Only for you</p>
                                                </div>
                                                <IonButton>Book Now</IonButton>
                                            </div>
                                        </li>
                                        <li className="app-notification-list-item">
                                            <div className="app-notification-card">
                                                <div className="app-notification-card-header">
                                                    <img src="/assets/images/footer/calendar.svg" />
                                                    <span>Feb 5, 02:20 PM</span>
                                                </div>
                                                <div className="app-notification-card-content">
                                                    <h6>Price drop alert at <span>Casata Residency</span></h6>
                                                    <p>68% OFF at this top rated hotel - Only for you</p>
                                                </div>
                                                <IonButton>Book Now</IonButton>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )} */}

                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Notification;
