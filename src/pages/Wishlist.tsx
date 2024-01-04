import React, { useEffect, useState } from 'react';
import { IonContent, IonButton, IonPage, IonHeader, IonRippleEffect, IonFooter } from '@ionic/react';

import '../styles/pages/bookings.scss';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import SideMenu from '../layouts/SideMenu';
import UpcomingBookingsCard from '../components/UpcomingBookingsCard';
import CompletedBookingsCard from '../components/CompletedBookingsCard';
import CanceledBookingsCard from '../components/CanceledBookingsCard';
import CheckIn from '../components/CheckIn';
import WishlistCard from '../components/WishlistCard';
import axios, { apiBaseUrl } from '../services/axios';
import { toast } from 'react-toastify';
const Wishlist: React.FC = () => {
    const [favourites, setFavourites] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getFavourites = async () => {
        setLoading(true);
        const { data, status } = await axios.get(`/Favourite/list`);
        if (status === 200 || status === 201) {
            setFavourites(data?.results);
            setLoading(false);
        }
    };
    useEffect(() => {
        getFavourites();
    }, []);
    const handleRemove = async (id: any) => {
        const { status } = await axios.delete(`/Favourite/delete/${id}`);
        if (status === 204) {
            toast.success('Favourite removed successfully');
            getFavourites();
        }
    };
    return (
        <>
            <SideMenu />
            <IonPage id="main-content">
                <IonContent fullscreen>
                    <div className="app-page-bookings">
                        <IonHeader collapse="fade" className="ion-no-border">
                            <Header />
                        </IonHeader>
                        <div className="app-page-bookings-wrapper">
                            <div className="app-page-bookings-heading">
                                <h1>Wishlist</h1>
                                {/* <p>Lorem Ipsum is simply dummy text of the printing</p> */}
                            </div>
                            <ul className="app-page-booking-list">
                                {!loading && <li className="app-page-booking-list-item">
                                    {favourites.map((favourite: any) => (
                                        <WishlistCard favourite={favourite} handleRemove={handleRemove}/>
                                    ))}
                                </li>}
                            </ul>
                        </div>
                    </div>
                    <CheckIn />
                </IonContent>
                <IonFooter>
                    <div className="app-layout-footer">
                        <ul>
                            <li>
                                <Link to="/home">
                                    <IonButton size="small" fill="clear">
                                        <div className="app-layout-footer-link-wrapper">
                                            <img className="footer-default-icon" src="/assets/images/footer/home.svg" />
                                            <img className="footer-active-icon" src="/assets/images/footer/home-active.svg" />
                                            <span>Home</span>
                                        </div>
                                    </IonButton>
                                </Link>
                            </li>
                            <li>
                                <Link to="/bookings">
                                    <IonButton size="small" fill="clear">
                                        <div className="app-layout-footer-link-wrapper">
                                            <img className="footer-default-icon" src="/assets/images/footer/calendar.svg" />
                                            <img className="footer-active-icon" src="/assets/images/footer/calendar-active.svg" />
                                            <span>Bookings</span>
                                        </div>
                                    </IonButton>
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist">
                                    <IonButton className="footer-link-active" size="small" fill="clear">
                                        <div className="app-layout-footer-link-wrapper">
                                            <img className="footer-default-icon" src="/assets/images/footer/heart.svg" />
                                            <img className="footer-active-icon" src="/assets/images/footer/heart-active.svg" />
                                            <span>Wishlist</span>
                                        </div>
                                    </IonButton>
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile">
                                    <IonButton size="small" fill="clear">
                                        <div className="app-layout-footer-link-wrapper">
                                            <img className="footer-default-icon" src="/assets/images/footer/user.svg" />
                                            <img className="footer-active-icon" src="/assets/images/footer/user-active.svg" />
                                            <span>Profile</span>
                                        </div>
                                    </IonButton>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </IonFooter>
            </IonPage>
        </>
    );
};

export default Wishlist;
