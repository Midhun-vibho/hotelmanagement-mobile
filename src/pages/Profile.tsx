import React, { useEffect, useState } from 'react';
import { IonContent, IonButton, IonPage, IonHeader, IonFooter } from '@ionic/react';

import '../styles/pages/profile.scss';
import { Link, useHistory } from 'react-router-dom';
import Header from '../layouts/Header';
import SideMenu from '../layouts/SideMenu';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from '../services/validations';
import { getLoggedUserData } from '../services/auth';
import axios from '../services/axios';
import { toast } from 'react-toastify';
import { setLocalStorageItem } from '../services/cookieHandling';

const Profile = () => {
    const [profileInfo, setProfileInfo] = useState<any>(null);
const history = useHistory();
    const getProfile = async () => {
        const loggedUserData = getLoggedUserData();
        const { data, status } = await axios.get(
            `Author/view/${loggedUserData._id}`,
        );
        if (status === 200 || status === 201) {
            setValue("first_name",data?.first_name)
            setValue("last_name",data?.last_name)
            setValue("phonenumber",data?.phonenumber)
            setValue("email",data?.email)
            setLocalStorageItem('logged_user_data', JSON.stringify(data));
            setProfileInfo(data);
        }
    };
    useEffect(() => {
        getProfile();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editProfileSchema),
    });
    const onSubmit = async (formData: any) => {
        const loggedUserData = getLoggedUserData();
        const { status } = await axios.patch(
            `Author/update/${loggedUserData._id}`,
            formData,
        );
        if (status === 200 || status === 201) {
            getProfile();
            toast.success('Profile updated successfully');
        }
    };

    return (
        <>
            <SideMenu />
            <IonPage id="main-content">
                <IonContent fullscreen>
                    <div className="app-page-bookings app-page-profile">
                        <IonHeader className="ion-no-border">
                            <Header />
                        </IonHeader>
                        <div className="app-page-bookings-wrapper">
                            <div className="app-page-bookings-heading">
                                <h1>Profile Details</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing</p>
                            </div>
                            <div className="app-page-profile-wrapper">
                                <form className="app-page-login-form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="app-page-login-form-field">
                                        <input type={"text"} placeholder="First Name"  {...register('first_name')} />
                                        <img className="form-field-icon-left" src="/assets/images/user.svg" />
                                    </div>
                                    <div className="app-page-login-form-field">
                                        <input type={"text"} placeholder="Last Name" {...register('last_name')}/>
                                        <img className="form-field-icon-left" src="/assets/images/user.svg" />
                                    </div>
                                    <div className="app-page-login-form-field">
                                        <input type={"text"} placeholder="Phone" {...register('phonenumber')}/>
                                        <img className="form-field-icon-left" src="/assets/images/telephone.svg" />
                                    </div>
                                    <div className="app-page-login-form-field">
                                        <input type={"email"} placeholder="Email" {...register('email')}/>
                                        <img className="form-field-icon-left" src="/assets/images/email.svg" />
                                    </div>
                                    <div className="app-page-login-form-button">
                                      
                                            <IonButton className="app-custom-button" fill="solid" color="primary" shape="round" type='submit'>Update</IonButton>
                                        <Link to="/login">
                                            <IonButton class="app-clear-button" fill="clear">Logout</IonButton>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </IonContent>
                <IonFooter>
                    <div className="app-layout-footer">
                        <ul>
                            <li>
                                
                                    <IonButton size="small" fill="clear" onClick={() => {history.push("/home")}}>
                                        <div className="app-layout-footer-link-wrapper">
                                            <img className="footer-default-icon" src="/assets/images/footer/home.svg" />
                                            <img className="footer-active-icon" src="/assets/images/footer/home-active.svg" />
                                            <span>Home</span>
                                        </div>
                                    </IonButton>
                               
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
                                    <IonButton className="footer-link-active" size="small" fill="clear">
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

export default Profile;
