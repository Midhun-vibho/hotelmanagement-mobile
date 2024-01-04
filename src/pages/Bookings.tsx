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
import axios, { apiBaseUrl } from '../services/axios';
import { getLoggedUserData } from '../services/auth';
import { toast } from 'react-toastify';

const Bookings: React.FC = () => {
    const loggedUserData = getLoggedUserData();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab,setSelectedTab] = useState(0);
    const getBookings = async (tabType:any) => {
        setLoading(true);
        const { data, status } = await axios.get(
          `Booking/list?tabType=${tabType}&author_id=${loggedUserData.id}`,
        );
        if (status === 200 || status === 201) {
          setBookings(data?.results);
          setLoading(false);
        }
      };
      useEffect(() => {
        const tabType =
          selectedTab === 0 ? 'Upcoming' : selectedTab === 1 ? 'Past' : 'Cancelled';
        getBookings(tabType);
      }, [selectedTab]);
      const handleCancelBooking = async (bookingId:any) => {
        const updatebooking = {
          booking_status: 'Cancelled',
        };
        const { status } = await axios.patch(
          `/Booking/update/${bookingId}`,
          updatebooking,
        );
        if (status === 200 || status === 201) {
          toast.success('Booking cancelled successfully');
          const tabType =
            selectedTab === 0
              ? 'Upcoming'
              : selectedTab === 1
              ? 'Past'
              : 'Cancelled';
          getBookings(tabType);
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
                                <h1>Bookings</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing</p>
                            </div>
                            <div className="app-page-bookings-btns">
                                <ul>
                                    <li>
                                        <input type={"radio"} name="booking-type" onChange={(e) => {setSelectedTab(0)}} defaultChecked id="booking-type-upcoming" />
                                        <label htmlFor="booking-type-upcoming" className="ripple-parent">Upcoming<IonRippleEffect></IonRippleEffect></label>
                                    </li>
                                    <li>
                                        <input type={"radio"} name="booking-type" id="booking-type-completed" onChange={(e) => {setSelectedTab(1)}}/>
                                        <label htmlFor="booking-type-completed" className="ripple-parent">Completed<IonRippleEffect></IonRippleEffect></label>
                                    </li>
                                    <li>
                                        <input type={"radio"} name="booking-type"  id="booking-type-cancelled" onChange={(e) => {setSelectedTab(2)}}/>
                                        <label htmlFor="booking-type-cancelled" className="ripple-parent">Cancelled<IonRippleEffect></IonRippleEffect></label>
                                    </li>
                                </ul>
                            </div>
                            <ul className="app-page-booking-list">
                                <li className="app-page-booking-list-item">
                                    {
                                        bookings.map((booking:any) => {
                                            const hotelInformation = JSON.parse(
                                              booking.hotel_infomration,
                                            )[0];
                                            return (
                                                <UpcomingBookingsCard hotelInformation={hotelInformation} booking={booking} selectedTab={selectedTab} handleCancelBooking={handleCancelBooking}/>
                                            );})
                                    }
                                </li>
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
                                    <IonButton className="footer-link-active" size="small" fill="clear">
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
                                    <IonButton size="small" fill="clear">
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

export default Bookings;
