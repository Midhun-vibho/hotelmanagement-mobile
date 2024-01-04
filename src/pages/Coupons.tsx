import React from 'react';
import { IonContent,  IonButton, IonPage, IonRippleEffect, IonHeader  } from '@ionic/react';

import '../styles/pages/coupons.scss';
import { Link } from 'react-router-dom';
import CouponCard from '../components/CouponCard';

const Coupons: React.FC = () => {
  return (
    <>
        <IonPage>
            <IonHeader className="ion-no-border">
                <div className="app-page-dark-back-header">
                    <Link to="/hotel-inner">
                        <IonButton>
                            <img src="/assets/images/left-arrow.svg"/>
                        </IonButton>
                    </Link>
                </div>
            </IonHeader>
            <IonContent fullscreen>
               <div className="app-page-coupons">
                    <div className="app-page-coupons-heading">
                        <h1>Coupons</h1>
                        <p>Enter your Coupon Code to apply</p>
                    </div>
                    <div className="app-page-coupons-search">
                        <input type={'text'} placeholder="Coupon Code"/>
                        <IonButton fill="clear" className="app-clear-btn">
                            Apply
                        </IonButton>
                    </div>
                    <div className="app-page-coupons-content">
                        <ul className="app-page-coupons-list">
                            <li className="app-page-coupons-list-item">
                                <CouponCard />
                            </li>
                            <li className="app-page-coupons-list-item">
                                <CouponCard />
                            </li>
                            <li className="app-page-coupons-list-item">
                                <CouponCard />
                            </li>
                            <li className="app-page-coupons-list-item">
                                <CouponCard />
                            </li>
                            <li className="app-page-coupons-list-item">
                                <CouponCard />
                            </li>
                            <li className="app-page-coupons-list-item">
                                <CouponCard />
                            </li>
                        </ul>
                    </div>
               </div>
            </IonContent>
        </IonPage>
    </>
  );
};

export default Coupons;
